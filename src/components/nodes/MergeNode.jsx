import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const MergeNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[200px] border border-indigo-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(99, 102, 241, 0.5), 0 0 20px rgba(99, 102, 241, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-indigo-400 font-semibold text-sm uppercase tracking-wider">Birleştir</span>
        </div>
        <HelpTooltip
          color="indigo"
          title="Birleştir Bloğu"
          description="İki farklı girişi ayraç ile birleştirir. Sol tarafta iki giriş noktası var. Ayraç boş bırakılırsa boşluk kullanılır."
          example='Giriş1: "Merhaba" + Giriş2: "Dünya" → Ayraç: " " → "Merhaba Dünya"'
        />
      </div>
      
      <input
        type="text"
        placeholder="Ayraç (ör: , veya -)"
        value={data.separator || ''}
        onChange={(e) => data.onSeparatorChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        İki girişi birleştirir
      </div>
      
      <div className="text-xs text-slate-400 mt-1">
        Sonuç: <span className="text-indigo-300">{data.output || '—'}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        id="input1"
        style={{ top: '35%' }}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-indigo-300"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input2"
        style={{ top: '65%' }}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-indigo-400 !border-2 !border-indigo-200"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-indigo-300"
      />
    </div>
  );
});

MergeNode.displayName = 'MergeNode';
export default MergeNode;
