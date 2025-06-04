
import React, { useState, useRef, useEffect } from 'react';

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
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMaximized]);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 30 });
    } else {
      setPosition(initialPosition);
      setSize(initialSize);
    }
  };

  return (
    <div
      ref={windowRef}
      className="win95-window absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 100,
      }}
    >
      {/* Title Bar */}
      <div
        className="win95-titlebar cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs">📁</span>
          <span className="text-xs">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="win95-button px-2 py-0 text-xs"
            onClick={() => {}} // Minimize functionality
          >
            _
          </button>
          <button
            className="win95-button px-2 py-0 text-xs"
            onClick={handleMaximize}
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            className="win95-button px-2 py-0 text-xs"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        className="p-2 bg-white overflow-auto"
        style={{ 
          height: 'calc(100% - 22px)',
          background: 'var(--win95-silver)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
