
import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ContactWindow from './windows/ContactWindow';
import TerminalWindow from './windows/TerminalWindow';
import InternetExplorerWindow from './windows/InternetExplorerWindow';
import PaintWindow from './windows/PaintWindow';
import SolitaireWindow from './windows/SolitaireWindow';

const Windows95Desktop = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const desktopIcons = [
    { id: 'about', name: 'About Me', icon: '👤', x: 50, y: 50 },
    { id: 'projects', name: 'Projects', icon: '📁', x: 50, y: 130 },
    { id: 'contact', name: 'Contact', icon: '📧', x: 50, y: 210 },
    { id: 'terminal', name: 'Terminal', icon: '📟', x: 150, y: 50 },
    { id: 'internet-explorer', name: 'Internet Explorer', icon: '🌐', x: 150, y: 130 },
    { id: 'paint', name: 'Paint', icon: '🎨', x: 150, y: 210 },
    { id: 'solitaire', name: 'Solitaire', icon: '🃏', x: 250, y: 50 },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', x: 250, y: 130 },
    { id: 'github', name: 'GitHub', icon: '🐙', x: 250, y: 210 },
    { id: 'resume', name: 'Resume', icon: '📄', x: 350, y: 50 },
    { id: 'music', name: 'Music', icon: '🎵', x: 350, y: 130 },
    { id: 'recycle', name: 'Recycle Bin', icon: '🗑️', x: 350, y: 210 },
  ];

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleIconDoubleClick = (iconId: string) => {
    if (!openWindows.includes(iconId)) {
      setOpenWindows([...openWindows, iconId]);
    }
  };

  const handleIconClick = (iconId: string) => {
    setSelectedIcon(iconId);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  const renderWindow = (windowId: string) => {
    switch (windowId) {
      case 'about':
        return (
          <Window
            key={windowId}
            title="About Me - Personal Information"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 200, y: 100 }}
          >
            <AboutWindow />
          </Window>
        );
      case 'projects':
        return (
          <Window
            key={windowId}
            title="Projects - File Explorer"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 250, y: 150 }}
          >
            <ProjectsWindow />
          </Window>
        );
      case 'contact':
        return (
          <Window
            key={windowId}
            title="Contact Information"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 300, y: 200 }}
          >
            <ContactWindow />
          </Window>
        );
      case 'terminal':
        return (
          <Window
            key={windowId}
            title="Terminal - Command Prompt"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 150, y: 50 }}
            initialSize={{ width: 600, height: 400 }}
          >
            <TerminalWindow />
          </Window>
        );
      case 'internet-explorer':
        return (
          <Window
            key={windowId}
            title="Internet Explorer - Vivekanand's Portfolio"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 100, y: 50 }}
            initialSize={{ width: 800, height: 600 }}
          >
            <InternetExplorerWindow />
          </Window>
        );
      case 'paint':
        return (
          <Window
            key={windowId}
            title="Paint - Untitled"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 200, y: 100 }}
            initialSize={{ width: 700, height: 500 }}
          >
            <PaintWindow />
          </Window>
        );
      case 'solitaire':
        return (
          <Window
            key={windowId}
            title="Solitaire"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 150, y: 50 }}
            initialSize={{ width: 600, height: 500 }}
          >
            <SolitaireWindow />
          </Window>
        );
      default:
        return (
          <Window
            key={windowId}
            title={`${windowId.charAt(0).toUpperCase() + windowId.slice(1)} - Coming Soon`}
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 300, y: 200 }}
          >
            <div className="p-4">
              <p>This feature is coming soon! 🚧</p>
              <p className="mt-2 text-sm text-gray-600">
                Stay tuned for more awesome Windows 95 nostalgia.
              </p>
            </div>
          </Window>
        );
    }
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="win95-desktop crt-effect" onClick={() => setSelectedIcon(null)}>
      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          name={icon.name}
          icon={icon.icon}
          x={icon.x}
          y={icon.y}
          selected={selectedIcon === icon.id}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(icon.id);
          }}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
        />
      ))}

      {/* Open Windows */}
      {openWindows.map(renderWindow)}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows} />
    </div>
  );
};

export default Windows95Desktop;
