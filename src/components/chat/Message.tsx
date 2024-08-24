import { useClipBoard } from '@/hooks/clipboard';
import { MessageContent } from '@/types/chat';
import { AIMessage } from './AIMessage';
import { AccordionUserMessage } from './AccordionUserMessage';
import { UserMessage } from './UserMessage';

interface MessageProps {
  message: MessageContent;
  onDelete: (id: string) => void;
  useShadcnAccordion?: boolean;
}

export function Message({
  message,
  onDelete,
  useShadcnAccordion = false,
}: MessageProps) {
  const { isCopied, copyToClipboard } = useClipBoard({ timeout: 2000 });

  const handleCopyMessage = () => {
    const codeContent =
      message.content.length > 1
        ? message.content.join('\n')
        : message.content[0].text;
    copyToClipboard(codeContent);
  };

  const MessageComponent =
    message.role === 'ai'
      ? AIMessage
      : useShadcnAccordion
        ? AccordionUserMessage
        : UserMessage;

  return (
    <div className="mb-6">
      <MessageComponent
        message={message}
        onCopy={handleCopyMessage}
        onDelete={() => onDelete(message.id)}
        isCopied={isCopied}
      />
    </div>
  );
}
