import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const TextNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] border border-pink-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(236, 72, 153, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div>
          <span className="text-pink-400 font-semibold text-sm uppercase tracking-wider">Metin İşleme</span>
        </div>
        <HelpTooltip
          color="pink"
          title="Metin İşleme Bloğu"
          description="Metni böler, birleştirir, değiştirir veya alt metin alır. İki parametre bazı işlemler için gereklidir."
          example='"a,b,c" → Böl(",") → ["a","b","c"]'
        />
      </div>
      
      <select
        value={data.operation || 'split'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="split">Böl (Split)</option>
        <option value="join">Birleştir (Join)</option>
        <option value="replace">Değiştir (Replace)</option>
        <option value="substring">Alt Metin (Substring)</option>
        <option value="repeat">Tekrarla (Repeat)</option>
        <option value="padStart">Başa Ekle (Pad)</option>
        <option value="slice">Dilimle (Slice)</option>
        <option value="charAt">Karakter Al</option>
      </select>
      
      <input
        type="text"
        placeholder="Parametre..."
        value={data.textParam || ''}
        onChange={(e) => data.onTextParamChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200 mb-2"
      />
      
      <input
        type="text"
        placeholder="İkinci parametre (opsiyonel)..."
        value={data.textParam2 || ''}
        onChange={(e) => data.onTextParam2Change?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-pink-300 break-all">{data.output !== undefined ? String(data.output).substring(0, 30) : '—'}{data.output && String(data.output).length > 30 ? '...' : ''}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-pink-500 !border-2 !border-pink-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-pink-500 !border-2 !border-pink-300"
      />
    </div>
  );
});

TextNode.displayName = 'TextNode';
export default TextNode;
