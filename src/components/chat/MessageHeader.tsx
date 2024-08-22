import { Button } from "@/components/cn/ui";

interface MessageHeaderProps {
  role: string;
  model?: string;
  tokens?: number;
  onCopy: () => void;
  isCopied: boolean;
}

export function MessageHeader({
  role,
  model,
  tokens,
  onCopy,
  isCopied,
}: MessageHeaderProps) {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b">
      <div className="flex items-center space-x-2">
        <span
          className={`text-sm font-semibold ${role === "AI" ? "text-blue-600" : "text-gray-600"}`}
        >
          {role}
        </span>
        {model && (
          <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
            {model}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-500">Tokens: {tokens || "N/A"}</span>
        <Button
          className="text-xs hover:bg-gray-200 transition-colors duration-200"
          onClick={onCopy}
        >
          {isCopied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
