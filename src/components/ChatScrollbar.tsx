import { useEffect, useRef, useState } from 'react';
import capyIcon from '../assets/CapyIcon.png';

type ChatScrollbarProps = {
  chatHistory: { sender: string; message: string }[];
  setConversation: React.Dispatch<
    React.SetStateAction<{ sender: string; message: string }[]>
  >;
};

function ChatScrollbar({ chatHistory, setConversation }: ChatScrollbarProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom whenever `chatHistory` updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      ref={chatContainerRef}
      className="my-auto h-full p-4 w-full overflow-y-scroll px-[25%] xs:px-8"
    >
      <div className="flex flex-col space-y-10">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`relative flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
              <img
                src={capyIcon}
                alt="CapyIcon"
                className="absolute -top-2 -left-14 w-10 h-9 mr-3"
              />
            )}
            <div
              className={`rounded-lg p-3 max-w-full ${
                msg.sender === 'user'
                  ? 'bg-primary text-text-light'
                  : 'bg-gray-200 text-black'
              }`}
            >
              <span>{msg.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatScrollbar;
