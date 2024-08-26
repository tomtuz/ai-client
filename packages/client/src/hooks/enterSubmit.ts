import { type RefObject, useRef, useCallback } from 'react';

interface UseEnterSubmitOptions {
  submitKey?: string;
  onCustomSubmit?: () => void;
  preventEmptySubmit?: boolean;
}

export function useEnterSubmit(options: UseEnterSubmitOptions = {}): {
  formRef: RefObject<HTMLFormElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
} {
  const {
    submitKey = 'Enter',
    onCustomSubmit,
    preventEmptySubmit = false,
  } = options;
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = useCallback(() => {
    formRef.current?.requestSubmit();
    onCustomSubmit?.();
  }, [onCustomSubmit]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if (
        event.key === submitKey &&
        !event.shiftKey &&
        !event.nativeEvent.isComposing
      ) {
        const textarea = event.currentTarget;
        if (preventEmptySubmit && textarea.value.trim() === '') {
          return;
        }
        submitForm();
        event.preventDefault();
      }
    },
    [submitKey, submitForm, preventEmptySubmit]
  );

  const handleSubmit = useCallback(() => {
    const textarea = formRef.current?.querySelector('textarea');
    if (preventEmptySubmit && textarea && textarea.value.trim() === '') {
      return;
    }
    submitForm();
  }, [submitForm, preventEmptySubmit]);

  return { formRef, onKeyDown: handleKeyDown, onSubmit: handleSubmit };
}
