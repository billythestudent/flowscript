import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const RandomNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[200px] border border-rose-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(244, 63, 94, 0.5), 0 0 20px rgba(244, 63, 94, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="text-rose-400 font-semibold text-sm uppercase tracking-wider">Rastgele</span>
        </div>
        <HelpTooltip
          color="rose"
          title="Rastgele Bloğu"
          description="Rastgele değer üretir. Sayı, UUID veya boolean seçebilirsiniz. Min-Max ile aralık belirleyin."
          example='Min: 1, Max: 100 → Rastgele → 42'
        />
      </div>
      
      <select
        value={data.randomType || 'number'}
        onChange={(e) => data.onRandomTypeChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="number">Rastgele Sayı</option>
        <option value="uuid">UUID</option>
        <option value="boolean">Rastgele Boolean</option>
        <option value="pick">Listeden Seç</option>
      </select>
      
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={data.min || ''}
          onChange={(e) => data.onMinChange?.(e.target.value)}
          className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
        />
        <input
          type="number"
          placeholder="Max"
          value={data.max || ''}
          onChange={(e) => data.onMaxChange?.(e.target.value)}
          className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
        />
      </div>
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-rose-300">{data.output !== undefined ? String(data.output) : '—'}</span>
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-rose-500 !border-2 !border-rose-300"
      />
    </div>
  );
});

RandomNode.displayName = 'RandomNode';
export default RandomNode;
