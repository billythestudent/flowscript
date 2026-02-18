import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const FileWriteNode = memo(({ data, isConnectable }) => {
  const [filePath, setFilePath] = useState(data.filePath || 'output.txt');
  const [content, setContent] = useState(data.content || '');
  const [encoding, setEncoding] = useState(data.encoding || 'utf-8');
  const [writeMode, setWriteMode] = useState(data.writeMode || 'write');

  const handleChange = (field, value) => {
    const setters = { filePath: setFilePath, content: setContent, encoding: setEncoding, writeMode: setWriteMode };
    setters[field]?.(value);
    if (data.onChange) {
      data.onChange({ ...data, filePath, content, encoding, writeMode, [field]: value });
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-900/90 to-yellow-900/90 rounded-xl border-2 border-amber-500/50 min-w-[240px] shadow-lg shadow-amber-500/20">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-amber-400 border-2 border-amber-600"
      />
      
      <div className="px-4 py-2 border-b border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">✍️</span>
          <span className="font-semibold text-white text-sm">Dosya Yaz</span>
        </div>
        <HelpTooltip content="Dosyaya içerik yazar. Varolan dosyayı değiştirir veya yeni oluşturur." />
      </div>

      <div className="p-3 space-y-2">
        {/* File Path */}
        <div>
          <label className="text-xs text-amber-300 mb-1 block">Dosya Yolu</label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => handleChange('filePath', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-amber-500/30 rounded text-white text-sm focus:outline-none focus:border-amber-400"
            placeholder="./output.txt"
          />
        </div>

        {/* Write Mode */}
        <div>
          <label className="text-xs text-amber-300 mb-1 block">Yazma Modu</label>
          <select
            value={writeMode}
            onChange={(e) => handleChange('writeMode', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-amber-500/30 rounded text-white text-sm focus:outline-none focus:border-amber-400"
          >
            <option value="write">Üzerine Yaz</option>
            <option value="append">Sonuna Ekle</option>
            <option value="create">Sadece Oluştur (Varsa hata)</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="text-xs text-amber-300 mb-1 block">İçerik</label>
          <textarea
            value={content}
            onChange={(e) => handleChange('content', e.target.value)}
            className="w-full px-2 py-1.5 bg-slate-800/50 border border-amber-500/30 rounded text-white text-xs font-mono resize-none focus:outline-none focus:border-amber-400"
            rows={3}
            placeholder="Yazılacak içerik veya değişken adı"
          />
        </div>

        {/* Encoding */}
        <div>
          <label className="text-xs text-amber-300 mb-1 block">Karakter Kodlaması</label>
          <select
            value={encoding}
            onChange={(e) => handleChange('encoding', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-amber-500/30 rounded text-white text-sm focus:outline-none focus:border-amber-400"
          >
            <option value="utf-8">UTF-8</option>
            <option value="ascii">ASCII</option>
            <option value="latin1">Latin-1</option>
            <option value="utf-16">UTF-16</option>
          </select>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-amber-400 border-2 border-amber-600"
      />
    </div>
  );
});

FileWriteNode.displayName = 'FileWriteNode';

export default FileWriteNode;
