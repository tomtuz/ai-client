import { APIConfig } from "@/api/types";
import ChatWindow from "@/components/ChatWindow";
import { Header } from "@/components/Header";
import { ChatControls } from "@/components/devtools/ChatControls";
import { logger } from "@/utils/logger";
import { cn } from "@/utils/tw_utils";

// hooks
import { useChat } from "@/hooks/useChat";
import { useTheme } from "@/hooks/useTheme";

function App() {
  const { theme } = useTheme();
  const {
    messages,
    isLoading,
    sendUserMessage,
    addTestMessage,
    processResponseMessage,
  } = useChat();

  const handleSaveConfig = (config: APIConfig) => {
    logger.info(`Saving config: ${JSON.stringify(config)}`);
    // You might want to update your apiConfigs here or dispatch an action to update the state
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col bg-background text-foreground ",
        theme,
      )}
    >
      <Header onSave={handleSaveConfig} />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="w-64 p-4">
            <h2 className="mb-4 font-semibold text-lg">Select API</h2>
            {/* <ModelSelector /> */}

            {/* <DropdownProvider items={apiConfigs.map((config) => config.id)}>
              <div className="p-4">
                <h1 className="mb-4 font-bold text-2xl">Dropdown Selection</h1>
                <DropdownContainer />
              </div>
            </DropdownProvider> */}

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
          <div className="rounded-lg bg-white p-4">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default App;
