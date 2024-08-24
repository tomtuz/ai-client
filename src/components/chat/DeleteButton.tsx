import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/cn/ui';
import { MoreHorizontal, Trash } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="absolute right-2 top-2 h-auto p-1">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Button
          variant="ghost"
          className="flex items-center px-3 py-2 text-red-600 transition-colors duration-200 hover:bg-red-100 hover:text-red-700"
          onClick={onDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
