import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/components/ChatMessage')({
  component: () => <MessageList />,
});

const LongContent = `
  codeContent codeContent codeContent codeContent codeContent codeContent
  codeContent codeContent codeContent codeContent codeContent codeContent
  codeContent codeContent codeContent codeContent codeContent codeContent
  codeContent codeContent codeContent codeContent codeContent codeContent
  codeContent codeContent codeContent codeContent codeContent codeContent
`;

// This is a collapsible chat message (an accordion)
// The goal of this component is to avoid JS
// The current problems with this solution:
// 1. Heavy use of Tailwind class group
// 2. Overall accessibility errors for 'input hiding'
export function MessageList() {
  const messages = [
    { header: 'Message Header', message_content: LongContent },
    { header: 'Message Header', message_content: LongContent },
    { header: 'Message Header', message_content: LongContent },
  ];

  return (
    <div className="heigh-full block">
      {messages.map((msg, idx) => (
        <UserMessage
          key={idx}
          message={{
            id: idx,
            header: msg.header,
            message_content: msg.message_content,
          }}
        />
      ))}
    </div>
  );
}

interface MessageData {
  message: {
    id: number;
    header: string;
    message_content: string;
  };
}

export function UserMessage({ message }: MessageData) {
  const { id, header, message_content } = message;
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4">
      <div className="mb-6 overflow-hidden rounded-lg bg-pink-100 shadow-md">
        {/* Message Header */}
        <div className="flex w-full items-center justify-center bg-green-200 py-2 font-semibold text-green-800">
          {`${header}-${id}`}
        </div>
        {/* Message Body - Accordion Group */}
        <div className="group cursor-pointer bg-blue-200 transition duration-300">
          {/* Hidden Input */}
          <input
            type="checkbox"
            name={`accorion-button-${id}`}
            id={`accorion-button-${id}`}
            className="sr-only"
            aria-hidden="true"
          />
          {/* Label Trigger */}
          <label
            htmlFor={`accorion-button-${id}`}
            className="flex cursor-pointer flex-col items-center justify-between outline-dashed outline-1 outline-blue-200"
            aria-controls="accordion-content"
          >
            {/* Inner Content */}
            <div id="accordion-content" className="relative px-4 py-2">
              <div className="max-h-[3em] overflow-hidden transition-[max-height] duration-300 group-has-checked:max-h-screen">
                {message_content}
              </div>
              {/* Shadow Overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[calc(3em+0.5rem)] bg-gradient-to-t from-pink-100 transition duration-300 group-has-checked:opacity-0"></div>
            </div>
            {/* Expand Controls */}
            <div className="flex w-full items-center justify-center bg-gray-200 py-2 transition duration-200 group-hover:bg-blue-100">
              {/* Close/Open */}
              <div className="rounded-md bg-yellow-200 px-3 py-1.5 text-sm text-gray-600 transition duration-200 group-hover:bg-yellow-300">
                <span className="block group-has-checked:hidden">Expand</span>
                <span className="hidden group-has-checked:block">Collapse</span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
