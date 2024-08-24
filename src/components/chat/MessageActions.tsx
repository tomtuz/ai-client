import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/cn/ui';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';

interface MessageActionsProps {
  onCopy: () => void;
  onDelete: () => void;
  isCopied: boolean;
}

export function MessageActions({
  onCopy,
  onDelete,
  isCopied,
}: MessageActionsProps) {
  return (
    <div className="right-2 top-2 flex items-center space-x-2">
      <Button variant="ghost" size="sm" onClick={onCopy} className="h-auto p-1">
        <Copy className="h-4 w-4" />
        <span className="sr-only">{isCopied ? 'Copied' : 'Copy'}</span>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto p-1">
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
    </div>
  );
}
