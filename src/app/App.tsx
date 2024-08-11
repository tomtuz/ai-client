import React, { useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import { useChat } from "@/hooks/useChat";
import { configureApi } from "@/services/api";
import { apiConfigs } from "@/utils/apiConfigs";

function App() {
  const { messages, isLoading, sendUserMessage } = useChat();
  const [selectedApi, setSelectedApi] = useState<string>(() => {
    configureApi(apiConfigs[0]);
    return apiConfigs[0].name;
  });

  const handleApiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const apiModelIdx = e.target.value;
    console.log("apiModelIdx: ", apiModelIdx);

    setSelectedApi(apiModelIdx);

    const selectedModel = apiConfigs.filter(
      (model) => model.name === apiModelIdx,
    )[0];
    console.log("apiConfigs: ", apiConfigs);
    console.log("selectedModel: ", selectedModel);

    configureApi(selectedModel);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Multi-API Chat Application</h1>
      </header>
      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4">Select API</h2>
            <select
              value={selectedApi}
              onChange={handleApiChange}
              className="w-full p-2 border rounded"
            >
              {Object.entries(apiConfigs).map(([key, config]) => (
                <option
                  key={key}
                  value={config.name}
                >
                  {config.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
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
