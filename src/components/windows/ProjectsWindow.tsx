
import React, { useState } from 'react';

const ProjectsWindow = () => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const projects = [
    {
      id: 'ecommerce',
      name: 'E-Commerce Platform',
      icon: '🛒',
      description: 'Full-stack online shopping platform with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Completed'
    },
    {
      id: 'portfolio',
      name: 'Windows 95 Portfolio',
      icon: '💻',
      description: 'Retro-style portfolio website (this one!)',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      status: 'In Progress'
    },
    {
      id: 'chatapp',
      name: 'Real-time Chat App',
      icon: '💬',
      description: 'Live messaging application with WebSocket support',
      tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
      status: 'Completed'
    },
    {
      id: 'gamedev',
      name: 'Browser Game',
      icon: '🎮',
      description: 'HTML5 Canvas-based puzzle game',
      tech: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
      status: 'Completed'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-400 bg-gray-100">
        <button className="win95-button px-2 py-1 text-xs">📁 File</button>
        <button className="win95-button px-2 py-1 text-xs">✏️ Edit</button>
        <button className="win95-button px-2 py-1 text-xs">👁️ View</button>
        <button className="win95-button px-2 py-1 text-xs">❓ Help</button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-2 border-b border-gray-400 bg-white">
        <span className="text-xs">Address:</span>
        <div className="flex-1 border border-gray-400 px-2 py-1 text-xs bg-white">
          C:\Portfolio\Projects\
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 p-2 bg-white overflow-auto">
        <div className="grid grid-cols-1 gap-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center gap-3 p-2 border border-gray-300 cursor-pointer hover:bg-blue-100 ${
                selectedFolder === project.id ? 'bg-blue-200' : 'bg-white'
              }`}
              onClick={() => setSelectedFolder(project.id)}
              onDoubleClick={() => {
                // Open project details
                console.log(`Opening ${project.name}`);
              }}
            >
              <div className="text-2xl">{project.icon}</div>
              <div className="flex-1">
                <div className="font-bold text-sm">{project.name}</div>
                <div className="text-xs text-gray-600 mb-1">{project.description}</div>
                <div className="flex flex-wrap gap-1 mb-1">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-200 px-1 py-0.5 border border-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs">
                  Status: <span className="font-bold text-green-600">{project.status}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                📁 Folder
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t border-gray-400 bg-gray-100 text-xs">
        <span>{projects.length} object(s)</span>
        <span>Ready</span>
      </div>
    </div>
  );
};

export default ProjectsWindow;
