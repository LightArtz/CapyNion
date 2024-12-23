import ChatInputBox from '../components/ChatInputBox';
import ChatScrollbar from '../components/ChatScrollbar';
import Sidebar from '../components/Sidebar';
import Grass from '../assets/bg-grass.svg';
import Hill1 from '../assets/hill-1.svg';
import Hill2 from '../assets/hill-2.svg';
import Cloud1 from '../assets/cloud 1.svg';
import Cloud2 from '../assets/cloud-2.svg';
import { getOpenAIResponse, getSessionID } from '../components/OpenAIService';
import { useState } from 'react';

function Home() {
  const [response, setResponse] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [sessionID, setSessionID] = useState('');

  const handleMessage = async (message: string) => {
    // setSessionID(await getSessionID());
    // panggil function dari Sidebar.tsx  
    // Create a ref to store Sidebar's reference
    let currentSessionID = sessionID;

    if (sessionID === '') {
      console.log("no session is clicked. SessionID is empty.");
      currentSessionID = await handleNewSession(); // Get the updated session ID
      console.log("session id after await: ", currentSessionID);
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
    console.log("new sessionid: ", newSessionID);
    
    // Set the session ID and ensure the state update is scheduled
    setSessionID(newSessionID);
  
    return newSessionID; // Return the new session ID
  };

  const changeSessionID = async (id: string) => {
    if (id !== null){
      setSessionID(id);
    }
  }

  // tes session
  // const handleToSession = async () => {
  //   setSessionID('key0');
  // };

  return (
    <div className="flex w-screen h-screen relative font-hanken-grotesk  ">
      <div className="absolute top-0 right-0  w-full h-full bg-background -z-20" />
      <Sidebar onNewChat={handleNewSession} changeSessionID={changeSessionID}/>
      {/* Scrollbar */}
      <div className="flex flex-col  w-full align-center overflow-x-hidden mx-auto  overflow-y-scroll  ">
        <ChatScrollbar response={response} userMessage={userMessage} />
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
