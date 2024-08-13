import ChatWindow from "@/components/ChatWindow";
import { useChat } from "@/hooks/useChat";
import Header from "@/components/Header";
import { ChatControls } from "@/components/devtools/ChatControls";
import { ModelSelector } from "@/components/ModelSelector";

function App() {
  const { messages, isLoading, sendUserMessage, addTestMessage } = useChat();

  return (
    <div className="dark flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="w-64 p-4">
            <h2 className="text-lg font-semibold mb-4">Select API</h2>
            <ModelSelector />
            <ChatControls
              onSendMessage={sendUserMessage}
              onAddTestMessage={addTestMessage}
            />
          </div>
          <div className="bg-secondary flex-1">
            <ChatWindow
              messages={messages}
              onSendMessage={sendUserMessage}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">Loading...</div>
        </div>
      )}
    </div>
  );
}

export default App;
