import { Search } from "lucide-react";
import { Input } from "./cn/ui";

interface SearchConfigsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchConfigs({
  searchTerm,
  setSearchTerm,
}: SearchConfigsProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Search configurations..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2" />
    </div>
  );
}
