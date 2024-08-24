import { ChatArea } from "@/components/ChatArea";
import { ChatControls } from "@/components/devtools/ChatControls";
import { useChat } from "@/context/ChatContext";
import { MessageContent } from "@/types/chat";

function App() {
  const { addTestMessage, sendUserMessage, processResponseMessage } = useChat();
  return (
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
  );
}

export default App;
