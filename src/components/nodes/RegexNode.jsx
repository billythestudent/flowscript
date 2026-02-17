import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const RegexNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] neon-red border border-red-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">RegEx</span>
        </div>
        <HelpTooltip
          color="red"
          title="RegEx Bloğu"
          description="Düzenli ifadelerle metin eşleştirme ve değiştirme işlemleri yapar."
          example='"hello123" → match(/\d+/) → "123"'
        />
      </div>
      
      <select
        value={data.operation || 'test'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="test">Test (Eşleşme Var mı?)</option>
        <option value="match">Match (Eşleşenleri Bul)</option>
        <option value="replace">Replace (Değiştir)</option>
        <option value="split">Split (Böl)</option>
        <option value="extract">Extract (İlk Eşleşme)</option>
      </select>

      <input
        type="text"
        value={data.pattern || ''}
        onChange={(e) => data.onPatternChange?.(e.target.value)}
        placeholder="Regex pattern (örn: \d+)"
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
      />

      {data.operation === 'replace' && (
        <input
          type="text"
          value={data.replacement || ''}
          onChange={(e) => data.onReplacementChange?.(e.target.value)}
          placeholder="Değiştirme metni"
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}

      <div className="flex items-center gap-2 mt-2">
        <label className="flex items-center gap-1 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={data.flags?.includes('g') || false}
            onChange={(e) => {
              const currentFlags = data.flags || '';
              const newFlags = e.target.checked 
                ? currentFlags + 'g' 
                : currentFlags.replace('g', '');
              data.onFlagsChange?.(newFlags);
            }}
            className="rounded bg-slate-700"
          />
          Global
        </label>
        <label className="flex items-center gap-1 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={data.flags?.includes('i') || false}
            onChange={(e) => {
              const currentFlags = data.flags || '';
              const newFlags = e.target.checked 
                ? currentFlags + 'i' 
                : currentFlags.replace('i', '');
              data.onFlagsChange?.(newFlags);
            }}
            className="rounded bg-slate-700"
          />
          Ignore Case
        </label>
      </div>
      
      <div className="text-xs text-slate-400 mt-2">
        Çıktı: <span className="text-red-300">{String(data.output ?? '—')}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-red-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-red-300"
      />
    </div>
  );
});

RegexNode.displayName = 'RegexNode';
export default RegexNode;
