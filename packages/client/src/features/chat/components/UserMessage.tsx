import { MessageContent } from '@/types/chat';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { MessageHeader } from './MessageHeader';

interface UserMessageProps {
  message: MessageContent;
  onCopy: () => void;
  onDelete: () => void;
  isCopied: boolean;
}

export function UserMessage({
  message,
  onCopy,
  onDelete,
  isCopied,
}: UserMessageProps) {
  const codeContent =
    message.content.length > 1
      ? message.content.join('\n')
      : message.content[0].text;

  const [isOpen, setIsOpen] = useState(false);

  // return (
  //   // <div className="overflow-hidden rounded-lg bg-chat-content shadow-md">
  //   //   <MessageHeader
  //   //     role={message.role || 'user'}
  //   //     model={message.model}
  //   //     tokens={message.tokens?.input}
  //   //     onCopy={onCopy}
  //   //     onDelete={onDelete}
  //   //     isCopied={isCopied}
  //   //   />

  //   //   <div className="group cursor-pointer">
  //   //     <div className="message-content relative">
  //   //       <div
  //   //         className={clsx(
  //   //           "pointer-events-none absolute bottom-0 left-0 h-[calc(3em+1rem)] w-full bg-gradient-to-t from-chat-content transition-opacity duration-300 group-[:has(input[type='checkbox']:checked)]:opacity-0"
  //   //         )}
  //   //       />

  //   //       {/* to-transparent */}
  //   //       <input
  //   //         type="checkbox"
  //   //         id={`accordion-${message.id}`}
  //   //         className="peer/check-input absolute h-0 w-0 opacity-0"
  //   //       />
  //   //       <label
  //   //         htmlFor={`accordion-${message.id}`}
  //   //         className="flex items-center justify-between border-b-2 px-4 pt-2"
  //   //       >
  //   //         <div className="relative">
  //   //           <div className="max-h-[3em] overflow-hidden transition-all duration-300 group-[:has(input[type='checkbox']:checked)]:max-h-screen">
  //   //             <p className="select-text p-4 text-foreground">{codeContent}</p>
  //   //           </div>
  //   //         </div>
  //   //       </label>
  //   //     </div>

  //   //     <div className="flex items-center justify-center p-2 transition-colors duration-200 hover:bg-accent">
  //   //       <ChevronDown className="block h-4 w-4 text-muted-foreground group-[:has(input[type='checkbox']:checked)]:hidden" />
  //   //       <ChevronUp className="hidden h-4 w-4 text-muted-foreground group-[:has(input[type='checkbox']:checked)]:block" />
  //   //       <span className="ml-2 text-sm text-muted-foreground">
  //   //         <span className="block group-has-checked:hidden">Expand</span>
  //   //         <span className="hidden group-has-checked:block">Collapse</span>
  //   //       </span>

  //   //       {/* <div className="rounded-md bg-yellow-200 px-3 py-1.5 text-sm text-gray-600 transition duration-200 group-hover:bg-yellow-300">
  //   //         <span className="block group-has-checked:hidden">Expand</span>
  //   //         <span className="hidden group-has-checked:block">Collapse</span>
  //   //       </div> */}
  //   //     </div>
  //   //   </div>
  //   // </div>

  //   <div className="mx-auto w-full max-w-4xl space-y-6 p-4">
  //     <div className="mb-6 overflow-hidden rounded-lg bg-pink-100 shadow-md">
  //       {/* Message Header */}
  //       {/* <div className="flex w-full items-center justify-center bg-green-200 py-2 font-semibold text-green-800">
  //         {`${header}-${id}`}
  //       </div> */}

  //       <MessageHeader
  //         role={message.role || 'user'}
  //         model={message.model}
  //         tokens={message.tokens?.input}
  //         onCopy={onCopy}
  //         onDelete={onDelete}
  //         isCopied={isCopied}
  //       />
  //       {/* Message Body - Accordion Group */}
  //       <div className="group cursor-pointer bg-blue-200 transition duration-300">
  //         {/* Hidden Input */}
  //         <input
  //           type="checkbox"
  //           id={`accordion-${message.id}`}
  //           className="sr-only"
  //           aria-hidden="true"
  //           aria-modal
  //         />
  //         {/* Label Trigger */}
  //         <label
  //           htmlFor={`accordion-${message.id}`}
  //           className="flex cursor-pointer flex-col items-center justify-between outline-dashed outline-1 outline-blue-200"
  //           aria-controls="accordion-content"
  //         >
  //           {/* Inner Content */}
  //           <div id="accordion-content" className="relative px-4 py-2">
  //             <div className="max-h-[3em] overflow-hidden transition-[max-height] duration-300 group-has-checked:max-h-screen">
  //               {codeContent}
  //             </div>
  //             {/* Shadow Overlay */}
  //             <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[calc(3em+0.5rem)] bg-gradient-to-t from-pink-100 transition duration-300 group-has-checked:opacity-0"></div>
  //           </div>
  //           {/* Expand Controls */}
  //           <div className="flex w-full items-center justify-center bg-gray-200 py-2 transition duration-200 group-hover:bg-blue-100">
  //             {/* Close/Open */}
  //             <div className="rounded-md bg-yellow-200 px-3 py-1.5 text-sm text-gray-600 transition duration-200 group-hover:bg-yellow-300">
  //               <span className="block group-has-checked:hidden">Expand</span>
  //               <span className="hidden group-has-checked:block">Collapse</span>
  //             </div>
  //           </div>
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="overflow-hidden rounded-lg bg-chat-content shadow-md">
      <MessageHeader
        role={message.role || 'user'}
        model={message.model}
        tokens={message.tokens?.input}
        onCopy={onCopy}
        onDelete={onDelete}
        isCopied={isCopied}
      />

      {/* Message Body - Accordion Group */}
      <div className="group cursor-pointer transition">
        {/* Hidden Input */}
        <input
          type="checkbox"
          id={`accordion-${message.id}`}
          className="absolute h-0 w-0 opacity-0"
        />

        {/* Label Trigger */}
        <label
          htmlFor={`accordion-${message.id}`}
          className="flex items-center justify-between border-b-2 px-4 pt-2"
        >
          {/* Inner Content */}
          <div id="accordion-content" className="relative px-4 py-2">
            <div className="max-h-[3em] overflow-hidden transition-[max-height] duration-300 group-has-checked:max-h-screen">
              {codeContent}
            </div>
            {/* Shadow Overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[calc(3em+0.5rem)] bg-gradient-to-t from-gray-400 transition duration-300 group-has-checked:opacity-0"></div>
          </div>

          {/* <div className="relative">
              <div className="max-h-[3em] overflow-hidden transition-all duration-300 group-[:has(input[type='checkbox']:checked)]:max-h-screen">
                <p className="select-text p-4 text-foreground">{codeContent}</p>
              </div>
            </div> */}

          {/* Expand Controls */}
          <div className="flex items-center justify-center p-2 transition-colors duration-200 hover:bg-accent">
            <ChevronDown className="block h-4 w-4 text-muted-foreground group-has-checked:hidden" />
            <ChevronUp className="hidden h-4 w-4 text-muted-foreground group-has-checked:block" />
            <span className="ml-2 text-sm text-muted-foreground">
              <span className="block group-has-checked:hidden">Expand</span>
              <span className="hidden group-has-checked:block">Collapse</span>
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
