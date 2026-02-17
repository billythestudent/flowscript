import { memo } from 'react';

const NoteNode = memo(({ data }) => {
  return (
    <div className="bg-amber-500/10 backdrop-blur-sm rounded-xl p-4 min-w-[180px] max-w-[300px] border border-amber-500/30 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-400">📝</span>
        <span className="text-amber-400 font-semibold text-xs uppercase tracking-wider">Not</span>
      </div>
      
      <textarea
        placeholder="Notunuzu yazın..."
        value={data.note || ''}
        onChange={(e) => data.onNoteChange?.(e.target.value)}
        rows={3}
        className="w-full bg-transparent border-none text-amber-100 text-sm placeholder-amber-400/50 resize-none focus:outline-none"
      />
    </div>
  );
});

NoteNode.displayName = 'NoteNode';
export default NoteNode;
