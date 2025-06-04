
import React from 'react';

const AboutWindow = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start gap-4">
        <div className="text-6xl">👋</div>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">Hello, I'm Alicja!</h2>
          <p className="text-sm leading-relaxed mb-3">
            Welcome to my retro portfolio! I'm a passionate developer who loves creating 
            innovative web applications and exploring new technologies. This Windows 95-style 
            interface is a fun throwback to the golden age of computing.
          </p>
          <div className="bg-white border border-gray-400 p-3 text-xs">
            <h3 className="font-bold mb-2">System Information:</h3>
            <div className="space-y-1">
              <div>🖥️ Operating System: Portfolio95 v1.0</div>
              <div>⚡ Processor: Creative Mind 3000</div>
              <div>💾 Memory: Unlimited Ideas</div>
              <div>🎨 Graphics: Imagination Engine</div>
              <div>🌐 Network: Internet Connected</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-400 pt-4">
        <h3 className="font-bold mb-2 text-sm">Skills & Technologies:</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Frontend</div>
            <div>React, TypeScript, Tailwind</div>
          </div>
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Backend</div>
            <div>Node.js, Python, APIs</div>
          </div>
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Design</div>
            <div>UI/UX, Figma, CSS</div>
          </div>
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Tools</div>
            <div>Git, VS Code, Docker</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
