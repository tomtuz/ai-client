import React, { useState, useEffect, useRef } from "react";
import { MessageContents } from "@/types/chat";
import { MessageList } from "@components/MessageWindow";
import { Input, Textarea } from "./cn/ui";

interface ChatWindowProps {
  messages: MessageContents[];
  onSendMessage: (message: string) => void;
}

function ChatWindow({ messages, onSendMessage }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-background text-foreground flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t"
      >
        <div className="flex">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex prose prose-a:text-blue-600 max-w-none hover:prose-code:text-blue-500 min-h-0 border p-2 w-full resize-none"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-button-accent p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
