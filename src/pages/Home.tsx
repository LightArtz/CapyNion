import ChatInputBox from '../components/ChatInputBox';
import ChatScrollbar from '../components/ChatScrollbar';
import Sidebar from '../components/Sidebar';
import Grass from '../assets/default/bg-grass.svg';
import Hill1 from '../assets/default/hill-1.svg';
import Hill2 from '../assets/default/hill-2.svg';
import Cloud1 from '../assets/default/cloud 1.svg';
import Cloud2 from '../assets/default/cloud-2.svg';
import {
  getOpenAIResponse,
  getSessionID,
  getAllData,
  getMessagesForSession,
} from '../components/OpenAIService';
import { useEffect, useState } from 'react';

function Home() {
  const [response, setResponse] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [sessionKeys, setSessionKeys] = useState<string[]>([]);
  const [conversation, setConversation] = useState<
    { role: string; content: string }[]
  >([]);

  const logAllDataKeys = async () => {
    const allData: string[] = await getAllData(); // await the async function to get the resolved value
    setSessionKeys(allData); // Set session keys to state
    for (let i = 0; i < allData.length; i++) {
      console.log('i = ' + i + ' -> ' + allData[i]); // log each key
    }
  };

  useEffect(() => {
    logAllDataKeys(); // Call this when component mounts
  }, []);

  const handleMessage = async (message: string) => {
    await logAllDataKeys();
    // setSessionID(await getSessionID());
    // panggil function dari Sidebar.tsx
    // Create a ref to store Sidebar's reference
    let currentSessionID = sessionID;

    if (sessionID === '') {
      console.log('no session is clicked. SessionID is empty.');
      currentSessionID = await handleNewSession(); // Get the updated session ID
      console.log('session id after await: ', currentSessionID);
    }

    setUserMessage(message);
    const aiResponse = await getOpenAIResponse(message, currentSessionID);
    console.log('AI Response:', aiResponse);
    console.log(currentSessionID);

    // Extract the generated_text from the response
    if (aiResponse && aiResponse.length > 0) {
      setResponse(aiResponse);
    } else {
      setResponse('Sorry, I could not understand your input.');
    }
  };

  const handleNewSession = async (): Promise<string> => {
    const newSessionID = await getSessionID();
    console.log('new sessionid: ', newSessionID);

    // Set the session ID and ensure the state update is scheduled
    setSessionID(newSessionID);

    await logAllDataKeys(); // Call this when component mounts

    return newSessionID; // Return the new session ID
  };

  // changeSessionID (original)
  // const changeSessionID = async (id: string) => {
  //   if (id !== null) {
  //     setSessionID(id);
  //   }
  // };
  const changeSessionID = async (id: string) => {
    if (id) {
      setSessionID(id); // Update session ID state
      const sessionMessages = await getSessionMessages(id); // Fetch session messages
      setConversation(sessionMessages); // Update ChatScrollbar's conversation
    }
  };

  // Add this new function to fetch messages for a session
  const getSessionMessages = async (
    sessionID: string,
  ): Promise<{ role: string; content: string }[]> => {
    const sessionData = await getMessagesForSession(sessionID); // Backend API to fetch messages
    return sessionData || []; // Default to an empty array if no messages
  };
  // tes session
  // const handleToSession = async () => {
  //   setSessionID('key0');
  // };

  return (
    <div className="flex w-screen h-screen relative font-hanken-grotesk overflow-y-hidden ">
      <div className="absolute top-0 right-0  w-full h-full bg-background -z-20" />
      <Sidebar
        onNewChat={handleNewSession}
        changeSessionID={changeSessionID}
        sessionKeys={sessionKeys}
      />
      {/* Scrollbar */}
      <div className="flex flex-col  w-full align-center overflow-x-hidden mx-auto  overflow-y-scroll  ">
        <ChatScrollbar conversation={conversation} />
        <ChatInputBox onSendMessage={handleMessage} />
        {/* <button onClick={handleToSession}>back to initial session </button> */}
      </div>

      {/* Background */}
      <img className="absolute top-10 left-0 -z-10" src={Cloud1} alt="Cloud1" />
      <img
        className="absolute top-36 right-0 -z-10"
        src={Cloud2}
        alt="Cloud2"
      />
      <img
        className="absolute bottom-0 right-0 w-full -z-10"
        src={Hill2}
        alt="hill2"
      />
      <img
        className="absolute bottom-0 right-0 w-full -z-10"
        src={Hill1}
        alt="hill1"
      />
      <img
        className="absolute bottom-0 right-0 w-full -z-10"
        src={Grass}
        alt="grass"
      />
    </div>
  );
}

export default Home;
