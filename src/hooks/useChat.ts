import { sendMessage } from "@/services/api";
import { MessageContents } from "@/types/chat";
import { logger } from "@/utils/logger";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useChat = () => {
  const [messages, setMessages] = useState<MessageContents[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback(
    (message: MessageContents) => {
      logger.info(`addingMessage: ${JSON.stringify(message)}`);
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log("messages: ", messages);
    },
    [messages],
  );

  const addTestMessage = useCallback(
    async (textMsg: string, role: string) => {
      const userMessage: MessageContents = {
        id: uuidv4(),
        content: [{ text: textMsg }],
        role,
      };
      addMessage(userMessage);
    },
    [addMessage],
  );

  const sendUserMessage = useCallback(
    async (userTextInput: string) => {
      const userMessage: MessageContents = {
        id: uuidv4(),
        content: [{ text: userTextInput }],
        role: "user",
      };
      addMessage(userMessage);
      setIsLoading(true);

      try {
        const responseMessage = await sendMessage(userTextInput);
        logger.info(`responseMessage: ${responseMessage}`);
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

  function processResponseMessage(response: MessageContents) {
    const { id, content, role } = response;
    logger.info(
      `id: ${JSON.stringify(id)}, content: ${JSON.stringify(content)}, role: ${JSON.stringify(role)}`,
    );

    const aiMessage: MessageContents = { id, content, role };
    logger.info(`aiMessage: ${JSON.stringify(aiMessage, null, 2)}`);

    addMessage(aiMessage);
  }

  return {
    messages,
    isLoading,
    sendUserMessage,
    addTestMessage,
    processResponseMessage,
  };
};
