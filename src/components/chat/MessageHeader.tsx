import { MessageActions } from './MessageActions';

interface MessageHeaderProps {
  role: string;
  model?: string;
  tokens?: number;
  onCopy: () => void;
  onDelete: () => void;
  isCopied: boolean;
}

export function MessageHeader({
  role,
  model,
  tokens,
  onCopy,
  onDelete,
  isCopied,
}: MessageHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b bg-chat-header px-4 py-2">
      <div className="flex items-center space-x-2">
        <span
          className={`text-sm font-semibold ${
            role === 'AI'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-foreground'
          }`}
        >
          {role}
        </span>
        {model && (
          <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-foreground dark:bg-gray-700">
            {model}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-muted-foreground">
          Tokens: {tokens || 'N/A'}
        </span>
        <MessageActions
          onCopy={onCopy}
          onDelete={onDelete}
          isCopied={isCopied}
        />
      </div>
    </div>
  );
}
