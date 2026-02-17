import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const FunctionNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] neon-purple border border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Fonksiyon</span>
        </div>
        <HelpTooltip
          color="purple"
          title="Fonksiyon Bloğu"
          description="Gelen metni dönüştürür. Büyük/küçük harf, ters çevirme, uzunluk hesaplama gibi işlemler yapar."
          example='"merhaba" → Büyük Harf → "MERHABA"'
        />
      </div>
      
      <select
        value={data.operation || 'uppercase'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="uppercase">Büyük Harf</option>
        <option value="lowercase">Küçük Harf</option>
        <option value="reverse">Ters Çevir</option>
        <option value="length">Uzunluk</option>
        <option value="trim">Boşlukları Sil</option>
        <option value="double">İki Katına Çıkar</option>
      </select>
      
      <div className="text-xs text-slate-400 mt-2">
        Çıktı: <span className="text-purple-300">{data.output || '—'}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300"
      />
    </div>
  );
});

FunctionNode.displayName = 'FunctionNode';
export default FunctionNode;
