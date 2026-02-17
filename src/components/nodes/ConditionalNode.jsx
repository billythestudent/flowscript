import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const ConditionalNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[240px] neon-fuchsia border border-fuchsia-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-fuchsia-500 animate-pulse"></div>
          <span className="text-fuchsia-400 font-semibold text-sm uppercase tracking-wider">Koşul (If-Else)</span>
        </div>
        <HelpTooltip
          color="fuchsia"
          title="Koşul Bloğu"
          description="If-else mantığı ile dallanma yapar. Koşula göre farklı çıktı verir."
          example='x > 10 ? "büyük" : "küçük"'
        />
      </div>
      
      <select
        value={data.operator || 'equals'}
        onChange={(e) => data.onOperatorChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="equals">Eşittir (==)</option>
        <option value="notEquals">Eşit Değil (!=)</option>
        <option value="greater">Büyüktür (&gt;)</option>
        <option value="greaterOrEqual">Büyük Eşit (&gt;=)</option>
        <option value="less">Küçüktür (&lt;)</option>
        <option value="lessOrEqual">Küçük Eşit (&lt;=)</option>
        <option value="contains">İçerir</option>
        <option value="startsWith">İle Başlar</option>
        <option value="endsWith">İle Biter</option>
        <option value="truthy">Truthy (Doğruysa)</option>
        <option value="falsy">Falsy (Yanlışsa)</option>
      </select>

      {!['truthy', 'falsy'].includes(data.operator) && (
        <input
          type="text"
          value={data.compareValue || ''}
          onChange={(e) => data.onCompareValueChange?.(e.target.value)}
          placeholder="Karşılaştırma değeri"
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}

      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="text"
          value={data.trueValue || ''}
          onChange={(e) => data.onTrueValueChange?.(e.target.value)}
          placeholder="Doğruysa →"
          className="bg-green-900/30 border border-green-600/50 rounded-lg px-3 py-2 text-green-300 text-sm input-neon transition-all duration-200"
        />
        <input
          type="text"
          value={data.falseValue || ''}
          onChange={(e) => data.onFalseValueChange?.(e.target.value)}
          placeholder="Yanlışsa →"
          className="bg-red-900/30 border border-red-600/50 rounded-lg px-3 py-2 text-red-300 text-sm input-neon transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded ${data.conditionResult === true ? 'bg-green-500/20 text-green-400' : data.conditionResult === false ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>
          {data.conditionResult === true ? '✓ TRUE' : data.conditionResult === false ? '✗ FALSE' : 'Bekliyor'}
        </span>
      </div>
      
      <div className="text-xs text-slate-400">
        Çıktı: <span className="text-fuchsia-300">{String(data.output ?? '—')}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-fuchsia-500 !border-2 !border-fuchsia-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-fuchsia-500 !border-2 !border-fuchsia-300"
      />
    </div>
  );
});

ConditionalNode.displayName = 'ConditionalNode';
export default ConditionalNode;
