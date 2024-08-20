import { Input, Label } from "@cn/ui";
import { Search } from "lucide-react";

interface SearchConfigsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchConfigs({
  searchTerm,
  setSearchTerm,
}: SearchConfigsProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="searchInput"
        className="text-sm font-medium"
      >
        Model search
      </Label>
      <div className="relative">
        <Input
          id="searchInput"
          placeholder="Search configurations..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}
