
import React, { useState } from 'react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileItem[];
}

const VSCodeWindow = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');

  const projectFiles: FileItem[] = [
    {
      name: 'portfolio-windows95',
      type: 'folder',
      children: [
        {
          name: 'src',
          type: 'folder',
          children: [
            {
              name: 'components',
              type: 'folder',
              children: [
                {
                  name: 'Windows95Desktop.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';

const Windows95Desktop = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  
  // Windows 95 desktop implementation
  // with authentic retro styling and functionality
  
  return (
    <div className="win95-desktop crt-effect">
      {/* Desktop with classic Windows 95 UI */}
    </div>
  );
};

export default Windows95Desktop;`
                },
                {
                  name: 'Window.tsx',
                  type: 'file',
                  language: 'typescript',
                  content: `import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

const Window: React.FC<WindowProps> = ({
  title,
  children,
  onClose,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 500, height: 400 },
}) => {
  // Draggable window implementation
  // with authentic Windows 95 styling
  
  return (
    <div className="win95-window absolute">
      {/* Window with title bar and content */}
    </div>
  );
};

export default Window;`
                }
              ]
            },
            {
              name: 'App.tsx',
              type: 'file',
              language: 'typescript',
              content: `import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;`
            }
          ]
        },
        {
          name: 'package.json',
          type: 'file',
          language: 'json',
          content: `{
  "name": "portfolio-windows95",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@tanstack/react-query": "^5.56.2",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}`
        },
        {
          name: 'README.md',
          type: 'file',
          language: 'markdown',
          content: `# Windows 95 Portfolio

A nostalgic portfolio website built with React and TypeScript, featuring:

## Features
- Authentic Windows 95 UI/UX
- Draggable and resizable windows
- Classic taskbar with Start menu
- Retro desktop icons
- CRT monitor effects
- Sound effects and animations

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Query

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

Experience the nostalgia of the 90s with modern web technologies!`
        }
      ]
    }
  ];

  const openFile = (file: FileItem) => {
    if (file.type === 'file' && file.content) {
      setSelectedFile(file);
      if (!openTabs.find(tab => tab.name === file.name)) {
        setOpenTabs([...openTabs, file]);
      }
      setActiveTab(file.name);
    }
  };

  const closeTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs(openTabs.filter(tab => tab.name !== fileName));
    if (activeTab === fileName) {
      const remainingTabs = openTabs.filter(tab => tab.name !== fileName);
      if (remainingTabs.length > 0) {
        setActiveTab(remainingTabs[remainingTabs.length - 1].name);
        setSelectedFile(remainingTabs[remainingTabs.length - 1]);
      } else {
        setActiveTab('');
        setSelectedFile(null);
      }
    }
  };

  const renderFileTree = (files: FileItem[], depth = 0) => {
    return files.map((file, index) => (
      <div key={index} style={{ marginLeft: `${depth * 12}px` }}>
        <div
          className={`flex items-center gap-1 px-1 py-0.5 cursor-pointer hover:bg-blue-100 text-xs ${
            selectedFile?.name === file.name ? 'bg-blue-200' : ''
          }`}
          onClick={() => openFile(file)}
        >
          <span className="text-xs">
            {file.type === 'folder' ? '📁' : getFileIcon(file.name)}
          </span>
          <span>{file.name}</span>
        </div>
        {file.children && renderFileTree(file.children, depth + 1)}
      </div>
    ));
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'ts': return '📄';
      case 'json': return '⚙️';
      case 'md': return '📝';
      case 'css': return '🎨';
      default: return '📄';
    }
  };

  const getLanguageIcon = (language?: string) => {
    switch (language) {
      case 'typescript': return '🔷';
      case 'json': return '📦';
      case 'markdown': return '📝';
      default: return '📄';
    }
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col" style={{ fontFamily: 'Consolas, monospace', fontSize: '12px' }}>
      {/* Menu Bar */}
      <div className="bg-gray-700 border-b border-gray-600 px-2 py-1">
        <div className="flex gap-4 text-xs">
          <span className="hover:bg-gray-600 px-2 py-1 cursor-pointer">File</span>
          <span className="hover:bg-gray-600 px-2 py-1 cursor-pointer">Edit</span>
          <span className="hover:bg-gray-600 px-2 py-1 cursor-pointer">View</span>
          <span className="hover:bg-gray-600 px-2 py-1 cursor-pointer">Terminal</span>
          <span className="hover:bg-gray-600 px-2 py-1 cursor-pointer">Help</span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* File Explorer */}
        <div className="w-64 bg-gray-750 border-r border-gray-600 overflow-y-auto">
          <div className="p-2 border-b border-gray-600 text-xs font-bold">EXPLORER</div>
          <div className="p-1">
            {renderFileTree(projectFiles)}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          {openTabs.length > 0 && (
            <div className="flex bg-gray-700 border-b border-gray-600">
              {openTabs.map((tab) => (
                <div
                  key={tab.name}
                  className={`flex items-center gap-2 px-3 py-2 border-r border-gray-600 cursor-pointer text-xs ${
                    activeTab === tab.name ? 'bg-gray-800' : 'bg-gray-700 hover:bg-gray-650'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.name);
                    setSelectedFile(tab);
                  }}
                >
                  <span>{getLanguageIcon(tab.language)}</span>
                  <span>{tab.name}</span>
                  <span
                    className="hover:bg-gray-500 rounded px-1"
                    onClick={(e) => closeTab(tab.name, e)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Code Editor */}
          <div className="flex-1 p-4 overflow-auto bg-gray-800">
            {selectedFile ? (
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-600">
                  <span className="text-lg">{getLanguageIcon(selectedFile.language)}</span>
                  <span className="text-sm text-gray-300">{selectedFile.name}</span>
                  <span className="text-xs text-gray-500">• {selectedFile.language}</span>
                </div>
                <pre className="text-sm text-green-400 leading-relaxed whitespace-pre-wrap">
                  {selectedFile.content}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <div className="text-4xl mb-4">💻</div>
                  <div className="text-lg mb-2">Visual Studio Code</div>
                  <div className="text-sm">Select a file from the explorer to view its contents</div>
                  <div className="text-xs mt-4 text-gray-600">
                    Portfolio Edition - Windows 95 Theme
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terminal Panel */}
          <div className="h-32 bg-black border-t border-gray-600 p-2">
            <div className="text-green-400 text-xs font-mono">
              <div className="mb-1">Microsoft Windows [Version 95.0.4.1212]</div>
              <div className="mb-1">(c) Copyright Microsoft Corp 1981-1996.</div>
              <div className="mb-2">C:\Portfolio&gt; npm run dev</div>
              <div className="text-cyan-400">🚀 Development server running at http://localhost:5173</div>
              <div className="flex items-center">
                <span className="text-green-400">C:\Portfolio&gt;</span>
                <span className="animate-pulse ml-1">█</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-blue-600 text-white px-2 py-1 text-xs flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span>🔥 Ln 1, Col 1</span>
          <span>UTF-8</span>
          <span>TypeScript React</span>
        </div>
        <div className="flex items-center gap-2">
          <span>✓ Ready</span>
          <span>🔌 Live Server</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodeWindow;
