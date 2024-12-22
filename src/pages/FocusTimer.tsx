import { useState, useEffect, useRef } from 'react';
import Timer from '../components/Timer';
import Sidebar from '../components/Sidebar';

import Grass from '../assets/default/bg-grass.svg';
import Hill1 from '../assets/default/hill-1.svg';
import Hill2 from '../assets/default/hill-2.svg';
import Cloud1 from '../assets/default/cloud 1.svg';
import Cloud2 from '../assets/default/cloud-2.svg';
import capybaraDefault from '../assets/focus/capybara2.svg';
import capybaraTimerSet from '../assets/focus/capybara.svg';

function FocusTimer() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sound, setSound] = useState<'forest' | 'rain' | 'muted'>('muted');
  const [volume, setVolume] = useState(0.5);
  const [activeButton, setActiveButton] = useState<'mute' | 'forest' | 'rain'>('mute');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimerComplete = () => {
    setSelectedDuration(null);
    setIsPaused(false);
  };

  const durations = [
    { label: '3 min', value: 180 },
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '20 min', value: 1200 },
    { label: '30 min', value: 1800 },
    { label: '45 min', value: 2700 },
    { label: '1 hr', value: 3600 },
  ];

  useEffect(() => {
    if (audioRef.current) {
      switch (sound) {
        case 'forest':
          audioRef.current.src = '../assets/focus/forest.mp3';
          audioRef.current.volume = volume;
          break;
        case 'rain':
          audioRef.current.src = '../assets/focus/rain.mp3';
          audioRef.current.volume = volume * 0.6;
          break;
        case 'muted':
          audioRef.current.pause();
          return;
      }
      audioRef.current.loop = true;
      audioRef.current.play();
    }
  }, [sound, volume]);

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsPaused(false);
    setSelectedDuration(null);
  };

  const handleMute = () => {
    setSound('muted');
    setActiveButton('mute');
  };

  const handleNatureSound = () => {
    setSound('forest');
    setActiveButton('forest');
  };

  const handleRainSound = () => {
    setSound('rain');
    setActiveButton('rain');
  };

  return (
    <div className="flex min-h-screen font-hanken-grotesk" style={{ background: 'linear-gradient(to bottom, #073343, #1281A9)' }}>
      <Sidebar />
      <div className="flex flex-col max-w-3xl mx-auto z-10 relative h-screen">
        <h1 className="mt-[45px] text-4xl font-bold mb-6" style={{ color: '#76B4CB' }}>Focus Timer</h1>
        {selectedDuration === null ? (
          <div className="grid grid-cols-4 gap-10">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className="pl-7 pr-7 pt-2 pb-2 bg-[#76B4CB] hover:bg-[#92cbe0] text-white rounded-lg text-xl"
              >
                <span className="block text-3xl font-bold">{d.label.split(" ")[0]}</span>
                <span className="block text-sm mt-[-3px]">{d.label.split(" ")[1]}</span>
              </button>
            ))}
          </div>
        ) : (
          <Timer 
            duration={selectedDuration} 
            isPaused={isPaused} 
            setIsPaused={setIsPaused} 
            onComplete={handleTimerComplete}
          />
        )}
        {selectedDuration !== null && (
          <div className="absolute inset-x-0 bottom-[5%] flex justify-center mt-6 space-x-4">
            <button
              onClick={handleReset}
              className="w-[30%] p-2 text-white rounded-lg"
            >
              <img 
                src='../assets/breathe/close.svg' 
                alt='close'
                className="w-full h-auto hover:[filter:brightness(0.8)]"
                style={{ transform: 'scale(0.85)', transformOrigin: 'center' }} 
              />
            </button>
            <button
              onClick={handlePause}
              className="w-[30%] p-2 bg-transparent text-white rounded-lg flex justify-center items-center"
            >
              <img 
                src={isPaused ? '../assets/breathe/resume.svg' : '../assets/breathe/pause.svg'} 
                alt={isPaused ? 'Resume' : 'Pause'}
                className="w-full h-auto hover:[filter:brightness(0.8)]"
              />
            </button>
          </div>
        )}
        {selectedDuration === null && (
          <div className="flex flex-col items-center mt-6 z-[10]">
            <p className="text-xl font-semibold text-[#76B4CB] mb-4">Background Sound</p>
            <div className="flex justify-center items-center space-x-5">
              <button
                onClick={handleMute}
                className={`px-3 p-2 rounded-xl ${sound === 'muted' ? 'bg-[#92cbe0]' : 'bg-[#76B4CB]'} hover:bg-[#92cbe0]`}
              >
                <img src="../assets/breathe/mute.svg" alt="Mute" width="20" height="20" />
              </button>
              <button
                onClick={handleNatureSound}
                className={`px-3 p-2 rounded-xl ${sound === 'forest' ? 'bg-[#92cbe0]' : 'bg-[#76B4CB]'} hover:bg-[#92cbe0]`}
              >
                <img src="../assets/breathe/tree.svg" alt="Nature Sounds" width="20" height="20" />
              </button>
              <button
                onClick={handleRainSound}
                className={`px-3 p-2 rounded-xl ${sound === 'rain' ? 'bg-[#92cbe0]' : 'bg-[#76B4CB]'} hover:bg-[#92cbe0]`}
              >
                <img src="../assets/breathe/rain.svg" alt="Rain Sounds" width="20" height="20" />
              </button>
            </div>
          </div>
        )}
        <img
          className="absolute h-[25%] justify-center bottom-[15%] left-1/2 transform -translate-x-1/2 z-[5]"
          src={selectedDuration === null ? capybaraDefault : capybaraTimerSet}
          alt="capybara"
        />
        <img
          className="absolute justify-center bottom-[10%] left-1/2 transform -translate-x-1/2 z-[0]"
          src='../assets/focus/fireflies.svg'
          alt="fireflies"
          style={{
            width: selectedDuration === null ? '80%' : '191%',
            maxWidth: '500px',
          }}
        />
      </div>
      <img className="absolute top-10 left-0 -z-0" src={Cloud1} alt="Cloud1" />
      <img className="absolute top-36 right-0 " src={Cloud2} alt="Cloud2" />
      <img
        className="absolute bottom-0 right-0 w-full z-[3]"
        src={Hill2}
        alt="hill2"
      />
      <img
        className="absolute bottom-0 right-0 w-full z-[2]"
        src={Hill1}
        alt="hill1"
      />
      <img
        className="absolute bottom-0 right-0 w-full z-[5]"
        src={Grass}
        alt="grass"
      />
      <img
        className="absolute bottom-[32%] left-[10%] w-[25%] z-[4]"
        src='../assets/focus/pine-trees.svg'
        alt="pine-trees"
      />
      <img
        className="absolute bottom-[40%] right-0 w-[4%] z-[4]"
        src='../assets/focus/pine-tree.svg'
        alt="pine-tree"
      />
      <img
        className="absolute bottom-[37%] right-[3%] w-[5%] z-[4]"
        src='../assets/focus/pine-tree.svg'
        alt="pine-tree"
      />
      <img
        className="absolute scale-[1.1] z-[1] top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src='../assets/focus/stars.svg'
        alt="stars"
      />
      <div className="absolute top-6 right-8 flex items-center z-20">
        <img
          src="../assets/landing/logo.svg"
          alt="CapyNion Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="italic text-xl font-bold tracking-wider" style={{ color: "#936C2C" }}>CapyNion</h1>
      </div>
      <audio ref={audioRef} />
    </div>
  );
}

export default FocusTimer;
