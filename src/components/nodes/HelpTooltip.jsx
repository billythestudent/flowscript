import { useState } from 'react';

const HelpTooltip = ({ title, description, example, color = 'blue' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    blue: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
    purple: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
    green: 'bg-green-500/20 border-green-500/50 text-green-300',
    orange: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
    cyan: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
    pink: 'bg-pink-500/20 border-pink-500/50 text-pink-300',
    yellow: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    rose: 'bg-rose-500/20 border-rose-500/50 text-rose-300',
    indigo: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300',
  };

  const buttonColors = {
    blue: 'text-blue-400 hover:bg-blue-500/20',
    purple: 'text-purple-400 hover:bg-purple-500/20',
    green: 'text-green-400 hover:bg-green-500/20',
    orange: 'text-orange-400 hover:bg-orange-500/20',
    cyan: 'text-cyan-400 hover:bg-cyan-500/20',
    pink: 'text-pink-400 hover:bg-pink-500/20',
    yellow: 'text-yellow-400 hover:bg-yellow-500/20',
    rose: 'text-rose-400 hover:bg-rose-500/20',
    indigo: 'text-indigo-400 hover:bg-indigo-500/20',
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${buttonColors[color]}`}
      >
        ?
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 top-7 z-50 w-64 rounded-lg border p-3 shadow-xl backdrop-blur-md ${colorClasses[color]}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm text-white">{title}</h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-3">{description}</p>
            {example && (
              <div className="bg-slate-900/50 rounded-md p-2">
                <div className="text-xs text-slate-400 mb-1">Örnek:</div>
                <code className="text-xs text-white font-mono">{example}</code>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HelpTooltip;
