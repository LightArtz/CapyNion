import { useEffect, useRef, useState } from 'react';

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
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]); // Run this effect whenever `conversation` updates

  const handleBotResponse = async () => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'bot', message: response },
    ]);
  };

  const handleUserMessage = async () => {
    setConversation((prevConversation) => [
      ...prevConversation,
      { sender: 'user', message: userMessage },
    ]);
  };

  useEffect(() => {
    handleUserMessage();
  }, [userMessage]);

  useEffect(() => {
    handleBotResponse();
  }, [response]);

  return (
    <div
      ref={chatContainerRef}
      className="my-auto w-full h-full overflow-y-scroll p-4"
    >
      <div className="flex flex-col space-y-3">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg p-3 max-w-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
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
