import { useConfiguration } from "@/context/ConfigContext";
import { useEnterSubmit } from "@/hooks/enterSubmit";
import { MessageContent } from "@/types/chat";
import { Tooltip, TooltipProvider } from "@cn/ui";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { CirclePlus, CornerDownLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import Textarea from "react-textarea-autosize";
import { Button } from "./cn/ui";

interface ChatWindowProps {
  messages: MessageContent[];
  onSendMessage: (message: string) => void;
  isConfigLoading: boolean;
}

export function ChatWindow({
  messages,
  onSendMessage,
  isConfigLoading,
}: ChatWindowProps) {
  const { isLoading: isConfigurationLoading } = useConfiguration();
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isConfigurationLoading) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const [input, setInput] = useState("");
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  // new
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { formRef, onKeyDown } = useEnterSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target.message?.blur();
    }

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // TODO:
    // 1. Add user message UI
    onSendMessage(trimmedInput);

    // 2. Send user message and show UI
    // onSendResponses(trimmedInput);

    // 3. Clear input
    setInput("");
  };

  useEffect(() => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden px-8 sm:rounded-md sm:border sm:px-12">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-1 top-1 size-8 rounded-full bg-background p-0 sm:top-4 sm:left-4"
              >
                <CirclePlus />
                <span className="sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
        />
        <div className="absolute right-1 top-1 sm:top-4 sm:right-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="size-8 "
                  type="submit"
                  size="icon"
                  disabled={input === ""}
                >
                  <CornerDownLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </form>
  );
}

export default ChatWindow;
