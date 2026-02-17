import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const DateNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] border border-amber-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(245, 158, 11, 0.5), 0 0 20px rgba(245, 158, 11, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Tarih</span>
        </div>
        <HelpTooltip
          color="amber"
          title="Tarih Bloğu"
          description="Tarih ve saat işlemleri yapar. Şu anki tarihi alır, format değiştirir veya tarih farkı hesaplar."
          example='Şu An → "17.02.2026 14:30"'
        />
      </div>
      
      <select
        value={data.operation || 'now'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="now">Şu An</option>
        <option value="date">Sadece Tarih</option>
        <option value="time">Sadece Saat</option>
        <option value="timestamp">Timestamp</option>
        <option value="dayOfWeek">Haftanın Günü</option>
        <option value="format">Formatla</option>
        <option value="addDays">Gün Ekle</option>
        <option value="diff">Fark (Gün)</option>
      </select>
      
      <input
        type="text"
        placeholder="Parametre (opsiyonel)..."
        value={data.textParam || ''}
        onChange={(e) => data.onTextParamChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-amber-300">{data.output !== undefined ? String(data.output).substring(0, 25) : '—'}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-amber-500 !border-2 !border-amber-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-amber-500 !border-2 !border-amber-300"
      />
    </div>
  );
});

DateNode.displayName = 'DateNode';
export default DateNode;
