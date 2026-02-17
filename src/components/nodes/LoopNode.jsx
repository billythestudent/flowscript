import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const LoopNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] neon-sky border border-sky-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-500 animate-pulse"></div>
          <span className="text-sky-400 font-semibold text-sm uppercase tracking-wider">Döngü</span>
        </div>
        <HelpTooltip
          color="sky"
          title="Döngü Bloğu"
          description="Dizi veya sayı üzerinde döngü işlemleri yapar. Map, filter, forEach, for gibi."
          example='[1,2,3].map(x => x*2) → [2,4,6]'
        />
      </div>
      
      <select
        value={data.loopType || 'forEach'}
        onChange={(e) => data.onLoopTypeChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="forEach">forEach (Her eleman için)</option>
        <option value="map">map (Dönüştür)</option>
        <option value="filter">filter (Filtrele)</option>
        <option value="reduce">reduce (İndirge)</option>
        <option value="for">for (Sayısal döngü)</option>
        <option value="times">times (N kez tekrar)</option>
      </select>

      {data.loopType === 'for' || data.loopType === 'times' ? (
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={data.start || 0}
            onChange={(e) => data.onStartChange?.(Number(e.target.value))}
            placeholder="Başlangıç"
            className="w-1/2 bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm input-neon transition-all duration-200"
          />
          <input
            type="number"
            value={data.end || 10}
            onChange={(e) => data.onEndChange?.(Number(e.target.value))}
            placeholder="Bitiş"
            className="w-1/2 bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm input-neon transition-all duration-200"
          />
        </div>
      ) : (
        <input
          type="text"
          value={data.expression || ''}
          onChange={(e) => data.onExpressionChange?.(e.target.value)}
          placeholder={data.loopType === 'filter' ? 'Koşul: x > 5' : data.loopType === 'map' ? 'x * 2' : data.loopType === 'reduce' ? 'acc + x' : 'İfade'}
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}

      {data.loopType === 'reduce' && (
        <input
          type="text"
          value={data.initialValue || '0'}
          onChange={(e) => data.onInitialValueChange?.(e.target.value)}
          placeholder="Başlangıç değeri"
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}
      
      <div className="text-xs text-slate-400 mt-2">
        Çıktı: <span className="text-sky-300">{JSON.stringify(data.output ?? '—').substring(0, 30)}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-sky-500 !border-2 !border-sky-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-sky-500 !border-2 !border-sky-300"
      />
    </div>
  );
});

LoopNode.displayName = 'LoopNode';
export default LoopNode;
