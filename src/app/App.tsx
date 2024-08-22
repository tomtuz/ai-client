import ChatWindow from "@/components/ChatWindow";
import { Header } from "@/components/Header";
import { MessageList } from "@/components/MessageList";
import { ChatControls } from "@/components/devtools/ChatControls";
import { ConfigurationProvider } from "@/context/ConfigContext";
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/tw_utils";

function App() {
  const { theme } = useTheme();
  const {
    messages,
    isLoading,
    sendUserMessage,
    addTestMessage,
    addMessage,
    removeMessage,
    processResponseMessage,
  } = useChat();

  return (
    <ConfigurationProvider>
      <div
        className={cn(
          "flex h-screen flex-col bg-background text-foreground ",
          theme,
        )}
      >
        <Header />
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            <div className="w-64 p-4">
              <ChatControls
                onSendMessage={sendUserMessage}
                onAddTestMessage={addTestMessage}
                onTestResponse={processResponseMessage}
              />
            </div>
            <div className="h-full w-full flex flex-col">
              <MessageList
                messages={messages}
                onDeleteMessage={removeMessage}
              />
              <div className="h-full p-0.5 w-full max-w-3xl flex flex-col items-center justify-end align-bottom">
                <ChatWindow
                  messages={messages}
                  onSendMessage={sendUserMessage}
                  isConfigLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigurationProvider>
  );
}

export default App;
