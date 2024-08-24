import { ChatArea } from "@/components/ChatArea";
import { Header } from "@/components/Header";
import { ChatControls } from "@/components/devtools/ChatControls";
import { useChat } from "@/context/ChatContext";
import { useTheme } from "@/hooks/useTheme";
import { MessageContent } from "@/types/chat";
import { cn } from "@/utils/tw_utils";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const { theme } = useTheme();
  const { addTestMessage, sendUserMessage, processResponseMessage } = useChat();

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-background text-foreground",
        theme,
      )}
    >
      <Header />
      <main className="flex-1 overflow-hidden">
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
    </div>
  );
}
