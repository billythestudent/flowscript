import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const MathNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] border border-cyan-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
          <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Matematik</span>
        </div>
        <HelpTooltip
          color="cyan"
          title="Matematik Bloğu"
          description="Gelen sayı üzerinde matematiksel işlem yapar. Toplama, çıkarma, çarpma, bölme, üs alma, karekök gibi işlemler."
          example='Giriş: 10 → Toplama (+5) → Çıkış: 15'
        />
      </div>
      
      <select
        value={data.operation || 'add'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="add">Toplama (+)</option>
        <option value="subtract">Çıkarma (-)</option>
        <option value="multiply">Çarpma (×)</option>
        <option value="divide">Bölme (÷)</option>
        <option value="power">Üs (^)</option>
        <option value="sqrt">Karekök (√)</option>
        <option value="abs">Mutlak Değer</option>
        <option value="round">Yuvarla</option>
      </select>
      
      <input
        type="number"
        placeholder="Sayı değeri..."
        value={data.mathValue || ''}
        onChange={(e) => data.onMathValueChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-cyan-300">{data.output !== undefined ? data.output : '—'}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-cyan-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-cyan-300"
      />
    </div>
  );
});

MathNode.displayName = 'MathNode';
export default MathNode;
