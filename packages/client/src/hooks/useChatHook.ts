import { sendMessage } from '@/services/api';
import { MessageContent } from '@/types/chat';
import { logger } from '@/utils/logger';
import { useCallback, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ChatState = {
  messages: MessageContent[];
  isLoading: boolean;
  error: string | null;
};

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: MessageContent }
  | { type: 'REMOVE_MESSAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_MESSAGES' };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
};

export const useChatHook = () => {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    isLoading: false,
    error: null,
  });

  const addMessage = useCallback((message: MessageContent) => {
    logger.info(`Adding message: ${JSON.stringify(message)}`);
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const removeMessage = useCallback((messageId: string) => {
    logger.info(`Removing message with id: ${messageId}`);
    dispatch({ type: 'REMOVE_MESSAGE', payload: messageId });
  }, []);

  const clearMessages = useCallback(() => {
    logger.info('Clearing all messages');
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);

  const addTestMessage = useCallback(
    (textMsg: string, role: string) => {
      const testMessage: MessageContent = {
        id: uuidv4(),
        content: [{ text: textMsg, type: 'text' }],
        model: 'test-model',
        role,
      };
      addMessage(testMessage);
    },
    [addMessage]
  );

  const addUserMessage = useCallback(
    (userTextInput: string) => {
      const userMessage: MessageContent = {
        id: uuidv4(),
        content: [{ text: userTextInput }],
        role: 'user',
      };
      addMessage(userMessage);
    },
    [addMessage]
  );

  const sendUserMessage = useCallback(
    async (userTextInput: string, isTest?: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        logger.info('Sending user message');
        const responseMessage = await sendMessage(userTextInput, isTest);
        logger.info(`Received response: ${JSON.stringify(responseMessage)}`);
        processResponseMessage(responseMessage);
      } catch (error) {
        logger.error('Error sending message:', error);
        dispatch({
          type: 'SET_ERROR',
          payload: 'Sorry, there was an error processing your message.',
        });
        addMessage({
          id: uuidv4(),
          content: [
            { text: 'Sorry, there was an error processing your message.' },
          ],
          role: 'ai',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [addMessage]
  );

  const processResponseMessage = useCallback(
    (response: MessageContent) => {
      const { id, content, role } = response;
      logger.info(`Processing response message: id=${id}, role=${role}`);
      const aiMessage: MessageContent = { id, content, role };
      addMessage(aiMessage);
    },
    [addMessage]
  );

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    addMessage,
    removeMessage,
    clearMessages,
    sendUserMessage,
    addTestMessage,
    addUserMessage,
    processResponseMessage,
  };
};
