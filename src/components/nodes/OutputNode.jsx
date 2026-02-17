import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const OutputNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[200px] neon-orange border border-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Çıkış</span>
        </div>
        <HelpTooltip
          color="orange"
          title="Çıkış Bloğu"
          description="Akışın son noktasıdır. Kendisine bağlanan bloğun sonucunu gösterir. Birden fazla çıkış bloğu kullanabilirsiniz."
          example='Giriş: 12 → Matematik (+4) → Çıkış: 16'
        />
      </div>
      
      <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-3 min-h-[40px]">
        <span className="text-white text-sm font-mono">
          {data.value !== undefined && data.value !== '' ? String(data.value) : <span className="text-slate-500 italic">Sonuç bekleniyor...</span>}
        </span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-orange-300"
      />
    </div>
  );
});

OutputNode.displayName = 'OutputNode';
export default OutputNode;
