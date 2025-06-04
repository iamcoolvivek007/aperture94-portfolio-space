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
import WinampWindow from './windows/WinampWindow';

const Windows95Desktop = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const desktopIcons = [
    { id: 'about', name: 'About Vivekanand', icon: '👨‍💻', x: 50, y: 50 },
    { id: 'projects', name: 'My Projects', icon: '📁', x: 50, y: 130 },
    { id: 'contact', name: 'Contact Me', icon: '📧', x: 50, y: 210 },
    { id: 'terminal', name: 'MS-DOS Prompt', icon: '💻', x: 150, y: 50 },
    { id: 'internet-explorer', name: 'Internet Explorer', icon: '🌐', x: 150, y: 130 },
    { id: 'paint', name: 'Paint', icon: '🎨', x: 150, y: 210 },
    { id: 'winamp', name: 'Winamp', icon: '🎵', x: 250, y: 50 },
    { id: 'solitaire', name: 'Solitaire', icon: '🃏', x: 250, y: 130 },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', x: 250, y: 210 },
    { id: 'github', name: 'GitHub', icon: '🐙', x: 350, y: 50 },
    { id: 'resume', name: 'Resume', icon: '📄', x: 350, y: 130 },
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
            title="About Vivekanand - Personal Information"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 200, y: 100 }}
            initialSize={{ width: 600, height: 500 }}
          >
            <AboutWindow />
          </Window>
        );
      case 'projects':
        return (
          <Window
            key={windowId}
            title="My Projects - File Explorer"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 250, y: 150 }}
            initialSize={{ width: 700, height: 500 }}
          >
            <ProjectsWindow />
          </Window>
        );
      case 'contact':
        return (
          <Window
            key={windowId}
            title="Contact Vivekanand"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 300, y: 200 }}
            initialSize={{ width: 500, height: 400 }}
          >
            <ContactWindow />
          </Window>
        );
      case 'terminal':
        return (
          <Window
            key={windowId}
            title="MS-DOS Prompt"
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
            title="Paint"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 200, y: 100 }}
            initialSize={{ width: 700, height: 500 }}
          >
            <PaintWindow />
          </Window>
        );
      case 'winamp':
        return (
          <Window
            key={windowId}
            title="Winamp - Portfolio Player"
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 300, y: 150 }}
            initialSize={{ width: 400, height: 350 }}
          >
            <WinampWindow />
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
      case 'linkedin':
        window.open('https://linkedin.com/in/vivekanand-panigrahy', '_blank');
        return null;
      case 'github':
        window.open('https://github.com/vivekanandpv', '_blank');
        return null;
      case 'resume':
        window.open('https://portfoliovivekanand.netlify.app', '_blank');
        return null;
      default:
        return (
          <Window
            key={windowId}
            title={`${windowId.charAt(0).toUpperCase() + windowId.slice(1)} - Coming Soon`}
            onClose={() => closeWindow(windowId)}
            initialPosition={{ x: 300, y: 200 }}
          >
            <div className="p-4 bg-gray-200" style={{ fontFamily: 'MS Sans Serif' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">🚧</div>
                <div>
                  <h3 className="font-bold text-sm">Feature Under Development</h3>
                  <p className="text-xs">This application is coming soon!</p>
                </div>
              </div>
              <div className="bg-yellow-100 border border-yellow-400 p-2 text-xs">
                <p>💡 In the meantime, check out my other applications or visit my portfolio website!</p>
              </div>
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
