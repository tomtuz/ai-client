import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/cn/ui";
import { MoreHorizontal, Trash } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="absolute top-2 right-2 p-1 h-auto"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Button
          variant="ghost"
          className="flex items-center px-3 py-2 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
          onClick={onDelete}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
