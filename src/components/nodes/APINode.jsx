import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';
import HelpTooltip from './HelpTooltip';

const APINode = memo(({ data, isConnectable }) => {
  return (
    <div className="relative glass rounded-xl p-4 min-w-[220px] border border-rose-500/30 transition-all duration-300 hover:scale-[1.02]" style={{ boxShadow: '0 0 10px rgba(244, 63, 94, 0.5), 0 0 20px rgba(244, 63, 94, 0.3)' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
          <span className="text-rose-400 font-semibold text-sm uppercase tracking-wider">API</span>
        </div>
        <HelpTooltip
          color="rose"
          title="API Bloğu"
          description="HTTP isteği yapar (simülasyon). Gerçek API çağrısı yapmaz, mock veri döner."
          example='GET /users → {"users": [...]}'
        />
      </div>
      
      <select
        value={data.operation || 'get'}
        onChange={(e) => data.onOperationChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm mb-2 input-neon transition-all duration-200 cursor-pointer"
      >
        <option value="get">GET</option>
        <option value="post">POST</option>
        <option value="put">PUT</option>
        <option value="delete">DELETE</option>
        <option value="mock-user">Mock: Kullanıcı</option>
        <option value="mock-product">Mock: Ürün</option>
        <option value="mock-list">Mock: Liste</option>
      </select>
      
      <input
        type="text"
        placeholder="URL veya endpoint..."
        value={data.textParam || ''}
        onChange={(e) => data.onTextParamChange?.(e.target.value)}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200 mb-2"
      />
      
      <textarea
        placeholder="Body (JSON)..."
        value={data.textParam2 || ''}
        onChange={(e) => data.onTextParam2Change?.(e.target.value)}
        rows={2}
        className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-400 input-neon transition-all duration-200 resize-none"
      />
      
      <div className="text-xs text-slate-400 mt-2">
        Sonuç: <span className="text-rose-300 break-all">{data.output !== undefined ? String(data.output).substring(0, 25) : '—'}{data.output && String(data.output).length > 25 ? '...' : ''}</span>
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-rose-500 !border-2 !border-rose-300"
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="!w-3 !h-3 !bg-rose-500 !border-2 !border-rose-300"
      />
    </div>
  );
});

APINode.displayName = 'APINode';
export default APINode;
