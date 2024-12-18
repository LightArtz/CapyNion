import ChatInputBox from '../components/ChatInputBox';
import ChatScrollbar from '../components/ChatScrollbar';
import Sidebar from '../components/Sidebar';
import Grass from '../assets/bg-grass.svg';
import Hill1 from '../assets/hill-1.svg';
import Hill2 from '../assets/hill-2.svg';
import Cloud1 from '../assets/cloud 1.svg';
import Cloud2 from '../assets/cloud-2.svg';

function Home() {
  return (
    <div className="flex w-screen h-screen relative bg-background font-hanken-grotesk">
      <Sidebar />
      {/* Scrollbar */}
      <div className="flex flex-col overflow-y-auto w-full align-center overflow-x-hidden max-w-3xl   mx-auto ">
        <ChatScrollbar />
        <ChatInputBox
          onSendMessage={(message) => {
            console.log(message); // Send message logic
          }}
        />
      </div>

      {/* Background */}
      <img className="absolute top-10 left-0 -z-0" src={Cloud1} alt="Cloud1" />
      <img className="absolute top-36 right-0 " src={Cloud2} alt="Cloud2" />
      <img
        className="absolute bottom-0 right-0 w-full"
        src={Hill2}
        alt="hill2"
      />
      <img
        className="absolute bottom-0 right-0 w-full"
        src={Hill1}
        alt="hill1"
      />
      <img
        className="absolute bottom-0 right-0 w-full"
        src={Grass}
        alt="grass"
      />
    </div>
  );
}

export default Home;
