import { useState, useCallback } from 'react';
import { Message } from '@/types/chat';
import { sendMessage } from '@/services/api';
import { v4 as uuidv4 } from 'uuid'

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const sendUserMessage = useCallback(async (userTextInput: string) => {
    const userMessage: Message = { id: uuidv4(), content: [{ text: userTextInput }], role: 'user' };
    addMessage(userMessage);
    setIsLoading(true);

    try {
      const responseMessage = await sendMessage(userTextInput);
      const { id, content, role } = responseMessage;
      const aiMessage: Message = { id, content, role };
      addMessage(aiMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        id: uuidv4(),
        content: [{ text: 'Sorry, there was an error processing your message.' }],
        role: 'ai'
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  return { messages, isLoading, sendUserMessage };
};
