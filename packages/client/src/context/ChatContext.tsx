import { useChatHook } from '@/hooks/useChatHook';
import { MessageContent } from '@/types/chat';
import { ReactNode, createContext, useContext, useMemo } from 'react';

interface ChatContextType {
  messages: MessageContent[];
  isLoading: boolean;
  error: string | null;
  sendUserMessage: (message: string) => Promise<void>;
  addTestMessage: (textMsg: string, role: string) => void;
  removeMessage: (id: string) => void;
  processResponseMessage: (response: MessageContent) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const chatHook = useChatHook();

  const contextValue = useMemo(
    () => ({
      ...chatHook,
      sendUserMessage: async (message: string) => {
        try {
          await chatHook.sendUserMessage(message);
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      },
    }),
    [chatHook]
  );

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export function createMessage(
  content: string,
  role: 'user' | 'ai'
): MessageContent {
  return {
    id: Date.now().toString(),
    content: [{ text: content }],
    role,
  };
}
