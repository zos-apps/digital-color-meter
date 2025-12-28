import React, { useState, useCallback } from 'react';

interface DigitalColorMeterProps {
  onClose: () => void;
}

type ColorFormat = 'hex' | 'rgb' | 'hsl';

const DigitalColorMeter: React.FC<DigitalColorMeterProps> = ({ onClose }) => {
  const [color, setColor] = useState({ r: 66, g: 133, b: 244 });
  const [format, setFormat] = useState<ColorFormat>('hex');
  const [copied, setCopied] = useState(false);

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const getColorString = useCallback(() => {
    const { r, g, b } = color;
    switch (format) {
      case 'hex': return rgbToHex(r, g, b);
      case 'rgb': return `rgb(${r}, ${g}, ${b})`;
      case 'hsl': return rgbToHsl(r, g, b);
    }
  }, [color, format]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getColorString());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const simulateColorPick = () => {
    setColor({
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    });
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
      <div
        className="h-20 flex items-center justify-center cursor-crosshair"
        style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
        onClick={simulateColorPick}
      >
        <span className="text-xs bg-black/50 px-2 py-1 rounded">Click to sample</span>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div className="flex gap-2">
          {(['hex', 'rgb', 'hsl'] as ColorFormat[]).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 py-1 rounded text-xs uppercase font-medium transition-colors
                ${format === f ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}
              `}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          onClick={copyToClipboard}
          className="p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="text-center font-mono text-lg">
            {getColorString()}
          </div>
          <div className="text-center text-xs text-white/50 mt-1">
            {copied ? 'Copied!' : 'Click to copy'}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-white/5 p-2 rounded">
            <div className="text-red-400 font-mono">{color.r}</div>
            <div className="text-xs text-white/50">R</div>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <div className="text-green-400 font-mono">{color.g}</div>
            <div className="text-xs text-white/50">G</div>
          </div>
          <div className="bg-white/5 p-2 rounded">
            <div className="text-blue-400 font-mono">{color.b}</div>
            <div className="text-xs text-white/50">B</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalColorMeter;
