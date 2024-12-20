import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { IoIosSend } from 'react-icons/io';
import { getOpenAIResponse } from './OpenAIService';

interface ChatInputBoxProps {
  onSendMessage: (message: string) => void;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<number>(1);
  const MAX_ROWS = 6; // Maximum rows before scrolling
  const LINE_HEIGHT = 24; // Line height in pixels
  const INITIAL_CONTAINER_HEIGHT = 64; // Initial container height in pixels
  const [response, setResponse] = useState('');

  const adjustHeights = () => {
    if (textareaRef.current && containerRef.current) {
      const textarea = textareaRef.current;
      const container = containerRef.current;

      // Reset height to auto to recalculate scrollHeight
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;

      // Calculate the number of rows dynamically
      const calculatedRows = Math.min(
        Math.max(1, Math.floor(scrollHeight / LINE_HEIGHT)),
        MAX_ROWS,
      );
      setRows(calculatedRows);

      // Adjust the height of the textarea
      const adjustedHeight = Math.min(scrollHeight, MAX_ROWS * LINE_HEIGHT);
      textarea.style.height = `${adjustedHeight}px`;

      // Adjust the height of the container
      container.style.height = `${adjustedHeight + 32}px`; // Add padding for the container
    }
  };

  useEffect(() => {
    adjustHeights();
  }, [message]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Adjust heights dynamically when content is deleted
    if (e.target.value.trim() === '') {
      resetHeights();
    }
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: Create a new line
        return;
      } else {
        // Enter: Send message
        e.preventDefault();
        if (message.trim()) {
          // Call the backend service to get AI response
          const aiResponse = await getOpenAIResponse(message);

          console.log('AI Response:', aiResponse);

          // Extract the generated_text from the response
          if (aiResponse && aiResponse.length > 0 && aiResponse) {
            setResponse(aiResponse);
          } else {
            setResponse('Sorry, I could not understand your input.');
          }
  
          onSendMessage(message); // Trigger the callback
          setMessage(''); // Clear input after sending
          resetHeights(); // Reset heights
        }
      }
    }
  };
  
  const handleSend = async () => {
    // Call the backend service to get AI response
    const aiResponse = await getOpenAIResponse(message);

    console.log('AI Response:', aiResponse);

    // Extract the generated_text from the response
    if (aiResponse && aiResponse.length > 0 && aiResponse[0].generated_text) {
      setResponse(aiResponse[0].generated_text);
    } else {
      setResponse('Sorry, I could not understand your input.');
    }
  
    onSendMessage(message); // Trigger the callback
    setMessage(''); // Clear input after sending
    resetHeights(); // Reset heights
  };

  
  const resetHeights = () => {
    // Reset the height of the textarea and container to their initial values
    if (textareaRef.current && containerRef.current) {
      textareaRef.current.style.height = `${LINE_HEIGHT}px`;
      containerRef.current.style.height = `${INITIAL_CONTAINER_HEIGHT}px`;
      setRows(1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="my-4 mx-4 bg-container-tertiary rounded-3xl p-4 flex items-center z-10 transition-all"
      style={{ height: `${INITIAL_CONTAINER_HEIGHT}px` }} // Initial container height
    >
      <textarea
        ref={textareaRef}
        className="flex-grow p-2 rounded-md bg-transparent my-2 focus:outline-none resize-none overflow-y-auto text-primary"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={rows}
        style={{
          lineHeight: `${LINE_HEIGHT}px`,
          maxHeight: `${MAX_ROWS * LINE_HEIGHT}px`,
        }}
      />
      <button
        className="ml-2 px-4 py-2 rounded-md self-center"
        onClick={handleSend}
      >
        <IoIosSend size={30} />
      </button>
      <div className="absolute z-20">
        <h1>{response}</h1>
    </div>
    </div>
  );
};

export default ChatInputBox;
