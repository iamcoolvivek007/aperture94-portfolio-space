
import React, { useState, useEffect } from 'react';

const WinampWindow = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [currentSong, setCurrentSong] = useState('1. Vivekanand - Developer Mix');

  const playlist = [
    'Vivekanand - Developer Mix',
    'Code Symphony - JS Beats',
    'React Harmony - Frontend Flow',
    'TypeScript Groove - Backend Bass',
    'Portfolio Remix - Skills Edition'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev + 1) % 180); // 3 min loop
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-300 h-full flex flex-col" style={{ fontFamily: 'MS Sans Serif', fontSize: '8px' }}>
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-2 py-1 text-xs font-bold">
        Winamp v2.95 - Portfolio Edition
      </div>

      {/* Main Display */}
      <div className="bg-black text-green-400 p-2 border-2 border-gray-500" style={{ border: '2px inset #c0c0c0' }}>
        <div className="font-mono text-xs">
          <div className="mb-1">*** WINAMP v2.95 ***</div>
          <div className="mb-2">{currentSong}</div>
          <div className="flex justify-between">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(180 - currentTime)}</span>
          </div>
          <div className="mt-1">
            <div className="bg-green-600 h-1" style={{ width: `${(currentTime / 180) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Dancing Kid Visualization */}
      <div className="bg-black flex-1 flex items-center justify-center border-2 border-gray-500" style={{ border: '2px inset #c0c0c0' }}>
        <div className="text-center">
          <div 
            className={`text-6xl mb-2 ${isPlaying ? 'animate-bounce' : ''}`}
            style={{ 
              animation: isPlaying ? 'dance 0.5s infinite alternate' : 'none',
              filter: 'hue-rotate(180deg) saturate(2)',
            }}
          >
            🕺
          </div>
          <div className="text-green-400 text-xs font-mono">
            {isPlaying ? '>>> DANCING <<<' : '>>> PAUSED <<<'}
          </div>
          {isPlaying && (
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-green-400 w-1"
                  style={{
                    height: `${Math.random() * 20 + 10}px`,
                    animation: `bar-dance ${0.2 + Math.random() * 0.3}s infinite alternate`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-300 p-2 border-t border-gray-500">
        <div className="flex items-center gap-2 mb-2">
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={() => setCurrentTime(0)}
          >
            ⏮️
          </button>
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={() => {
              setCurrentTime(0);
              const nextIndex = (playlist.indexOf(currentSong.split('. ')[1]) + 1) % playlist.length;
              setCurrentSong(`${nextIndex + 1}. ${playlist[nextIndex]}`);
            }}
          >
            ⏭️
          </button>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs">Vol:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-xs w-6">{volume}</span>
          </div>
        </div>

        {/* Playlist */}
        <div className="bg-white border border-gray-500 h-16 overflow-y-auto text-xs">
          {playlist.map((song, index) => (
            <div
              key={song}
              className={`px-2 py-1 cursor-pointer hover:bg-blue-100 ${
                currentSong.includes(song) ? 'bg-blue-200' : ''
              }`}
              onClick={() => setCurrentSong(`${index + 1}. ${song}`)}
            >
              {index + 1}. {song}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dance {
          0% { transform: translateY(0px) rotate(-5deg); }
          100% { transform: translateY(-5px) rotate(5deg); }
        }
        @keyframes bar-dance {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0.3); }
        }
      `}</style>
    </div>
  );
};

export default WinampWindow;
