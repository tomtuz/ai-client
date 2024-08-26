import { useState, useCallback } from 'react';

const MAX_MESSAGE_LENGTH = 4000;

interface UseChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isConfigurationLoading: boolean;
}

interface UseChatInputResult {
  input: string;
  setInput: (value: string) => void;
  isSending: boolean;
  error: string | null;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
}

export const useChatInput = ({
  onSendMessage,
  isConfigurationLoading,
}: UseChatInputProps): UseChatInputResult => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      const trimmedInput = input.trim();
      if (
        !trimmedInput ||
        isConfigurationLoading ||
        trimmedInput.length > MAX_MESSAGE_LENGTH
      ) {
        return;
      }

      setIsSending(true);
      setError(null);

      try {
        await onSendMessage(trimmedInput);
        setInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
        setError('Failed to send message. Please try again.');
      } finally {
        setIsSending(false);
      }
    },
    [input, isConfigurationLoading, onSendMessage]
  );

  return { input, setInput, isSending, error, handleSubmit };
};
