
import React, { useRef, useState, useEffect } from 'react';

type Tool = 'brush' | 'pencil' | 'eraser' | 'fill' | 'text';

const PaintWindow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<Tool>('brush');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
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
        // Initialize white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPosition({ x, y });

    if (currentTool === 'fill') {
      floodFill(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    }

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const floodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Simple flood fill implementation (basic version)
    ctx.fillStyle = currentColor;
    ctx.fillRect(startX - 5, startY - 5, 10, 10);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col bg-gray-200">
      {/* Menu Bar */}
      <div className="bg-gray-200 border-b border-gray-400 p-1">
        <div className="flex gap-4 text-xs">
          <button className="win95-button px-2 py-1">File</button>
          <button className="win95-button px-2 py-1">Edit</button>
          <button className="win95-button px-2 py-1">View</button>
          <button className="win95-button px-2 py-1">Image</button>
          <button className="win95-button px-2 py-1">Options</button>
          <button className="win95-button px-2 py-1">Help</button>
        </div>
      </div>

      {/* Tool Bar */}
      <div className="bg-gray-200 border-b border-gray-400 p-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="grid grid-cols-2 gap-1">
            <button
              className={`w-8 h-8 border-2 text-xs ${currentTool === 'brush' ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`}
              onClick={() => setCurrentTool('brush')}
              title="Brush"
            >
              🖌️
            </button>
            <button
              className={`w-8 h-8 border-2 text-xs ${currentTool === 'pencil' ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`}
              onClick={() => setCurrentTool('pencil')}
              title="Pencil"
            >
              ✏️
            </button>
            <button
              className={`w-8 h-8 border-2 text-xs ${currentTool === 'eraser' ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`}
              onClick={() => setCurrentTool('eraser')}
              title="Eraser"
            >
              🧹
            </button>
            <button
              className={`w-8 h-8 border-2 text-xs ${currentTool === 'fill' ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}`}
              onClick={() => setCurrentTool('fill')}
              title="Fill"
            >
              🪣
            </button>
          </div>

          <div className="mx-4 border-l border-gray-400 h-8"></div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-16"
            />
            <span className="text-xs w-6">{brushSize}</span>
          </div>

          <div className="mx-4 border-l border-gray-400 h-8"></div>

          <button
            className="win95-button px-3 py-1 text-xs"
            onClick={clearCanvas}
          >
            Clear
          </button>
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-8 gap-1 w-fit">
          {colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 border-2 ${currentColor === color ? 'border-blue-500' : 'border-gray-400'}`}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
            />
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-2 bg-gray-300">
        <div className="bg-white border-2 border-gray-400 w-full h-full">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs">
        Tool: {currentTool.charAt(0).toUpperCase() + currentTool.slice(1)} | 
        Color: {currentColor} | 
        Size: {brushSize}px
      </div>
    </div>
  );
};

export default PaintWindow;
