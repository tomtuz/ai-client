import { useConfiguration } from '@/context/ConfigContext';
import { useEnterSubmit } from '@/hooks/enterSubmit';
import { useChatInput } from '@/hooks/useChatInput';
import { Tooltip, TooltipProvider } from '@cn/ui';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { CirclePlus, CornerDownLeft, Loader2 } from 'lucide-react';
import React, { useEffect, useMemo, useRef } from 'react';
import Textarea from 'react-textarea-autosize';
import { Button } from './cn/ui';

interface ChatWindowProps {
  onSendMessage: (message: string) => Promise<void>;
  isConfigLoading: boolean;
  onNewChat: () => void;
}

const MAX_MESSAGE_LENGTH = 4000;
const WARNING_THRESHOLD = 100;

export function ChatWindow({
  onSendMessage,
  isConfigLoading,
  onNewChat,
}: ChatWindowProps) {
  const { isLoading: isConfigurationLoading } = useConfiguration();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { input, setInput, isSending, error, handleSubmit } = useChatInput({
    onSendMessage,
    isConfigurationLoading,
  });

  const { formRef, onKeyDown } = useEnterSubmit({
    onCustomSubmit: handleSubmit,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const newChatButton = useMemo(
    () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-1 top-1 size-8 rounded-full bg-background p-0 sm:left-4 sm:top-4"
              aria-label="New Chat"
              onClick={onNewChat}
            >
              <CirclePlus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    [onNewChat]
  );

  const sendButton = useMemo(
    () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-8"
              type="submit"
              size="icon"
              disabled={
                input.trim() === '' ||
                isConfigLoading ||
                isSending ||
                input.length > MAX_MESSAGE_LENGTH
              }
              aria-label="Send message"
            >
              {isSending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <CornerDownLeft />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Send message</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    [input, isConfigLoading, isSending]
  );

  const characterCount = MAX_MESSAGE_LENGTH - input.length;
  const isNearLimit = characterCount <= WARNING_THRESHOLD;

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        {newChatButton}
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Chat input"
          maxLength={MAX_MESSAGE_LENGTH}
        />
        {isNearLimit && (
          <div
            className={`text-xs ${characterCount === 0 ? 'text-red-500' : 'text-yellow-500'} absolute bottom-1 right-14`}
            aria-live="polite"
            aria-atomic="true"
          >
            {characterCount} characters remaining
          </div>
        )}
        <div className="absolute right-1 top-1 sm:right-4 sm:top-4">
          {sendButton}
        </div>
      </div>
      {error && (
        <div className="mt-2 text-red-500" role="alert">
          Error: {error}
        </div>
      )}
    </form>
  );
}

export default React.memo(ChatWindow);
