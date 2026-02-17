import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const ArrayNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] border border-lime-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(132, 204, 22, 0.5), 0 0 20px rgba(132, 204, 22, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-500 animate-pulse"></div>
          <span className="text-lime-400 font-semibold text-sm uppercase tracking-wider">Dizi</span>
        </div>
        <HelpTooltip
          color="lime"
          title="Dizi Bloğu"
          description="Dizi işlemleri yapar. Sıralama, filtreleme, eleman ekleme/çıkarma, uzunluk alma gibi işlemler."
          example='[3,1,2] → Sırala → [1,2,3]'
        />
      </div>
      
      <select
        value={data.operation || 'length'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="length">Uzunluk</option>
        <option value="first">İlk Eleman</option>
        <option value="last">Son Eleman</option>
        <option value="get">Eleman Al (Index)</option>
        <option value="push">Eleman Ekle</option>
        <option value="pop">Son Elemanı Çıkar</option>
        <option value="shift">İlk Elemanı Çıkar</option>
        <option value="reverse">Tersine Çevir</option>
        <option value="sort">Sırala</option>
        <option value="unique">Tekrarsız Yap</option>
        <option value="sum">Topla</option>
        <option value="avg">Ortalama</option>
        <option value="min">Minimum</option>
        <option value="max">Maksimum</option>
        <option value="join">Birleştir</option>
        <option value="filter">Filtrele (Boş Olmayanlar)</option>
      </select>
      
      <input
        type="text"
        placeholder="Parametre (index/değer)..."
        value={data.textParam || ''}
        onChange={(e) => data.onTextParamChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-lime-300 break-all">{data.output !== undefined ? String(data.output).substring(0, 30) : '—'}{data.output && String(data.output).length > 30 ? '...' : ''}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-lime-500 !border-2 !border-lime-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-lime-500 !border-2 !border-lime-300"
      />
    </div>
  );
});

ArrayNode.displayName = 'ArrayNode';
export default ArrayNode;
