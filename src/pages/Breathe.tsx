import { useState } from 'react';
import Timer from '../components/Timer';
import Sidebar from '../components/Sidebar';

import Grass from '../assets/bg-grass.svg';
import Hill1 from '../assets/hill-1.svg';
import Hill2 from '../assets/hill-2.svg';
import Cloud1 from '../assets/cloud 1.svg';
import Cloud2 from '../assets/cloud-2.svg';

function Breathe() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

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
  return (
    <div className="flex min-h-screen bg-background ">
      <Sidebar onNewChat={() => {}} />
      <div className="flex flex-col max-w-3xl mx-auto z-10 ">
        <h1 className="text-3xl font-bold mb-6">Meditation Timer</h1>
        {selectedDuration === null ? (
          <div className="grid grid-cols-2 gap-4">
            {durations.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDuration(d.value)}
                className="p-5 bg-blue-500 text-white rounded-lg text-xl"
              >
                {d.label}
              </button>
            ))}
          </div>
        ) : (
          <Timer duration={selectedDuration} />
        )}
        <button
          onClick={() => setSelectedDuration(null)}
          className="mt-6 p-2 bg-red-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
      {/* Background */}
      <img className="absolute top-10 left-0 -z-0" src={Cloud1} alt="Cloud1" />
      <img className="absolute top-36 right-0 " src={Cloud2} alt="Cloud2" />
      <img
        className="absolute bottom-0 right-0 w-full "
        src={Hill2}
        alt="hill2"
      />
      <img
        className="absolute bottom-0 right-0 w-full "
        src={Hill1}
        alt="hill1"
      />
      <img
        className="absolute bottom-0 right-0 w-full "
        src={Grass}
        alt="grass"
      />
    </div>
  );
}
export default Breathe;
