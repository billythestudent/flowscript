import { memo, useState, useMemo } from 'react';

// JavaScript node kategorileri
const jsNodeCategories = [
  {
    name: 'Temel',
    nodes: [
      { type: 'input', label: 'Giriş', color: 'blue', icon: '📥', description: 'Veri girişi' },
      { type: 'output', label: 'Çıkış', color: 'orange', icon: '📤', description: 'Sonuç göster' },
      { type: 'console', label: 'Console', color: 'gray', icon: '🖥️', description: 'console.log()' },
    ]
  },
  {
    name: 'İşlemler',
    nodes: [
      { type: 'function', label: 'Fonksiyon', color: 'purple', icon: '⚙️', description: 'Arrow function' },
      { type: 'math', label: 'Matematik', color: 'cyan', icon: '🔢', description: 'Math işlemleri' },
      { type: 'text', label: 'Metin', color: 'pink', icon: '✂️', description: 'String işleme' },
      { type: 'regex', label: 'RegEx', color: 'red', icon: '🔍', description: 'RegExp işlemleri' },
    ]
  },
  {
    name: 'Kontrol',
    nodes: [
      { type: 'logic', label: 'Mantık', color: 'green', icon: '🔀', description: 'Boolean logic' },
      { type: 'conditional', label: 'If-Else', color: 'fuchsia', icon: '⚖️', description: 'Ternary/if-else' },
      { type: 'loop', label: 'Döngü', color: 'sky', icon: '🔄', description: 'for/forEach/map' },
      { type: 'delay', label: 'Gecikme', color: 'yellow', icon: '⏱️', description: 'setTimeout' },
      { type: 'merge', label: 'Birleştir', color: 'indigo', icon: '🔗', description: 'Object.assign' },
    ]
  },
  {
    name: 'Veri',
    nodes: [
      { type: 'json', label: 'JSON', color: 'teal', icon: '📋', description: 'JSON parse/stringify' },
      { type: 'array', label: 'Dizi', color: 'lime', icon: '📊', description: 'Array methods' },
      { type: 'storage', label: 'Storage', color: 'amber', icon: '💾', description: 'localStorage' },
    ]
  },
  {
    name: 'API',
    nodes: [
      { type: 'api', label: 'Mock API', color: 'rose', icon: '🎭', description: 'Mock HTTP' },
      { type: 'fetch', label: 'Fetch', color: 'emerald', icon: '🌐', description: 'fetch() API' },
    ]
  },
  {
    name: 'Diğer',
    nodes: [
      { type: 'random', label: 'Rastgele', color: 'violet', icon: '🎲', description: 'Math.random()' },
      { type: 'date', label: 'Tarih', color: 'amber', icon: '📅', description: 'Date object' },
      { type: 'note', label: 'Not', color: 'slate', icon: '📝', description: '// Yorum' },
    ]
  }
];

// Python node kategorileri
const pythonNodeCategories = [
  {
    name: 'Temel',
    nodes: [
      { type: 'input', label: 'Giriş', color: 'blue', icon: '📥', description: 'Değişken tanımla' },
      { type: 'output', label: 'Çıkış', color: 'orange', icon: '📤', description: 'Sonuç döndür' },
      { type: 'console', label: 'Print', color: 'gray', icon: '🖥️', description: 'print()' },
    ]
  },
  {
    name: 'İşlemler',
    nodes: [
      { type: 'function', label: 'Fonksiyon', color: 'purple', icon: '⚙️', description: 'def function' },
      { type: 'math', label: 'Matematik', color: 'cyan', icon: '🔢', description: 'math modülü' },
      { type: 'text', label: 'Metin', color: 'pink', icon: '✂️', description: 'str methods' },
      { type: 'regex', label: 'RegEx', color: 'red', icon: '🔍', description: 're modülü' },
    ]
  },
  {
    name: 'Kontrol',
    nodes: [
      { type: 'logic', label: 'Mantık', color: 'green', icon: '🔀', description: 'and/or/not' },
      { type: 'conditional', label: 'If-Else', color: 'fuchsia', icon: '⚖️', description: 'if/elif/else' },
      { type: 'loop', label: 'Döngü', color: 'sky', icon: '🔄', description: 'for/while' },
      { type: 'delay', label: 'Gecikme', color: 'yellow', icon: '⏱️', description: 'time.sleep()' },
      { type: 'merge', label: 'Birleştir', color: 'indigo', icon: '🔗', description: 'dict merge' },
    ]
  },
  {
    name: 'Veri',
    nodes: [
      { type: 'json', label: 'JSON', color: 'teal', icon: '📋', description: 'json modülü' },
      { type: 'array', label: 'Liste', color: 'lime', icon: '📊', description: 'list methods' },
    ]
  },
  {
    name: 'API',
    nodes: [
      { type: 'api', label: 'Mock API', color: 'rose', icon: '🎭', description: 'Mock HTTP' },
      { type: 'fetch', label: 'Requests', color: 'emerald', icon: '🌐', description: 'requests lib' },
    ]
  },
  {
    name: 'Diğer',
    nodes: [
      { type: 'random', label: 'Rastgele', color: 'violet', icon: '🎲', description: 'random modülü' },
      { type: 'date', label: 'Tarih', color: 'amber', icon: '📅', description: 'datetime' },
      { type: 'note', label: 'Not', color: 'slate', icon: '📝', description: '# Yorum' },
    ]
  }
];

