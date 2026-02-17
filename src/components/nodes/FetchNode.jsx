import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const FetchNode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[250px] neon-emerald border border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">HTTP/Fetch</span>
        </div>
        <HelpTooltip
          color="emerald"
          title="HTTP İstek Bloğu"
          description="Gerçek HTTP istekleri yapar. GET, POST, PUT, DELETE destekler."
          example='fetch("https://api.example.com") → JSON response'
        />
      </div>
      
      <select
        value={data.method || 'GET'}
        onChange={(e) => data.onMethodChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </select>

      <input
        type="text"
        value={data.url || ''}
        onChange={(e) => data.onUrlChange?.(e.target.value)}
        placeholder="URL (https://api.example.com)"
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200"
      />

      {(data.method === 'POST' || data.method === 'PUT' || data.method === 'PATCH') && (
        <textarea
          value={data.body || ''}
          onChange={(e) => data.onBodyChange?.(e.target.value)}
          placeholder='Request body (JSON)'
          rows={2}
          className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 resize-none"
        />
      )}

      <input
        type="text"
        value={data.headers || ''}
        onChange={(e) => data.onHeadersChange?.(e.target.value)}
        placeholder='Headers (JSON): {"Authorization": "..."}'
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 text-xs"
      />

      <div className="flex items-center gap-2">
        <span className={`text-xs px-2 py-0.5 rounded ${data.status === 'success' ? 'bg-green-500/20 text-green-400' : data.status === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>
          {data.statusCode || 'Bekliyor'}
        </span>
      </div>
      
      <div className="text-xs text-slate-400 mt-2">
        Çıktı: <span className="text-emerald-300 break-all">{String(data.output ?? '—').substring(0, 50)}{String(data.output || '').length > 50 ? '...' : ''}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-emerald-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-emerald-300"
      />
    </div>
  );
});

FetchNode.displayName = 'FetchNode';
export default FetchNode;
