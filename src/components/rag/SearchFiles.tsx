import { ShikiRender } from '@/lib/ShikiRender';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@cn/ui/accordion';
import { Button } from '@cn/ui/button';
import { Input } from '@cn/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@cn/ui/table';
import { useState } from 'react';

interface SearchFilesProps {
  title?: string;
}

interface SearchResult {
  ids: string[][];
  distances: number[][];
  metadatas: any[][];
  documents: string[][];
}

export function SearchFiles({ title }: Readonly<SearchFilesProps>) {
  const [prompt, setPrompt] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [indexedFiles, setIndexedFiles] = useState<string[]>([]);
  const [searchInfo, setSearchInfo] = useState({
    model: 'Default Model',
    duration: '0ms',
  });

  const connectToDatabase = async () => {
    try {
      const response = await fetch('/api/collection-info');
      if (!response.ok) {
        throw new Error('Failed to connect to database');
      }
      const info = await response.json();
      setIsConnected(true);
      fetchIndexedFiles();
    } catch (error) {
      console.error('Failed to connect to database:', error);
      setIsConnected(false);
    }
  };

  const fetchIndexedFiles = async () => {
    try {
      const response = await fetch('/api/indexed-files');
      if (!response.ok) {
        throw new Error('Failed to fetch indexed files');
      }
      const files = await response.json();
      setIndexedFiles(files);
    } catch (error) {
      console.error('Failed to fetch indexed files:', error);
    }
  };

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    setIsSearching(true);
    try {
      const startTime = performance.now();
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(prompt)}`
      );
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const results: SearchResult = await response.json();
      const endTime = performance.now();
      setSearchResults(results);
      setSearchInfo((prev) => ({
        ...prev,
        duration: `${(endTime - startTime).toFixed(2)}ms`,
      }));
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">{title || 'RAG Search'}</h1>

      <div className="flex space-x-2">
        <Input
          placeholder="Enter your search prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow"
        />
        <Button
          onClick={handleSearch}
          disabled={!isConnected || isSearching}
          className="transition-all duration-200 ease-in-out"
        >
          Search
        </Button>
        <Button
          onClick={connectToDatabase}
          className={`transition-all duration-200 ease-in-out ${
            isConnected
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isConnected ? 'Connected' : 'Connect'}
        </Button>
      </div>

      <div className="rounded bg-secondary p-2">
        <p>Embedding Model: {searchInfo.model}</p>
        <p>Search Duration: {searchInfo.duration}</p>
        <div
          className={`ml-2 inline-block h-3 w-3 rounded-full ${
            isSearching
              ? 'bg-yellow-500'
              : isConnected
                ? 'bg-green-500'
                : 'bg-red-500'
          }`}
        ></div>
      </div>

      <div
        className={`transition-opacity duration-300 ${isSearching ? 'opacity-50' : 'opacity-100'}`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Indexed Files</TableHead>
              <TableHead className="w-1/2">Search Results</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="align-top">
                <p>Total Indexed Files: {indexedFiles.length}</p>
                <ol>
                  {indexedFiles.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ol>
              </TableCell>
              <TableCell className="align-top">
                {searchResults && (
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>File</TableHead>
                          <TableHead>Distance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {searchResults.ids[0]
                          .map((id, index) => ({
                            id,
                            distance: searchResults.distances[0][index],
                          }))
                          .sort((a, b) => a.distance - b.distance)
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{item.id}</TableCell>
                              <TableCell>{item.distance.toFixed(4)}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <Accordion type="single" collapsible className="mt-4">
                      {searchResults.ids[0].map((id, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>{id}</AccordionTrigger>
                          <AccordionContent>
                            <div className="max-h-96 overflow-auto">
                              <ShikiRender
                                code={searchResults.documents[0][index]}
                                language="js"
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
