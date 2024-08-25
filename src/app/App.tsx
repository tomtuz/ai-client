import { ChatArea } from '@/components/ChatArea';
import { ChatControls } from '@/components/devtools/ChatControls';
import { useChat } from '@/context/ChatContext';
import { useTheme } from '@/hooks/useTheme';
import { MessageContent } from '@/types/chat';
import { cn } from '@/utils/tw_utils';

export function App() {
  const { theme } = useTheme();
  const { addTestMessage, sendUserMessage, processResponseMessage } = useChat();

  return (
    <main
      className={cn(
        'flex flex-1 flex-col overflow-hidden bg-background text-foreground',
        theme
      )}
    >
      <div className="flex h-full">
        <aside className="w-64 p-4">
          <ChatControls
            onAddTestMessage={addTestMessage}
            onSendMessage={sendUserMessage}
            onTestResponse={(response: MessageContent) =>
              processResponseMessage(response)
            }
          />
        </aside>
        <ChatArea />
      </div>
    </main>
  );
}
