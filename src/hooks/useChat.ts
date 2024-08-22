import { sendMessage } from "@/services/api";
import { MessageContent } from "@/types/chat";
import { logger } from "@/utils/logger";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
  const [messages, setMessages] = useState<MessageContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback(
    (message: MessageContent) => {
      logger.info(`addingMessage: ${JSON.stringify(message)}`);
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("messages: ", messages);
    },
    [messages],
  );

  const removeMessage = useCallback(
    async (messageId: string) => {
      const index = messages.findIndex((element) => element.id === messageId);
      console.log("found index: ", index);

      if (index !== -1) {
        messages.splice(index, 1);
      }
    },
    [messages],
  );

  const addTestMessage = useCallback(
    async (textMsg: string, role: string) => {
      const userMessage: MessageContent = {
        id: uuidv4(),
        content: [{ text: textMsg, type: "text" }],
        model: "test-model",
        role,
      };
      addMessage(userMessage);
    },
    [addMessage],
  );

  const addUserMessage = useCallback(
    (userTextInput: string) => {
      const userMessage: MessageContent = {
        id: uuidv4(),
        content: [{ text: userTextInput }],
        role: "user",
      };
      addMessage(userMessage);
    },
    [addMessage],
  );

  const sendUserMessage = useCallback(
    async (userTextInput: string, isTest?: boolean) => {
      setIsLoading(true);

      try {
        logger.info("test");
        const responseMessage = await sendMessage(userTextInput, isTest);
        logger.info(
          `responseMessage: ${JSON.stringify(responseMessage, null, 2)}`,
        );
        processResponseMessage(responseMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        addMessage({
          id: uuidv4(),
          content: [
            { text: "Sorry, there was an error processing your message." },
          ],
          role: "ai",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage],
  );

  function processResponseMessage(response: MessageContent) {
    const { id, content, role } = response;
    logger.info(
      `id: ${JSON.stringify(id)}, content: ${JSON.stringify(content)}, role: ${JSON.stringify(role)}`,
    );

    const aiMessage: MessageContent = { id, content, role };
    logger.info(`aiMessage: ${JSON.stringify(aiMessage, null, 2)}`);

    addMessage(aiMessage);
  }

  return {
    messages,
    addMessage,
    removeMessage,
    isLoading,
    sendUserMessage,
    addTestMessage,
    addUserMessage,
    processResponseMessage,
  };
};
