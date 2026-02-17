import { memo, useState } from 'react';

const nodeCategories = [
  {
    name: 'Temel',
    nodes: [
      { type: 'input', label: 'Giriş', color: 'blue', icon: '📥', description: 'Veri girişi' },
      { type: 'output', label: 'Çıkış', color: 'orange', icon: '📤', description: 'Sonuç göster' },
    ]
  },
  {
    name: 'İşlemler',
    nodes: [
      { type: 'function', label: 'Fonksiyon', color: 'purple', icon: '⚙️', description: 'Veri dönüştür' },
      { type: 'math', label: 'Matematik', color: 'cyan', icon: '🔢', description: 'Sayı işlemleri' },
      { type: 'text', label: 'Metin', color: 'pink', icon: '✂️', description: 'Metin işleme' },
    ]
  },
  {
    name: 'Kontrol',
    nodes: [
      { type: 'logic', label: 'Mantık', color: 'green', icon: '🔀', description: 'Koşul kontrol' },
      { type: 'delay', label: 'Gecikme', color: 'yellow', icon: '⏱️', description: 'Bekletme' },
      { type: 'merge', label: 'Birleştir', color: 'indigo', icon: '🔗', description: 'Veri birleştir' },
    ]
  },
  {
    name: 'Veri',
    nodes: [
      { type: 'json', label: 'JSON', color: 'teal', icon: '📋', description: 'JSON işlemleri' },
      { type: 'array', label: 'Dizi', color: 'lime', icon: '📊', description: 'Dizi işlemleri' },
      { type: 'api', label: 'API', color: 'rose', icon: '🌐', description: 'HTTP istekleri' },
    ]
  },
  {
    name: 'Diğer',
    nodes: [
      { type: 'random', label: 'Rastgele', color: 'violet', icon: '🎲', description: 'Rastgele üret' },
      { type: 'date', label: 'Tarih', color: 'amber', icon: '📅', description: 'Tarih işlemleri' },
      { type: 'note', label: 'Not', color: 'slate', icon: '📝', description: 'Yorum ekle' },
    ]
  }
];

const colorClasses = {
  blue: 'border-blue-500/30 hover:border-blue-500/60 hover:shadow-blue-500/20',
  purple: 'border-purple-500/30 hover:border-purple-500/60 hover:shadow-purple-500/20',
  green: 'border-green-500/30 hover:border-green-500/60 hover:shadow-green-500/20',
  orange: 'border-orange-500/30 hover:border-orange-500/60 hover:shadow-orange-500/20',
  cyan: 'border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-cyan-500/20',
  pink: 'border-pink-500/30 hover:border-pink-500/60 hover:shadow-pink-500/20',
  yellow: 'border-yellow-500/30 hover:border-yellow-500/60 hover:shadow-yellow-500/20',
  indigo: 'border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-indigo-500/20',
  rose: 'border-rose-500/30 hover:border-rose-500/60 hover:shadow-rose-500/20',
  amber: 'border-amber-500/30 hover:border-amber-500/60 hover:shadow-amber-500/20',
  teal: 'border-teal-500/30 hover:border-teal-500/60 hover:shadow-teal-500/20',
  lime: 'border-lime-500/30 hover:border-lime-500/60 hover:shadow-lime-500/20',
  violet: 'border-violet-500/30 hover:border-violet-500/60 hover:shadow-violet-500/20',
  slate: 'border-slate-500/30 hover:border-slate-500/60 hover:shadow-slate-500/20',
};

const textColors = {
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  cyan: 'text-cyan-400',
  pink: 'text-pink-400',
  yellow: 'text-yellow-400',
  indigo: 'text-indigo-400',
  rose: 'text-rose-400',
  amber: 'text-amber-400',
  teal: 'text-teal-400',
  lime: 'text-lime-400',
  violet: 'text-violet-400',
  slate: 'text-slate-400',
};

const Sidebar = memo(() => {
  const [expandedCategories, setExpandedCategories] = useState(
    nodeCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
  );

  const toggleCategory = (name) => {
    setExpandedCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 flex flex-col h-full">
      <div className="p-4 border-b border-slate-700/50">
        <h2 className="text-lg font-bold text-white mb-1">Bloklar</h2>
        <p className="text-xs text-slate-400">Sürükle ve bırak</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {nodeCategories.map((category) => (
          <div key={category.name} className="mb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-300 transition-colors"
            >
              <span>{category.name}</span>
              <span className={`transform transition-transform ${expandedCategories[category.name] ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {expandedCategories[category.name] && (
              <div className="space-y-2 mt-2">
                {category.nodes.map((node) => (
                  <div
                    key={node.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type)}
                    className={`glass rounded-lg p-3 cursor-grab active:cursor-grabbing border transition-all duration-300 hover:scale-105 hover:shadow-lg ${colorClasses[node.color]}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{node.icon}</span>
                      <div>
                        <h3 className={`font-medium text-sm ${textColors[node.color]}`}>{node.label}</h3>
                        <p className="text-[10px] text-slate-500">{node.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-slate-700/50">
        <div className="text-[10px] text-slate-500 text-center space-y-1">
          <p>⌨️ Delete: Sil | Ctrl+Z: Geri Al</p>
          <p>Logic Flow Builder v2.0</p>
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;
