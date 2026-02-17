import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const InputNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[200px] neon-blue border border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Giriş</span>
        </div>
        <HelpTooltip
          color="blue"
          title="Giriş Bloğu"
          description="Akışın başlangıç noktasıdır. Buraya girdiğiniz değer diğer bloklara aktarılır. Metin veya sayı girebilirsiniz."
          example='"Merhaba Dünya" veya 42'
        />
      </div>
      
      <input
        type="text"
        placeholder="Değer girin..."
        value={data.value || ''}
        onChange={(e) => data.onChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-blue-300"
      />
    </div>
  );
});

InputNode.displayName = 'InputNode';
export default InputNode;
