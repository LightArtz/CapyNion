import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function StressCoping() {
  type ButtonType = '3-3-3' | 'rainbow' | '5-4-3-2-1';

  const [clickedButton, setClickedButton] = useState<ButtonType | null>(null);

  const handleButtonClick = (buttonType: ButtonType) => {
    setClickedButton(buttonType);
  };

  const handleBackClick = () => {
    setClickedButton(null);
  };

  return (
    <div className="flex min-h-screen font-hanken-grotesk" style={{ background: 'linear-gradient(to bottom, #003281, #FFC24C)' }}>
      <Sidebar onNewChat={() => { } } changeSessionID={function (id: string): void {
        throw new Error('Function not implemented.');
      } } sessionKeys={[]}/>
      <div
        className="flex flex-col items-center z-10 relative w-screen h-screen"
        style={{
          transform: clickedButton ? 'translateY(-10%)' : 'translateY(0)',
        }}
      >
        <img
          className="h-[45%] absolute bottom-[13%] left-[43.5%] transform -translate-x-[28%]"
          src="../assets/stress/capybara.svg"
          alt="Capybara"
          style={{
            transform: clickedButton ? 'translateY(22.2%)' : 'translateY(0)',
          }}
        />
        {/* Back Button */}
        {clickedButton && (
          <button
            className="absolute bottom-[-40px] left-[47%] font-bold text-xl text-[#78C58D] bg-white hover:bg-[#e0e0e0] px-4 py-2 rounded-xl"
            style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'}}
            onClick={handleBackClick}
            
          >
            Finish
          </button>
        )}
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2">
          {/* Text */}
          <div className="text-white text-3xl font-bold">
            {clickedButton === null
              ? 'Stress-Coping Strategies'
              : clickedButton === '3-3-3'
              ? '3-3-3 Rule'
              : clickedButton === 'rainbow'
              ? 'Rainbow Grounding'
              : clickedButton === '5-4-3-2-1'
              ? '5-4-3-2-1 Technique'
              : ''}
          </div>

          {/* Initial Buttons */}
          {clickedButton === null && (
            <div className="mt-6 flex space-x-4 flex-wrap">
              <button
                className="pt-3 pb-3 h-auto bg-[#76B4CB] hover:bg-[#92cbe0] text-white px-4 py-2 rounded-lg w-[150px] flex flex-col items-center justify-center space-y-2"
                onClick={() => handleButtonClick('3-3-3')}
              >
                <img
                  className="w-[20%] object-contain"
                  src="../assets/stress/mending-heart.svg"
                  alt="heart"
                />
                <span>3-3-3 Rule</span>
              </button>
              <button
                className="pt-3 pb-3 h-auto bg-[#76B4CB] hover:bg-[#92cbe0] text-white px-4 py-2 rounded-lg w-[150px] flex flex-col items-center justify-center space-y-2"
                onClick={() => handleButtonClick('rainbow')}
              >
                <img
                  className="w-[20%] object-contain"
                  src="../assets/stress/rainbow.svg"
                  alt="heart"
                />
                <span>Rainbow Grounding</span>
              </button>
              <button
                className="pt-3 pb-3 h-auto bg-[#76B4CB] hover:bg-[#92cbe0] text-white px-4 py-2 rounded-lg w-[150px] flex flex-col items-center justify-center space-y-2"
                onClick={() => handleButtonClick('5-4-3-2-1')}
              >
                <img
                  className="w-[20%] object-contain"
                  src="../assets/stress/unicorn.svg"
                  alt="heart"
                />
                <span>5-4-3-2-1 Technique</span>
              </button>
            </div>
          )}

          {/* Show based on the clicked button */}
          {clickedButton === '3-3-3' && (
            <div className="mt-4 flex flex-col items-start space-y-4">
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">👀</span>
                Name 3 things you see
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">👂</span>
                Identify 3 sounds you hear
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">✋</span>
                Move 3 parts of your body
              </p>
            </div>
          )}

          {clickedButton === 'rainbow' && (
            <div className="mt-4 flex flex-col items-start space-y-4">
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🍎</span>
                identify 1 red object
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🍊</span>
                identify 1 orange object
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🍌</span>
                identify 1 yellow object
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🥑</span>
                identify 1 green object
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🧢</span>
                identify 1 blue object
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🍇</span>
                identify 1 purple object
              </p>
            </div>
          )}

          {clickedButton === '5-4-3-2-1' && (
            <div className="mt-4 flex flex-col items-start space-y-4">
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">👀</span>
                5 things you can see
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">🙌🏻</span>
                4 things you can feel
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">👂🏻</span>
                3 things you can hear
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">👃🏻</span>
                2 things you can smell
              </p>
              <p className="h-auto bg-[#76B4CB] text-white px-4 py-2 rounded-xl w-[350px] text-left">
                <span className="mr-2">👅</span>
                1 thing you can taste
              </p>
            </div>
          )}
        </div>
      </div>
      <img className="absolute w-screen bottom-[0] z-[6] object-cover" src="../assets/stress/sand.svg" alt="sand" />
      <img className="absolute w-screen bottom-[10%] z-[5] object-cover" src="../assets/stress/sea.svg" alt="sea" />
      <img className="w-[5%] absolute left-[25%] bottom-[15%] z-[7] object-cover" src="../assets/stress/crab.svg" alt="crab" />
      <img className="w-[5%] absolute right-[20%] bottom-[10%] z-[7] object-cover" src="../assets/stress/crab.svg" alt="crab" />
      <div className="w-screen absolute bottom-[20%] left-1/2 transform -translate-x-1/2 z-[2] flex justify-center">
        <img className="w-[25%]" src="../assets/stress/sun.svg" alt="sun" />
      </div>
      <div className="absolute top-6 right-8 flex items-center z-20">
        <img
          src="../assets/landing/logo.svg"
          alt="CapyNion Logo"
          className="w-10 h-10 mr-2"
        />
        <h1
          className="italic text-xl font-bold tracking-wider"
          style={{ color: '#936C2C' }}
        >
          CapyNion
        </h1>
      </div>
    </div>
  );
}

export default StressCoping;
