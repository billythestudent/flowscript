import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const FileReadNode = memo(({ data, isConnectable }) => {
  const [filePath, setFilePath] = useState(data.filePath || 'data.txt');
  const [encoding, setEncoding] = useState(data.encoding || 'utf-8');
  const [outputVar, setOutputVar] = useState(data.outputVar || 'fileContent');
  const [readType, setReadType] = useState(data.readType || 'text');

  const handleChange = (field, value) => {
    const setters = { filePath: setFilePath, encoding: setEncoding, outputVar: setOutputVar, readType: setReadType };
    setters[field]?.(value);
    if (data.onChange) {
      data.onChange({ ...data, filePath, encoding, outputVar, readType, [field]: value });
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/90 to-teal-900/90 rounded-xl border-2 border-emerald-500/50 min-w-[240px] shadow-lg shadow-emerald-500/20">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-emerald-400 border-2 border-emerald-600"
      />
      
      <div className="px-4 py-2 border-b border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <span className="font-semibold text-white text-sm">Dosya Oku</span>
        </div>
        <HelpTooltip content="Dosya içeriğini okur. Node.js (fs) veya Python (open) kullanır." />
      </div>

      <div className="p-3 space-y-2">
        {/* File Path */}
        <div>
          <label className="text-xs text-emerald-300 mb-1 block">Dosya Yolu</label>
          <input
            type="text"
            value={filePath}
            onChange={(e) => handleChange('filePath', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-emerald-500/30 rounded text-white text-sm focus:outline-none focus:border-emerald-400"
            placeholder="./data.txt"
          />
        </div>

        {/* Read Type */}
        <div>
          <label className="text-xs text-emerald-300 mb-1 block">Okuma Tipi</label>
          <select
            value={readType}
            onChange={(e) => handleChange('readType', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-emerald-500/30 rounded text-white text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="text">Metin</option>
            <option value="json">JSON</option>
            <option value="lines">Satır Satır</option>
            <option value="binary">Binary</option>
          </select>
        </div>

        {/* Encoding */}
        <div>
          <label className="text-xs text-emerald-300 mb-1 block">Karakter Kodlaması</label>
          <select
            value={encoding}
            onChange={(e) => handleChange('encoding', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-emerald-500/30 rounded text-white text-sm focus:outline-none focus:border-emerald-400"
          >
            <option value="utf-8">UTF-8</option>
            <option value="ascii">ASCII</option>
            <option value="latin1">Latin-1</option>
            <option value="utf-16">UTF-16</option>
          </select>
        </div>

        {/* Output Variable */}
        <div>
          <label className="text-xs text-emerald-300 mb-1 block">Çıktı Değişkeni</label>
          <input
            type="text"
            value={outputVar}
            onChange={(e) => handleChange('outputVar', e.target.value)}
            className="w-full px-2 py-1 bg-slate-800/50 border border-emerald-500/30 rounded text-white text-sm focus:outline-none focus:border-emerald-400"
            placeholder="fileContent"
          />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-emerald-400 border-2 border-emerald-600"
      />
    </div>
  );
});

FileReadNode.displayName = 'FileReadNode';

export default FileReadNode;
