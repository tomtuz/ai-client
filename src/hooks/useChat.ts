import { useState, useCallback } from 'react';
import { MessageContents } from '@/types/chat';
import { sendMessage } from '@/services/api';
import { v4 as uuidv4 } from 'uuid'

export const useChat = () => {
  const [messages, setMessages] = useState<MessageContents[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: MessageContents) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const addTestMessage = useCallback(async (textMsg: string, role: string) => {
    const userMessage: MessageContents = { id: uuidv4(), content: [{ text: textMsg }], role };
    addMessage(userMessage);

  }, [addMessage]);

  const sendUserMessage = useCallback(async (userTextInput: string) => {
    const userMessage: MessageContents = { id: uuidv4(), content: [{ text: userTextInput }], role: 'user' };
    addMessage(userMessage);
    setIsLoading(true);

    try {
      const responseMessage = await sendMessage(userTextInput);
      const { id, content, role } = responseMessage;
      const aiMessage: MessageContents = { id, content, role };
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

  return { messages, isLoading, sendUserMessage, addTestMessage };
};
