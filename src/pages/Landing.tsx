import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex w-screen h-screen relative font-hanken-grotesk">
      {/* Background */}
      <div className='flex w-screen h-screen absolute bg-[#B4E2F3] -z-10'></div>
      <img className="absolute w-[40%] top-[5%] left-0 -z-9"
        src='../assets/landing/cloud-1.svg'
        alt='cloud1'></img>
      <img className="absolute w-[35%] h-auto top-[10%] right-0 -z-8"
        src='../assets/landing/cloud-2.svg'
        alt='cloud2'></img>
      <img className="absolute w-[80%] h-auto left-0 bottom-[60px] -z-8 object-cover"
        src='../assets/landing/hill-1.svg'
        alt='hill1'></img>
      <img className="absolute w-[70%] h-auto right-0 bottom-[100px] -z-8"
        src='../assets/landing/hill-2.svg'
        alt='hill2'></img>
      <img className="absolute w-screen left-0 right-0 -bottom-0 -z-8 object-cover"
        src='../assets/landing/bg-grass.svg'
        alt='bg-grass'></img>
      <img className="absolute left-[70%] bottom-[12%] -z-8 object-cover"
        src='../assets/landing/flower.svg'
        alt='flower'></img>
      <img className="absolute left-[40%] bottom-[10%] -z-8 object-cover"
        src='../assets/landing/flower-2.svg'
        alt='flower-2'></img>
      <img className="absolute left-[55%] bottom-[7%] -z-8 object-cover"
        src='../assets/landing/flower-3.svg'
        alt='flower-3'></img>
      <img className="absolute w-[17%] left-[17%] bottom-[15%] -z-8 object-cover"
        src='../assets/landing/capybara.svg'
        alt='capybara'></img>
      <img className="absolute w-[10%] left-[3%] bottom-[30%] -z-8 object-cover"
        src='../assets/landing/tree.svg'
        alt='tree'></img>
      <img className="absolute w-[17%] right-[3%] bottom-[20%] -z-8 object-cover"
        src='../assets/landing/tree.svg'
        alt='tree'></img>
      
      {/* Logo */}
      <div className="absolute top-6 left-8 flex items-center z-20">
        <img
          src="../assets/landing/logo.svg"
          alt="CapyNion Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="italic text-xl font-bold tracking-wider" style={{ color: "#936C2C" }}>CapyNion</h1>
      </div>

      {/* Login Button */}
      <button className="absolute top-6 right-6 bg-[#D5C4A1] font-bold px-7 py-1.5 rounded-lg shadow-md hover:bg-[#e6d3ae] z-30" style={{ color: "#795915" }}>
        Login
      </button>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 overflow-hidden">
        <div className="px-4 text-center">
        <h2
          className="text-[40px] font-bold mb-4"
          style={{
            color: '#936C2C',
          }}
        >
          Meet Your New Self Care Best Friend
        </h2>
          <p
            className="text-md md:text-lg font-bold text-brown-600 max-w-[35%] mx-auto mb-8"
            style={{ color: '#936C2C' }}
          >
            CapyNion combines mental wellness with the power of Web3. Your data is safe
            and secure, empowering you to explore features like daily mood check-ins,
            guided meditations, and stress-coping techniques without worry. With
            CapyNion, your self-care journey is as private as it is personal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
