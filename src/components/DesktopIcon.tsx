
import React from 'react';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  selected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  name,
  icon,
  x,
  y,
  selected,
  onClick,
  onDoubleClick,
}) => {
  return (
    <div
      className={`win95-icon ${selected ? 'selected' : ''}`}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <span className="text-xs text-center leading-tight">{name}</span>
    </div>
  );
};

export default DesktopIcon;
