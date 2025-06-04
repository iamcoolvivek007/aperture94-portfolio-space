
import React, { useState, useRef } from 'react';

const InternetExplorerWindow = () => {
  const [currentUrl, setCurrentUrl] = useState('portfoliovivekanand.netlify.app');
  const [isLoading, setIsLoading] = useState(false);
  const [inputUrl, setInputUrl] = useState('portfoliovivekanand.netlify.app');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = () => {
    setIsLoading(true);
    let url = inputUrl;
    
    // Add https:// if no protocol specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    setCurrentUrl(inputUrl);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const handleBack = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const handleForward = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleHome = () => {
    setInputUrl('portfoliovivekanand.netlify.app');
    setCurrentUrl('portfoliovivekanand.netlify.app');
  };

  return (
    <div className="h-full flex flex-col bg-gray-200">
      {/* IE Toolbar */}
      <div className="bg-gray-200 border-b border-gray-400 p-1">
        <div className="flex items-center gap-1 mb-2">
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={handleBack}
          >
            ← Back
          </button>
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={handleForward}
          >
            Forward →
          </button>
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={handleRefresh}
          >
            🔄 Refresh
          </button>
          <button 
            className="win95-button px-2 py-1 text-xs"
            onClick={handleHome}
          >
            🏠 Home
          </button>
          <div className="flex-1"></div>
          <span className="text-xs">Internet Explorer</span>
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs">Address:</span>
          <div className="flex-1 flex">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-2 py-1 text-xs border border-gray-400"
              placeholder="Enter URL..."
            />
            <button 
              className="win95-button px-3 py-1 text-xs"
              onClick={handleNavigate}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-b border-gray-400 px-2 py-1">
        <div className="flex items-center justify-between text-xs">
          <span>{isLoading ? 'Loading...' : 'Done'}</span>
          <span>Internet zone</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
            <div className="text-center">
              <div className="text-lg mb-2">🌐</div>
              <div className="text-sm">Loading {currentUrl}...</div>
              <div className="mt-2">
                <div className="inline-block w-32 h-2 bg-gray-300 border border-gray-400">
                  <div className="h-full bg-blue-500 animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src={`https://${currentUrl}`}
          className="w-full h-full border-none"
          title="Internet Explorer Content"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex items-center justify-between">
        <span>{isLoading ? `Connecting to ${currentUrl}...` : `${currentUrl} - Done`}</span>
        <div className="flex items-center gap-2">
          <span>🔒 Secure</span>
          <span>📶 Connected</span>
        </div>
      </div>
    </div>
  );
};

export default InternetExplorerWindow;
