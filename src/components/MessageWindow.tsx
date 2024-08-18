import { MessageContents } from "@/types/chat";
import { Message } from "./Message";

interface MessageProps {
  messages: MessageContents[];
}

export function MessageList({ messages }: MessageProps) {
  return (
    <div>
      {messages?.map((message, index) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}
