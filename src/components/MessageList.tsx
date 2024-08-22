import { Message } from "@/components/chat/Message";
import { MessageContent } from "@/types/chat";

interface MessageListProps {
  messages: MessageContent[];
  onDeleteMessage: (id: string) => void;
}

export function MessageList({ messages, onDeleteMessage }: MessageListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {messages?.map((message) => (
        <Message
          key={message.id}
          message={message}
          onDelete={onDeleteMessage}
          useShadcnAccordion={false} // or false to use the Tailwind version
        />
      ))}
    </div>
  );
}
