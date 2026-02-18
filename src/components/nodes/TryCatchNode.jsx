import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const TryCatchNode = memo(({ data, isConnectable }) => {
  const [tryCode, setTryCode] = useState(data.tryCode || '// Denenecek kod');
  const [catchCode, setCatchCode] = useState(data.catchCode || '// Hata yakalandığında');
  const [finallyCode, setFinallyCode] = useState(data.finallyCode || '');
  const [errorVar, setErrorVar] = useState(data.errorVar || 'error');
  const [useFinally, setUseFinally] = useState(data.useFinally || false);

  const handleChange = (field, value) => {
    const setters = { tryCode: setTryCode, catchCode: setCatchCode, finallyCode: setFinallyCode, errorVar: setErrorVar, useFinally: setUseFinally };
    setters[field]?.(value);
    if (data.onChange) {
      data.onChange({ ...data, tryCode, catchCode, finallyCode, errorVar, useFinally, [field]: value });
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-900/90 to-orange-900/90 rounded-xl border-2 border-red-500/50 min-w-[280px] shadow-lg shadow-red-500/20">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-red-400 border-2 border-red-600"
      />
      
      <div className="px-4 py-2 border-b border-red-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡️</span>
          <span className="font-semibold text-white text-sm">Try-Catch</span>
        </div>
        <HelpTooltip content="Hata yakalama bloğu. try içindeki kod hata verirse catch bloğu çalışır." />
      </div>

      <div className="p-3 space-y-3">
        {/* Error Variable */}
        <div>
          <label className="text-xs text-red-300 mb-1 block">Hata Değişkeni</label>
          <input
            type="text"
            value={errorVar}
            onChange={(e) => handleChange('errorVar', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-red-500/30 rounded text-white text-sm focus:outline-none focus:border-red-400"
            placeholder="error"
          />
        </div>

        {/* Try Block */}
        <div>
          <label className="text-xs text-green-300 mb-1 block flex items-center gap-1">
            <span className="text-green-400">✓</span> Try (Dene)
          </label>
          <textarea
            value={tryCode}
            onChange={(e) => handleChange('tryCode', e.target.value)}
            className="w-full px-2 py-1.5 bg-slate-800/50 border border-green-500/30 rounded text-white text-xs font-mono resize-none focus:outline-none focus:border-green-400"
            rows={3}
            placeholder="// Denenecek kod"
          />
        </div>

        {/* Catch Block */}
        <div>
          <label className="text-xs text-red-300 mb-1 block flex items-center gap-1">
            <span className="text-red-400">✗</span> Catch (Yakala)
          </label>
          <textarea
            value={catchCode}
            onChange={(e) => handleChange('catchCode', e.target.value)}
            className="w-full px-2 py-1.5 bg-slate-800/50 border border-red-500/30 rounded text-white text-xs font-mono resize-none focus:outline-none focus:border-red-400"
            rows={2}
            placeholder="// Hata yakalandığında"
          />
        </div>

        {/* Finally Toggle & Block */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useFinally}
              onChange={(e) => handleChange('useFinally', e.target.checked)}
              className="rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
            />
            <span className="text-xs text-orange-300">Finally bloğu ekle</span>
          </label>
          
          {useFinally && (
            <textarea
              value={finallyCode}
              onChange={(e) => handleChange('finallyCode', e.target.value)}
              className="w-full mt-2 px-2 py-1.5 bg-slate-800/50 border border-orange-500/30 rounded text-white text-xs font-mono resize-none focus:outline-none focus:border-orange-400"
              rows={2}
              placeholder="// Her durumda çalışır"
            />
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-red-400 border-2 border-red-600"
      />
    </div>
  );
});

TryCatchNode.displayName = 'TryCatchNode';

export default TryCatchNode;
