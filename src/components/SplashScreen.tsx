
import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Starting Windows 95...');

  const loadingMessages = [
    'Starting Windows 95...',
    'Loading device drivers...',
    'Initializing system...',
    'Loading portfolio data...',
    'Almost ready...',
    'Welcome!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update message based on progress
        const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
        if (messageIndex < loadingMessages.length) {
          setCurrentMessage(loadingMessages[messageIndex]);
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="win95-splash">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-8" style={{ color: '#ffff00' }}>
          Portfolio95
        </h1>
        <div className="mb-8">
          <div className="text-2xl mb-4">Microsoft</div>
          <div className="text-lg mb-8">Windows 95</div>
        </div>
        
        <div className="mb-8">
          <p className="text-base mb-4">{currentMessage}</p>
          <div className="loading-bar mx-auto">
            <div 
              className="loading-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>Click anywhere to continue once loaded</p>
          <p className="mt-2">© 2024 Alicja's Portfolio. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
