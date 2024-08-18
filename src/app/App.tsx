import ChatWindow from "@/components/ChatWindow";
import { useChat } from "@/hooks/useChat";
import Header from "@/components/Header";
import { ChatControls } from "@/components/devtools/ChatControls";
import { ModelSelector } from "@/components/ModelSelector";
import { DropdownContainer } from "@/components/DropdownContainer";
import { DropdownProvider } from "@/context/DropdownContext";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/tw_utils";
import { logger } from "@/utils/logger";
import { apiConfigs } from "@/api/model_configs";

function App() {
  logger.info("hello world!");
  const { theme } = useTheme();
  const {
    messages,
    isLoading,
    sendUserMessage,
    addTestMessage,
    processResponseMessage,
  } = useChat();
  const model_configs: string[] = [...apiConfigs.map((config) => config.id)];

  logger.info(`model_configs: ${model_configs}`);

  return (
    <div
      className={cn(
        "bg-background text-foreground flex flex-col h-screen ",
        theme,
      )}
    >
      <Header />
      <div className="flex-1 overflow-hidden ">
        <div className="flex h-full">
          <div className="w-64 p-4">
            <h2 className="mb-4 text-lg font-semibold">Select API</h2>
            <ModelSelector />

            <DropdownProvider items={model_configs}>
              <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Dropdown Selection</h1>
                <DropdownContainer />
              </div>
            </DropdownProvider>

            <ChatControls
              onSendMessage={sendUserMessage}
              onAddTestMessage={addTestMessage}
              onTestResponse={processResponseMessage}
            />
          </div>
          <ChatWindow
            messages={messages}
            onSendMessage={sendUserMessage}
          />
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default App;
