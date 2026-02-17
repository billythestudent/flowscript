import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const DelayNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[200px] border border-yellow-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(234, 179, 8, 0.5), 0 0 20px rgba(234, 179, 8, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Gecikme</span>
        </div>
        <HelpTooltip
          color="yellow"
          title="Gecikme Bloğu"
          description="Veriyi belirtilen süre kadar bekletir. Milisaniye cinsinden değer girin (1000ms = 1 saniye)."
          example='Giriş: "test" → 2000ms → Çıkış: "test" (2sn sonra)'
        />
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="ms"
          value={data.delay || ''}
          onChange={(e) => data.onDelayChange?.(e.target.value)}
          className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
        />
        <span className="text-slate-400 text-sm">ms</span>
      </div>
      
      <div className="text-xs text-slate-400 mt-2">
        Veriyi {data.delay || 0}ms bekletir
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-yellow-500 !border-2 !border-yellow-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-yellow-500 !border-2 !border-yellow-300"
      />
    </div>
  );
});

DelayNode.displayName = 'DelayNode';
export default DelayNode;
