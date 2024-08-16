import ChatWindow from "@/components/ChatWindow";
import { useChat } from "@/hooks/useChat";
import Header from "@/components/Header";
import { ChatControls } from "@/components/devtools/ChatControls";
import { ModelSelector } from "@/components/ModelSelector";
import { GenericSelector } from "@/components/shared/GenericSelector";
import { Item } from "@/types/chat";
import { DropdownContainer } from "@/components/DropdownContainer";
import { DropdownProvider } from "@/context/DropdownContext";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/utils/tw_utils";

function App() {
  const { theme } = useTheme();
  const { messages, isLoading, sendUserMessage, addTestMessage } = useChat();
  const items: Item[] = [{ id: "item1" }, { id: "item2" }, { id: "item3" }];

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
            <GenericSelector
              title="OpenRouterM"
              optionArr={["Yes", "No"]}
              updateHandler={() => {}}
            />

            <DropdownProvider items={items}>
              <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Dropdown Selection</h1>
                <DropdownContainer />
              </div>
            </DropdownProvider>

            <ChatControls
              onSendMessage={sendUserMessage}
              onAddTestMessage={addTestMessage}
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
