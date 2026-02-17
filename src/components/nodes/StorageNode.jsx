import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const StorageNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] neon-orange border border-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></div>
          <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Storage</span>
        </div>
        <HelpTooltip
          color="orange"
          title="Storage Bloğu"
          description="localStorage veya sessionStorage üzerinde okuma/yazma işlemleri yapar."
          example='localStorage.setItem("key", "value")'
        />
      </div>
      
      <select
        value={data.storageType || 'local'}
        onChange={(e) => data.onStorageTypeChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="local">localStorage</option>
        <option value="session">sessionStorage</option>
      </select>

      <select
        value={data.operation || 'get'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="get">getItem (Oku)</option>
        <option value="set">setItem (Yaz)</option>
        <option value="remove">removeItem (Sil)</option>
        <option value="clear">clear (Tümünü Sil)</option>
        <option value="keys">keys (Tüm Anahtarlar)</option>
        <option value="length">length (Öğe Sayısı)</option>
      </select>

      {data.operation !== 'clear' && data.operation !== 'keys' && data.operation !== 'length' && (
        <input
          type="text"
          value={data.key || ''}
          onChange={(e) => data.onKeyChange?.(e.target.value)}
          placeholder="Anahtar (key)"
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}

      {data.operation === 'set' && (
        <input
          type="text"
          value={data.value || ''}
          onChange={(e) => data.onValueChange?.(e.target.value)}
          placeholder="Değer (value) - veya giriş bağlantısı"
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
        />
      )}
      
      <div className="text-xs text-slate-400 mt-2">
        Çıktı: <span className="text-orange-300">{String(data.output ?? '—').substring(0, 40)}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-orange-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-orange-300"
      />
    </div>
  );
});

StorageNode.displayName = 'StorageNode';
export default StorageNode;
