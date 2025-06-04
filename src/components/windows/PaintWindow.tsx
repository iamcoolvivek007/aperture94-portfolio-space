
import React, { useRef, useState, useEffect, useCallback } from 'react';

type Tool = 'brush' | 'pencil' | 'eraser' | 'fill' | 'text' | 'rectangle' | 'circle';

const PaintWindow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>('brush');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const colors = [
    '#000000', '#808080', '#800000', '#ff0000',
    '#008000', '#00ff00', '#808000', '#ffff00',
    '#000080', '#0000ff', '#800080', '#ff00ff',
    '#008080', '#00ffff', '#c0c0c0', '#ffffff'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const getMousePos = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);
    setLastPosition(pos);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (currentTool === 'fill') {
      ctx.fillStyle = currentColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Start drawing immediately for better responsiveness
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const pos = getMousePos(e);

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = currentColor;

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    setLastPosition(pos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col bg-gray-200" style={{ fontFamily: 'MS Sans Serif', fontSize: '11px' }}>
      {/* Menu Bar */}
      <div className="bg-gray-200 border-b border-gray-500 p-1 flex gap-1">
        <button className="win95-button px-3 py-1 text-xs">File</button>
        <button className="win95-button px-3 py-1 text-xs">Edit</button>
        <button className="win95-button px-3 py-1 text-xs">View</button>
        <button className="win95-button px-3 py-1 text-xs">Image</button>
        <button className="win95-button px-3 py-1 text-xs">Colors</button>
        <button className="win95-button px-3 py-1 text-xs">Help</button>
      </div>

      {/* Tool Palette */}
      <div className="flex">
        <div className="bg-gray-200 border-r border-gray-500 p-2 w-16">
          <div className="grid grid-cols-2 gap-1 mb-3">
            {[
              { tool: 'brush', icon: '🖌️', title: 'Brush' },
              { tool: 'pencil', icon: '✏️', title: 'Pencil' },
              { tool: 'eraser', icon: '🧹', title: 'Eraser' },
              { tool: 'fill', icon: '🪣', title: 'Fill' },
              { tool: 'rectangle', icon: '▭', title: 'Rectangle' },
              { tool: 'circle', icon: '○', title: 'Ellipse' }
            ].map(({ tool, icon, title }) => (
              <button
                key={tool}
                className={`w-6 h-6 text-xs border ${
                  currentTool === tool 
                    ? 'border-black bg-blue-200' 
                    : 'border-gray-400 bg-white hover:bg-gray-100'
                }`}
                onClick={() => setCurrentTool(tool as Tool)}
                title={title}
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Color Palette */}
          <div className="grid grid-cols-2 gap-0.5 mb-3">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-3 h-3 border ${
                  currentColor === color ? 'border-2 border-black' : 'border-gray-400'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setCurrentColor(color)}
              />
            ))}
          </div>

          {/* Brush Size */}
          <div className="text-xs mb-2">Size:</div>
          <input
            type="range"
            min="1"
            max="10"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="text-xs text-center">{brushSize}px</div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-300 p-2">
          <div className="bg-white border-2 border-gray-500" style={{ border: '2px inset #c0c0c0' }}>
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              className="block cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t border-gray-500 px-2 py-1 text-xs flex justify-between">
        <span>For Help, click Help Topics on the Help Menu.</span>
        <span>{brushSize}x{brushSize}</span>
      </div>
    </div>
  );
};

export default PaintWindow;
