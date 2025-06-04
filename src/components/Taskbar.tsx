
import React, { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: string[];
}

const Taskbar: React.FC<TaskbarProps> = ({ openWindows }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="win95-taskbar">
      {/* Start Button */}
      <button 
        className="win95-start-button"
        onClick={() => setShowStartMenu(!showStartMenu)}
      >
        <span className="font-bold">Start</span>
      </button>

      {/* Task Buttons */}
      <div className="flex-1 flex items-center gap-1 ml-2">
        {openWindows.map((windowId) => (
          <button
            key={windowId}
            className="win95-button px-3 py-1 text-xs max-w-32 truncate"
          >
            {windowId.charAt(0).toUpperCase() + windowId.slice(1)}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 mr-2">
        <div className="flex items-center gap-1">
          <span className="text-xs">🔊</span>
          <span className="text-xs">📶</span>
        </div>
        <div 
          className="text-xs px-2 py-1 border border-gray-400"
          style={{ 
            background: 'var(--win95-silver)',
            border: '1px inset var(--win95-silver)'
          }}
        >
          {formatTime(currentTime)}
        </div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div 
          className="absolute bottom-8 left-0 bg-gray-200 border-2 border-gray-400 shadow-lg"
          style={{ 
            background: 'var(--win95-silver)',
            border: '2px outset var(--win95-silver)',
            width: '200px'
          }}
        >
          <div className="p-2">
            <div className="text-xs font-bold mb-2 pb-1 border-b border-gray-400">
              Alicja's Portfolio
            </div>
            <div className="space-y-1">
              <div className="text-xs p-1 hover:bg-blue-600 hover:text-white cursor-pointer">
                📁 Programs
              </div>
              <div className="text-xs p-1 hover:bg-blue-600 hover:text-white cursor-pointer">
                📄 Documents
              </div>
              <div className="text-xs p-1 hover:bg-blue-600 hover:text-white cursor-pointer">
                ⚙️ Settings
              </div>
              <div className="text-xs p-1 hover:bg-blue-600 hover:text-white cursor-pointer">
                🔍 Find
              </div>
              <div className="text-xs p-1 hover:bg-blue-600 hover:text-white cursor-pointer">
                ❓ Help
              </div>
              <hr className="border-gray-400" />
              <div className="text-xs p-1 hover:bg-blue-600 hover:text-white cursor-pointer">
                🔌 Shut Down...
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
