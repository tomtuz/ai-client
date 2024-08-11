import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';
import { sendMessage } from '@/services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const sendUserMessage = useCallback(async (content: string) => {
    const userMessage: Message = { content, sender: 'user' };
    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      const aiMessage: Message = { content: response, sender: 'ai' };
      addMessage(aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({ content: 'Sorry, there was an error processing your message.', sender: 'ai' });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  return { messages, isLoading, sendUserMessage };
};
