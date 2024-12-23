import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, isPaused, setIsPaused, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [breathState, setBreathState] = useState<string>('Inhale');
  const [isBreathing, setIsBreathing] = useState<boolean>(true);
  const audio = new Audio('../assets/focus/alarm.mp3');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime: number) => {
          if (prevTime <= 1) {
            clearInterval(interval!);
            audio.play();
            setIsBreathing(false);
            setTimeout(onComplete, 2000);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, timeLeft, onComplete]);

  useEffect(() => {
    let breathInterval: NodeJS.Timeout | null = null;
  
    if (!isPaused && isBreathing) {
      breathInterval = setInterval(() => {
        setBreathState((prevState: string) => {
          const newState = prevState === 'Inhale' ? 'Exhale' : 'Inhale';
          console.log(newState);
          return newState;
        });
      }, 5000);
    }
  
    return () => {
      if (breathInterval) clearInterval(breathInterval);
    };
  }, [isPaused, isBreathing]);  

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative flex flex-col items-center justify-center mt-[65px]">
      <img 
        src="../assets/breathe/circle.svg" 
        alt="Circle Background" 
        className="absolute justify-center items-center -z-10 scale-[1.1] mt-[65px]"
      />
      
      <div className="relative text-2xl font-bold text-white z-10 mt-[65px]">
        {breathState}
      </div>

      <div className="relative text-lg text-white z-10">
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;