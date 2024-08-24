import { Message } from '@/components/chat/Message';
import { MessageContent } from '@/types/chat';

interface MessageListProps {
  messages: MessageContent[];
  onDeleteMessage: (id: string) => void;
}

export function MessageList({ messages, onDeleteMessage }: MessageListProps) {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4">
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
