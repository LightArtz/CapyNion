import { useEffect, useRef, useState } from 'react';
import capyIcon from '../assets/CapyIcon.png';

function ChatScrollbar({
  userMessage,
  response,
}: {
  userMessage: string;
  response: string;
}) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [conversation, setConversation] = useState([
    { sender: 'bot', message: 'Hello! How can I assist you today?' },
  ]);

  // Auto-scroll to the bottom whenever `conversation` updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  // Add user message to conversation only if it's non-empty
  useEffect(() => {
    if (userMessage.trim()) {
      setConversation((prevConversation) => [
        ...prevConversation,
        { sender: 'user', message: userMessage },
      ]);
    }
  }, [userMessage]);

  // Add bot response to conversation only if it's non-empty
  useEffect(() => {
    if (response.trim()) {
      setConversation((prevConversation) => [
        ...prevConversation,
        { sender: 'bot', message: response },
      ]);
    }
  }, [response]);

  return (
    <div
      ref={chatContainerRef}
      className="my-auto h-full p-4 w-full overflow-y-scroll px-[25%] xs:px-8"
    >
      <div className="flex flex-col space-y-10 ">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`relative flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' ? (
              <img
                src={capyIcon}
                alt="CapyIcon"
                className="absolute -top-2 -left-14 w-10 h-9 mr-3"
              />
            ) : null}
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
