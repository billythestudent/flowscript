import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const JSONNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] border border-teal-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(20, 184, 166, 0.5), 0 0 20px rgba(20, 184, 166, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
          <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">JSON</span>
        </div>
        <HelpTooltip
          color="teal"
          title="JSON Bloğu"
          description="JSON verisini parse eder, stringify yapar veya belirli bir değeri alır. Anahtar yolu nokta ile ayrılır."
          example='{"ad":"Ali"} → Değer Al("ad") → "Ali"'
        />
      </div>
      
      <select
        value={data.operation || 'parse'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="parse">Parse (Metinden Objeye)</option>
        <option value="stringify">Stringify (Objeden Metine)</option>
        <option value="get">Değer Al (Key)</option>
        <option value="set">Değer Ata</option>
        <option value="keys">Anahtarları Al</option>
        <option value="values">Değerleri Al</option>
        <option value="has">Anahtar Var mı?</option>
        <option value="prettify">Güzel Yazdır</option>
      </select>
      
      <input
        type="text"
        placeholder="Anahtar yolu (örn: user.name)..."
        value={data.textParam || ''}
        onChange={(e) => data.onTextParamChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200 mb-2"
      />
      
      <input
        type="text"
        placeholder="Değer (set için)..."
        value={data.textParam2 || ''}
        onChange={(e) => data.onTextParam2Change?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-teal-300 break-all">{data.output !== undefined ? String(data.output).substring(0, 30) : '—'}{data.output && String(data.output).length > 30 ? '...' : ''}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-teal-500 !border-2 !border-teal-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-teal-500 !border-2 !border-teal-300"
      />
    </div>
  );
});

JSONNode.displayName = 'JSONNode';
export default JSONNode;
