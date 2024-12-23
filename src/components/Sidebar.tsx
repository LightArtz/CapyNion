import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { FiTool } from 'react-icons/fi';

interface SidebarProps {
  onNewChat: () => void;
  changeSessionID: (id: string) => void;
  sessionKeys: string[];
  activeSession: string | null; // Add active session prop
  setActiveSession: (id: string) => void; // Function to set active session
}

export const Sidebar: React.FC<SidebarProps> = ({
  onNewChat,
  changeSessionID,
  sessionKeys,
  activeSession,
  setActiveSession,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to access current route

  const handleSessionChange = (id: string) => {
    console.log('Session ID is changed to ' + id);
    changeSessionID(id); // Trigger the callback from parent to update session ID
    setActiveSession(id); // Set the clicked session as the active session
  };

  const handleNavigateToFocus = () => {
    navigate('/focustimer');
  };
  const handleNavigateToCoping = () => {
    navigate('/stresscoping');
  };
  const handleNavigateToBreathe = () => {
    navigate('/breathe');
  };
  const handleNavigateToHome = () => {
    navigate('/home');
  };

  const isHomeRoute = location.pathname === '/home';

  return (
    <div
      className={`flex h-screen ${
        isCollapsed ? 'w-10' : 'w-64 rounded-r-2xl'
      } bg-container-primary text-text-light transition-width duration-300 z-50`}
    >
      <div className="flex flex-col w-full">
        {/* Toggle Button */}
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-md hover:bg-primary-hover"
          >
            <GoSidebarCollapse size={20} />
          </button>
        ) : (
          <div className="flex justify-between">
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-2 rounded-md hover:bg-primary-hover"
            >
              <GoSidebarExpand size={20} />
            </button>
            {/* New chat */}
            <button
              onClick={onNewChat}
              className="p-2 rounded-md hover:bg-primary-hover mr-2"
            >
              <BiMessageSquareEdit size={20} />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-col items-start mt-4 space-y-2">
          {isCollapsed ? (
            <FiTool size={20} className="ml-2" />
          ) : (
            <h1 className="p-2 font-bold">Tools</h1>
          )}
          <button
            onClick={handleNavigateToBreathe}
            className={`flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus ${
              isCollapsed ? 'w-10 justify-center' : 'w-64'
            }`}
          >
            {isCollapsed ? <span>🧘🏻</span> : <span>🧘🏻Breathe</span>}
          </button>
          <button
            onClick={handleNavigateToFocus}
            className={`flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus ${
              isCollapsed ? 'w-10 justify-center' : 'w-64'
            }`}
          >
            {isCollapsed ? <span>⌛</span> : <span>⌛Focus Timer</span>}
          </button>
          <button
            onClick={handleNavigateToCoping}
            className={`flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus ${
              isCollapsed ? 'w-10 justify-center' : 'w-64'
            }`}
          >
            {isCollapsed ? <span>❤️‍🩹</span> : <span>❤️‍🩹Coping Strategies</span>}
          </button>
        </div>

        {/* Chat History or Navigate to Home */}
        <div className="flex flex-col items-start mt-8 space-y-2">
          {isCollapsed ? (
            <FiTool size={20} className="ml-2" />
          ) : (
            <h1 className="p-2 font-bold">Chat History</h1>
          )}
          {isHomeRoute ? (
            sessionKeys.map((key, index) => (
              <button
                key={key} // Unique key for each button
                onClick={() => handleSessionChange(key)}
                className={`flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus w-full ${
                  activeSession === key ? 'bg-primary-focus' : ''
                }`}
              >
                {isCollapsed ? (
                  <span>💬</span>
                ) : (
                  <span>{`Chat ${index + 1}`}</span>
                )}
              </button>
            ))
          ) : (
            <button
              onClick={handleNavigateToHome}
              className="flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus w-full"
            >
              {isCollapsed ? <span>🏠</span> : <span>Go to Home</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