// Java node kategorileri
const javaNodeCategories = [
  {
    name: 'Temel',
    nodes: [
      { type: 'input', label: 'Giriş', color: 'blue', icon: '📥', description: 'Değişken tanımla' },
      { type: 'output', label: 'Çıkış', color: 'orange', icon: '📤', description: 'return/print' },
      { type: 'console', label: 'Print', color: 'gray', icon: '🖥️', description: 'System.out.println()' },
    ]
  },
  {
    name: 'İşlemler',
    nodes: [
      { type: 'function', label: 'Metot', color: 'purple', icon: '⚙️', description: 'public method' },
      { type: 'math', label: 'Matematik', color: 'cyan', icon: '🔢', description: 'Math class' },
      { type: 'text', label: 'Metin', color: 'pink', icon: '✂️', description: 'String methods' },
      { type: 'regex', label: 'RegEx', color: 'red', icon: '🔍', description: 'Pattern/Matcher' },
    ]
  },
  {
    name: 'Kontrol',
    nodes: [
      { type: 'logic', label: 'Mantık', color: 'green', icon: '🔀', description: '&&/||/!' },
      { type: 'conditional', label: 'If-Else', color: 'fuchsia', icon: '⚖️', description: 'if/else if/else' },
      { type: 'loop', label: 'Döngü', color: 'sky', icon: '🔄', description: 'for/forEach/while' },
      { type: 'delay', label: 'Gecikme', color: 'yellow', icon: '⏱️', description: 'Thread.sleep()' },
      { type: 'merge', label: 'Birleştir', color: 'indigo', icon: '🔗', description: 'Map merge' },
    ]
  },
  {
    name: 'Veri',
    nodes: [
      { type: 'json', label: 'JSON', color: 'teal', icon: '📋', description: 'org.json / Gson' },
      { type: 'array', label: 'Liste', color: 'lime', icon: '📊', description: 'ArrayList/Stream' },
    ]
  },
  {
    name: 'API',
    nodes: [
      { type: 'api', label: 'Mock API', color: 'rose', icon: '🎭', description: 'Mock HTTP' },
      { type: 'fetch', label: 'HttpClient', color: 'emerald', icon: '🌐', description: 'HttpURLConnection' },
    ]
  },
  {
    name: 'Diğer',
    nodes: [
      { type: 'random', label: 'Rastgele', color: 'violet', icon: '🎲', description: 'Random class' },
      { type: 'date', label: 'Tarih', color: 'amber', icon: '📅', description: 'LocalDateTime' },
      { type: 'note', label: 'Not', color: 'slate', icon: '📝', description: '// Yorum' },
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
  red: 'border-red-500/30 hover:border-red-500/60 hover:shadow-red-500/20',
  emerald: 'border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/20',
  sky: 'border-sky-500/30 hover:border-sky-500/60 hover:shadow-sky-500/20',
  fuchsia: 'border-fuchsia-500/30 hover:border-fuchsia-500/60 hover:shadow-fuchsia-500/20',
  gray: 'border-gray-500/30 hover:border-gray-500/60 hover:shadow-gray-500/20',
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
  red: 'text-red-400',
  emerald: 'text-emerald-400',
  sky: 'text-sky-400',
  fuchsia: 'text-fuchsia-400',
  gray: 'text-gray-400',
};

const Sidebar = memo(({ selectedLanguage = 'javascript' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const nodeCategories = useMemo(() => {
    if (selectedLanguage === 'python') return pythonNodeCategories;
    if (selectedLanguage === 'java') return javaNodeCategories;
    return jsNodeCategories;
  }, [selectedLanguage]);

  // Filter nodes based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return nodeCategories;
    
    const term = searchTerm.toLowerCase();
    return nodeCategories
      .map(category => ({
        ...category,
        nodes: category.nodes.filter(node => 
          node.label.toLowerCase().includes(term) ||
          node.description.toLowerCase().includes(term) ||
          node.type.toLowerCase().includes(term)
        )
      }))
      .filter(category => category.nodes.length > 0);
  }, [nodeCategories, searchTerm]);

  const [expandedCategories, setExpandedCategories] = useState(
    jsNodeCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {})
  );

  const toggleCategory = (name) => {
    setExpandedCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const getLanguageInfo = () => {
    switch (selectedLanguage) {
      case 'python': return { icon: '🐍', name: 'Python' };
      case 'java': return { icon: '☕', name: 'Java' };
      default: return { icon: '⚡', name: 'JavaScript' };
    }
  };
  const langInfo = getLanguageInfo();

  return (
    <div className="w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 flex flex-col h-full">
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{langInfo.icon}</span>
          <h2 className="text-lg font-bold text-white">{langInfo.name}</h2>
        </div>
        <p className="text-xs text-slate-400 mb-3">Sürükle ve bırak</p>
        
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Blok ara..."
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredCategories.length === 0 ? (
          <div className="text-center text-slate-500 text-sm py-8">
            <p>🔍 Sonuç bulunamadı</p>
            <p className="text-xs mt-1">Farklı bir arama deneyin</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
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
        ))
        )}
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
