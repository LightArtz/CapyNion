import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsCloudRain, BsTree, BsVolumeMute } from 'react-icons/bs';

type TimerProps = {
  duration: number; // Duration in seconds
};

const Timer: React.FC<TimerProps> = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sound, setSound] = useState<string>('none');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Play/Pause Timer Logic
  useEffect(() => {
    let timer: number | NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Handle Sound Effect Change
  useEffect(() => {
    if (audio) audio.pause(); // Pause existing sound
    if (sound !== 'none') {
      const newAudio = new Audio(
        sound === 'rain'
          ? '/sounds/rain.mp3'
          : sound === 'forest'
          ? '/sounds/forest.mp3'
          : '',
      );
      newAudio.loop = true;
      newAudio.play();
      setAudio(newAudio);
    }
  }, [sound]);

  // Format Time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <div className="p-5 text-center">
      <h2 className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</h2>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="p-3 bg-blue-500 text-white rounded-lg"
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setSound('none')}
          className="p-3 bg-gray-300 rounded-lg"
        >
          <BsVolumeMute />
        </button>
        <button
          onClick={() => setSound('rain')}
          className="p-3 bg-gray-300 rounded-lg"
        >
          <BsCloudRain />
        </button>
        <button
          onClick={() => setSound('forest')}
          className="p-3 bg-gray-300 rounded-lg"
        >
          <BsTree />
        </button>
      </div>
    </div>
  );
};

export default Timer;
