
import React from 'react';

const AboutWindow = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start gap-4">
        <div className="text-6xl">👋</div>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">Hello, I'm Vivekanand!</h2>
          <p className="text-sm leading-relaxed mb-3">
            Welcome to my retro portfolio! I'm a passionate Full Stack Developer who loves creating 
            innovative web applications and exploring cutting-edge technologies. This Windows 95-style 
            interface is a fun throwback to the golden age of computing while showcasing modern development skills.
          </p>
          <div className="bg-white border border-gray-400 p-3 text-xs">
            <h3 className="font-bold mb-2">System Information:</h3>
            <div className="space-y-1">
              <div>🖥️ Operating System: Portfolio95 v2.0</div>
              <div>⚡ Processor: Creative Mind Pro</div>
              <div>💾 Memory: Unlimited Innovation</div>
              <div>🎨 Graphics: Imagination Engine 3000</div>
              <div>🌐 Network: Global Connection Active</div>
              <div>📊 Experience: Full Stack Development</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-400 pt-4">
        <h3 className="font-bold mb-2 text-sm">Skills & Technologies:</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Frontend</div>
            <div>React, JavaScript, TypeScript</div>
            <div>HTML5, CSS3, Tailwind CSS</div>
          </div>
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Backend</div>
            <div>Node.js, Express.js</div>
            <div>Python, REST APIs</div>
          </div>
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Database</div>
            <div>MongoDB, MySQL</div>
            <div>PostgreSQL, Firebase</div>
          </div>
          <div className="bg-white border border-gray-400 p-2">
            <div className="font-bold">Tools & Cloud</div>
            <div>Git, Docker, AWS</div>
            <div>Netlify, Vercel, VS Code</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 pt-4">
        <h3 className="font-bold mb-2 text-sm">Quick Access:</h3>
        <div className="flex gap-2 text-xs">
          <button className="win95-button px-2 py-1">
            🌐 Visit Portfolio
          </button>
          <button className="win95-button px-2 py-1">
            📄 Download Resume
          </button>
          <button className="win95-button px-2 py-1">
            📧 Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
