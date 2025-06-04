
import React from 'react';

const AboutWindow = () => {
  return (
    <div className="p-4 space-y-4 bg-gray-200" style={{ fontFamily: 'MS Sans Serif', fontSize: '11px' }}>
      <div className="flex items-start gap-4">
        <div className="text-6xl">👨‍💻</div>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">Hello, I'm Vivekanand Panigrahy!</h2>
          <p className="text-sm leading-relaxed mb-3">
            Welcome to my retro portfolio! I'm a passionate Full Stack Developer specializing in 
            modern web technologies. Currently pursuing B.Tech in CSE at IIIT Bhubaneswar. 
            This Windows 95-style interface showcases my love for both retro aesthetics and 
            cutting-edge development practices.
          </p>
          <div className="bg-white border-2 border-gray-500 p-3 text-xs" style={{ border: '2px inset #c0c0c0' }}>
            <h3 className="font-bold mb-2">System Information:</h3>
            <div className="space-y-1">
              <div>🖥️ Operating System: Portfolio95 v3.0</div>
              <div>⚡ Processor: Full Stack Developer Engine</div>
              <div>💾 Memory: 4+ Years of Learning</div>
              <div>🎨 Graphics: Creative Problem Solver</div>
              <div>🌐 Network: Always Connected to Innovation</div>
              <div>📊 Status: Available for Opportunities</div>
              <div>🎓 Education: IIIT Bhubaneswar (B.Tech CSE)</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t-2 border-gray-500 pt-4" style={{ borderTop: '2px inset #c0c0c0' }}>
        <h3 className="font-bold mb-2 text-sm">Technical Arsenal:</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white border-2 border-gray-500 p-2" style={{ border: '2px inset #c0c0c0' }}>
            <div className="font-bold text-blue-600">Frontend Mastery</div>
            <div>React.js, Next.js, TypeScript</div>
            <div>HTML5, CSS3, Tailwind CSS</div>
            <div>JavaScript (ES6+), jQuery</div>
          </div>
          <div className="bg-white border-2 border-gray-500 p-2" style={{ border: '2px inset #c0c0c0' }}>
            <div className="font-bold text-green-600">Backend Power</div>
            <div>Node.js, Express.js</div>
            <div>Python, Django, Flask</div>
            <div>RESTful APIs, GraphQL</div>
          </div>
          <div className="bg-white border-2 border-gray-500 p-2" style={{ border: '2px inset #c0c0c0' }}>
            <div className="font-bold text-purple-600">Database Skills</div>
            <div>MongoDB, MySQL, PostgreSQL</div>
            <div>Firebase, Supabase</div>
            <div>Redis, SQLite</div>
          </div>
          <div className="bg-white border-2 border-gray-500 p-2" style={{ border: '2px inset #c0c0c0' }}>
            <div className="font-bold text-red-600">DevOps & Tools</div>
            <div>Git, GitHub, Docker</div>
            <div>AWS, Netlify, Vercel</div>
            <div>VS Code, Linux, Figma</div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-gray-500 pt-4" style={{ borderTop: '2px inset #c0c0c0' }}>
        <h3 className="font-bold mb-2 text-sm">Quick Connect:</h3>
        <div className="flex gap-2 text-xs">
          <button 
            className="win95-button px-3 py-2"
            onClick={() => window.open('https://portfoliovivekanand.netlify.app', '_blank')}
          >
            🌐 Portfolio Site
          </button>
          <button 
            className="win95-button px-3 py-2"
            onClick={() => window.open('https://linkedin.com/in/vivekanand-panigrahy', '_blank')}
          >
            💼 LinkedIn
          </button>
          <button 
            className="win95-button px-3 py-2"
            onClick={() => window.open('https://github.com/vivekanandpv', '_blank')}
          >
            📂 GitHub
          </button>
        </div>
      </div>

      <div className="bg-yellow-100 border-2 border-yellow-400 p-2 text-xs" style={{ border: '2px inset #ffff80' }}>
        <div className="font-bold">💡 Fun Fact:</div>
        <div>This entire Windows 95 interface was built using modern React and TypeScript - proving that retro aesthetics and modern tech make a perfect combo!</div>
      </div>
    </div>
  );
};

export default AboutWindow;
