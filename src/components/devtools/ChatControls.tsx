import { code_string } from '@/tests/msg_code';
import { msg_long } from '@/tests/msg_long';
import { MessageContent } from '@/types/chat';
import { Button } from '@cn/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ChatControlsProps {
  onAddTestMessage: (textMsg: string, role: string) => void;
  onSendMessage: (message: string) => void;
  onTestResponse: (response: MessageContent) => void;
}

const testButtons = [
  { label: 'Test prompt (Live)', action: 'promptTest' },
  { label: 'Test DeepSeek (offline)', action: 'testMessage' },
  { label: 'Add msg (user)', action: 'testResponse' },
  { label: 'Add msg (AI)', action: 'testAIMessage' },
  { label: 'Add long msg', action: 'longMessage' },
  { label: 'Add code message', action: 'codeMessage' },
];

export function ChatControls({
  onAddTestMessage,
  onSendMessage,
  onTestResponse,
}: Readonly<ChatControlsProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = useCallback(
    (action: string) => {
      switch (action) {
        case 'promptTest':
          onSendMessage("say just the word 'apple'");
          break;
        case 'testMessage':
          onAddTestMessage('test message User', 'user');
          break;
        case 'testResponse':
          onTestResponse({
            id: uuidv4(),
            role: 'assistant',
            type: 'text',
            content: [{ text: 'This is a test response.', type: 'testxt' }],
          });
          break;
        case 'testAIMessage':
          onAddTestMessage('test message AI', 'ai');
          break;
        case 'longMessage':
          onAddTestMessage(msg_long, 'user');
          break;
        case 'codeMessage':
          onAddTestMessage(code_string, 'ai');
          break;
      }
    },
    [onAddTestMessage, onSendMessage, onTestResponse]
  );

  return (
    <div className="fixed left-0 top-0 h-full">
      <div
        className={`fixed left-0 top-0 h-full w-64 overflow-hidden border-r border-border bg-background transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-4.5rem)]'} `}
      >
        <div className="w-64 p-4">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Chat Controls
          </h2>
          <div className="flex flex-col space-y-2">
            {testButtons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleAction(button.action)}
                variant="outline"
                size="sm"
                className={`transition-all duration-300 ease-in-out ${
                  isOpen
                    ? 'w-full translate-x-0 opacity-100'
                    : 'w-0 -translate-x-full opacity-0'
                } `}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '500ms',
                }}
              >
                <span className="overflow-hidden whitespace-nowrap">
                  {button.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={`fixed left-0 top-4 z-10 w-10 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-[15rem]' : 'translate-x-[calc(1rem)]'} `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
