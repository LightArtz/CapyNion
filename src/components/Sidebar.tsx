// Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { FiTool } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleNavigateToBreathe = () => {
    navigate('/breathe');
  };
  const handleNavigateToHome = () => {
    navigate('/');
  };
  return (
    <div
      className={`flex h-screen ${
        isCollapsed ? 'w-10' : 'w-64 rounded-r-2xl'
      } bg-container-primary text-text-light transition-width duration-300 z-10`}
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
            <button className="p-2 rounded-md hover:bg-primary-hover mr-2">
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
            className="flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus w-full"
          >
            {isCollapsed ? <span>🧘🏻</span> : <span>🧘🏻Breathe</span>}
          </button>
          <button className="flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus w-full">
            {isCollapsed ? <span>⌛</span> : <span>⌛Focus Timer</span>}
          </button>
          <button className="flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus w-full">
            {isCollapsed ? <span>✅</span> : <span>✅To Do List</span>}
          </button>
        </div>
        <div className="flex flex-col items-start mt-8 space-y-2">
          {isCollapsed ? (
            <FiTool size={20} className="ml-2" />
          ) : (
            <h1 className="p-2 font-bold">Chat History</h1>
          )}
          <button
            onClick={handleNavigateToHome}
            className="flex items-center p-2 hover:bg-primary-hover focus:bg-primary-focus w-full"
          >
            {isCollapsed ? <span>🧘🏻</span> : <span>Hello world! </span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;