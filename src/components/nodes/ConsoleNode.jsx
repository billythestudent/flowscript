import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const ConsoleNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] neon-gray border border-gray-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
          <span className="text-gray-300 font-semibold text-sm uppercase tracking-wider">Console</span>
        </div>
        <HelpTooltip
          color="gray"
          title="Console Bloğu"
          description="Tarayıcı konsoluna log, warn, error mesajları yazar. Debug için kullanışlı."
          example='console.log("Merhaba Dünya")'
        />
      </div>
      
      <select
        value={data.logType || 'log'}
        onChange={(e) => data.onLogTypeChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="log">📋 console.log</option>
        <option value="info">ℹ️ console.info</option>
        <option value="warn">⚠️ console.warn</option>
        <option value="error">❌ console.error</option>
        <option value="table">📊 console.table</option>
        <option value="group">📁 console.group</option>
        <option value="time">⏱️ console.time</option>
        <option value="clear">🧹 console.clear</option>
      </select>

      {data.logType !== 'clear' && (
        <input
          type="text"
          value={data.label || ''}
          onChange={(e) => data.onLabelChange?.(e.target.value)}
          placeholder={data.logType === 'time' ? 'Timer label' : data.logType === 'group' ? 'Group label' : 'Mesaj etiketi (opsiyonel)'}
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}

      <div className={`mt-2 p-2 rounded-lg text-xs font-mono ${
        data.logType === 'error' ? 'bg-red-900/30 text-red-300' :
        data.logType === 'warn' ? 'bg-yellow-900/30 text-yellow-300' :
        data.logType === 'info' ? 'bg-blue-900/30 text-blue-300' :
        'bg-slate-800/50 text-slate-300'
      }`}>
        <span className="text-slate-500">&gt; </span>
        {data.logType === 'clear' ? '[Console Cleared]' : String(data.output ?? 'undefined')}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-gray-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-gray-500 !border-2 !border-gray-300"
      />
    </div>
  );
});

ConsoleNode.displayName = 'ConsoleNode';
export default ConsoleNode;
