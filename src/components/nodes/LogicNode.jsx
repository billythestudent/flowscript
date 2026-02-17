import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const LogicNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] neon-green border border-green-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">Mantık</span>
        </div>
        <HelpTooltip
          color="green"
          title="Mantık Bloğu"
          description="Gelen değeri kontrol eder ve DOĞRU/YANLIŞ sonucu döndürür. Metin içeriyor mu, sayı mı, boş mu gibi kontroller yapar."
          example='"merhaba" → İçerir("er") → DOĞRU'
        />
      </div>
      
      <select
        value={data.condition || 'contains'}
        onChange={(e) => data.onConditionChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="contains">İçerir</option>
        <option value="startsWith">İle Başlar</option>
        <option value="endsWith">İle Biter</option>
        <option value="equals">Eşittir</option>
        <option value="notEmpty">Boş Değil</option>
        <option value="isNumber">Sayı mı?</option>
      </select>
      
      <input
        type="text"
        placeholder="Karşılaştırma değeri..."
        value={data.compareValue || ''}
        onChange={(e) => data.onCompareValueChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200"
      />
      
      <div className="flex gap-2 mt-2">
        <div className="flex-1 text-xs text-slate-400">
          Sonuç: <span className={data.result ? 'text-green-400' : 'text-red-400'}>{data.result !== undefined ? (data.result ? 'DOĞRU' : 'YANLIŞ') : '—'}</span>
        </div>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '40%' }}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '70%' }}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-red-300"
      />
    </div>
  );
});

LogicNode.displayName = 'LogicNode';
export default LogicNode;
