import { cn } from "@/utils/tw_utils";
import { MessageContents } from "@/types/chat";
import { ShikiRender } from "@/lib/ShikiRender";
import { useClipBoard } from "@/hooks/clipboard";
import { Button } from "./cn/ui";

interface MessageProps {
  message: MessageContents;
}

export function Message({ message }: MessageProps) {
  const codeContent = message.content.map((item) => item.text).join("\n");
  const { isCopied, copyToClipboard } = useClipBoard({ timeout: 2000 });

  const handleCopyMessage = () => {
    console.log("codeContent: ", codeContent);
    copyToClipboard(codeContent);
  };

  return (
    <div
      key={message.id}
      className={"border rounded-t-lg relative w-full mb-4"}
    >
      <div
        className={cn(
          "rounded-t-lg bg-chat-header text-card-foreground shadow-sm flex justify-end p-2.5",
        )}
      >
        <Button
          className="flex h-auto py-1 px-2 hover:underline"
          onClick={() => handleCopyMessage()}
        >
          copy
        </Button>
      </div>
      <div
        className={cn(
          "prose-pre:m-0 prose prose-a:text-blue-600 max-w-none hover:prose-code:text-blue-500 w-full inline-block p-2.5 rounded-b-lg bg-chat-content text-foreground",
        )}
      >
        {message.role !== "ai" ? (
          codeContent
        ) : (
          <ShikiRender
            code={codeContent}
            language="js"
          />
        )}
      </div>
    </div>
  );
}
