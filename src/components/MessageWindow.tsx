import { MessageContents } from "@/types/chat";
import { Message } from "./Message";
import { Message2 } from "./Message2";

interface MessageProps {
  messages: MessageContents[];
}

export function MessageList({ messages }: MessageProps) {
  return (
    <div>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
    </div>
  );
}
