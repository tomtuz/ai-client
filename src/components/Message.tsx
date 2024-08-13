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
      className={"relative w-full mb-4"}
    >
      <span
        className={cn(
          "absolute right-1 top-1 opacity-20 hover:opacity-100 transition-opacity duration-300",
        )}
      >
        <Button onClick={() => handleCopyMessage()}>copy</Button>
      </span>
      <div
        className={cn(
          "w-full inline-block p-2 rounded-lg bg-background text-foreground",
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
