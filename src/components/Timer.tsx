import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, isPaused, setIsPaused, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const audio = new Audio('../assets/focus/alarm.mp3');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isPaused) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval!);
            audio.play();
            onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative flex flex-col items-center justify-center mt-[75px]">
      <img 
        src="../assets/breathe/circle.svg" 
        alt="Circle Background" 
        className="absolute justify-center items-center -z-10 scale-[1.5] mt-[75px]"
      />
      <div className="relative font-bold text-xl text-white z-10 mt-[75px]">
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;