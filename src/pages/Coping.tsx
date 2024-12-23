import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Coping() {
  const [strategy, setStrategy] = useState('');
  return (
    <div className="w-screen h-screen flex">
      <Sidebar onNewChat={() => {}} />
      {strategy === '' && (
        <div className="w-full flex flex-col">
          <h1>Stress-coping Strategies</h1>
          <div>
            <button
              onClick={() => {
                setStrategy('3-3-3');
              }}
            >
              ️‍❤️‍🩹 3-3-3 Rule
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setStrategy('rainbow');
              }}
            >
              🌈 Rainbow Grounding
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setStrategy('5-4-3-2-1');
              }}
            >
              🦄 5-4-3-2-1 Technique
            </button>
          </div>
        </div>
      )}
      {/* 3-3-3 Technique */}
      {strategy === '3-3-3' && (
        <div className=" flex items-center justify-center">
          <div className="">
            <h1 className="text-lg font-bold text-center mb-4">3-3-3 Rule</h1>
            <ul className="space-y-3">
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">👀</span>
                <span>Name 3 things you see</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">👂</span>
                <span>Identify 3 sounds you hear</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">✋</span>
                <span>Move 3 parts of your body</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {strategy === 'rainbow' && (
        <div className=" flex items-center justify-center">
          <div className="">
            <h1 className="text-lg font-bold text-center mb-4">
              Rainbow Grounding
            </h1>
            <ul className="space-y-3">
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">🍎</span>
                <span>1 red object</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">🍊</span>
                <span>1 orange object</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">🍌</span>
                <span>1 yellow object</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">🥑</span>
                <span>1 green object</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">🫐</span>
                <span>1 blue object</span>
              </li>
              <li className="bg-blue-100 p-4 rounded-lg flex items-center">
                <span className="mr-2">🍇</span>
                <span>1 purple object</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {strategy === '5-4-3-2-1' && (
        <div className=" flex items-center justify-center">
          <div className="">5-4-3-2-1</div>
        </div>
      )}
      <button>Start</button>
    </div>
  );
}

export default Coping;
