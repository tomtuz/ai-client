import ChatWindow from '@/components/ChatWindow';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { MessageList } from '@/components/MessageList';
import { useChat } from '@/context/ChatContext';
import React, { useMemo } from 'react';

function ChatArea() {
  const { messages, isLoading, sendUserMessage, removeMessage, error } =
    useChat();

  const memoizedMessageList = useMemo(
    () => <MessageList messages={messages} onDeleteMessage={removeMessage} />,
    [messages, removeMessage]
  );

  if (error) {
    return (
      <div className="text-red-500" role="alert" aria-live="assertive">
        Error: {error}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="ml-2 underline"
        >
          Reload page
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className="flex h-full w-full flex-col"
        role="main"
        aria-label="Chat Area"
      >
        <div className="flex-grow overflow-auto">{memoizedMessageList}</div>
        <div className="mx-auto w-full max-w-3xl p-0.5">
          <ChatWindow
            onSendMessage={sendUserMessage}
            isConfigLoading={isLoading}
            onNewChat={() => {}} // Add a no-op function or implement new chat functionality
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export const MemoizedChatArea = React.memo(ChatArea);
export { ChatArea };
