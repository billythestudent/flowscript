import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const templates = [
  {
    id: 'text-processing',
    name: 'Metin İşleme',
    description: 'Metni büyük harfe çevirip uzunluğunu hesaplar',
    icon: '📝',
    color: 'purple',
    nodes: [
      { id: 'node_0', type: 'input', position: { x: 50, y: 150 }, data: { value: 'merhaba dünya' } },
      { id: 'node_1', type: 'function', position: { x: 300, y: 100 }, data: { operation: 'uppercase' } },
      { id: 'node_2', type: 'function', position: { x: 300, y: 220 }, data: { operation: 'length' } },
      { id: 'node_3', type: 'merge', position: { x: 550, y: 150 }, data: { separator: ' - ' } },
      { id: 'node_4', type: 'output', position: { x: 800, y: 150 }, data: {} },
    ],
    edges: [
      { id: 'e0-1', source: 'node_0', target: 'node_1', animated: true },
      { id: 'e0-2', source: 'node_0', target: 'node_2', animated: true },
      { id: 'e1-3', source: 'node_1', target: 'node_3', animated: true },
      { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
      { id: 'e3-4', source: 'node_3', target: 'node_4', animated: true },
    ]
  },
  {
    id: 'math-calculation',
    name: 'Matematik Hesaplama',
    description: 'Sayı üzerinde toplama ve çarpma işlemi yapar',
    icon: '🔢',
    color: 'cyan',
    nodes: [
      { id: 'node_0', type: 'input', position: { x: 50, y: 150 }, data: { value: '10' } },
      { id: 'node_1', type: 'math', position: { x: 300, y: 150 }, data: { operation: 'add', mathValue: '5' } },
      { id: 'node_2', type: 'math', position: { x: 550, y: 150 }, data: { operation: 'multiply', mathValue: '2' } },
      { id: 'node_3', type: 'output', position: { x: 800, y: 150 }, data: {} },
    ],
    edges: [
      { id: 'e0-1', source: 'node_0', target: 'node_1', animated: true },
      { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
      { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
    ]
  },
  {
    id: 'json-processing',
    name: 'JSON İşleme',
    description: "JSON verisinden kullanıcı adını çıkarır",
    icon: '📋',
    color: 'teal',
    nodes: [
      { id: 'node_0', type: 'input', position: { x: 50, y: 150 }, data: { value: '{"user":{"name":"Ali","age":25}}' } },
      { id: 'node_1', type: 'json', position: { x: 300, y: 150 }, data: { operation: 'get', textParam: 'user.name' } },
      { id: 'node_2', type: 'function', position: { x: 550, y: 150 }, data: { operation: 'uppercase' } },
      { id: 'node_3', type: 'output', position: { x: 800, y: 150 }, data: {} },
    ],
    edges: [
      { id: 'e0-1', source: 'node_0', target: 'node_1', animated: true },
      { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
      { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
    ]
  },
  {
    id: 'date-formatter',
    name: 'Tarih Formatlama',
    description: 'Şu anki tarihi özel formatta gösterir',
    icon: '📅',
    color: 'amber',
    nodes: [
      { id: 'node_0', type: 'date', position: { x: 50, y: 100 }, data: { operation: 'format', textParam: 'DD/MM/YYYY' } },
      { id: 'node_1', type: 'date', position: { x: 50, y: 220 }, data: { operation: 'dayOfWeek' } },
      { id: 'node_2', type: 'merge', position: { x: 300, y: 150 }, data: { separator: ' - ' } },
      { id: 'node_3', type: 'output', position: { x: 550, y: 150 }, data: {} },
    ],
    edges: [
      { id: 'e0-2', source: 'node_0', target: 'node_2', animated: true },
      { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
      { id: 'e2-3', source: 'node_2', target: 'node_3', animated: true },
    ]
  },
  {
    id: 'logic-check',
    name: 'Mantık Kontrolü',
    description: 'Girilen değerin sayı olup olmadığını kontrol eder',
    icon: '🔀',
    color: 'green',
    nodes: [
      { id: 'node_0', type: 'input', position: { x: 50, y: 150 }, data: { value: '42' } },
      { id: 'node_1', type: 'logic', position: { x: 300, y: 150 }, data: { condition: 'isNumber' } },
      { id: 'node_2', type: 'output', position: { x: 550, y: 150 }, data: {} },
    ],
    edges: [
      { id: 'e0-1', source: 'node_0', target: 'node_1', animated: true },
      { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
    ]
  },
  {
    id: 'random-generator',
    name: 'Rastgele Üretici',
    description: 'Rastgele sayı üretip işlem yapar',
    icon: '🎲',
    color: 'rose',
    nodes: [
      { id: 'node_0', type: 'random', position: { x: 50, y: 150 }, data: { randomType: 'number', min: '1', max: '100' } },
      { id: 'node_1', type: 'math', position: { x: 300, y: 150 }, data: { operation: 'multiply', mathValue: '2' } },
      { id: 'node_2', type: 'output', position: { x: 550, y: 150 }, data: {} },
    ],
    edges: [
      { id: 'e0-1', source: 'node_0', target: 'node_1', animated: true },
      { id: 'e1-2', source: 'node_1', target: 'node_2', animated: true },
    ]
  },
];

const colorClasses = {
  purple: 'border-purple-500/30 bg-purple-500/10 hover:border-purple-500/60',
  cyan: 'border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-500/60',
  teal: 'border-teal-500/30 bg-teal-500/10 hover:border-teal-500/60',
  amber: 'border-amber-500/30 bg-amber-500/10 hover:border-amber-500/60',
  green: 'border-green-500/30 bg-green-500/10 hover:border-green-500/60',
  rose: 'border-rose-500/30 bg-rose-500/10 hover:border-rose-500/60',
};

const TemplatesModal = memo(({ isOpen, onClose, onSelectTemplate }) => {
  const handleSelect = (template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden pointer-events-auto">
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white">Şablonlar</h2>
                    <p className="text-sm text-slate-400 mt-1">Hazır akış şablonları ile hızlıca başlayın</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-white transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <motion.button
                      key={template.id}
                      onClick={() => handleSelect(template)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border ${colorClasses[template.color]} text-left transition-all duration-200`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{template.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{template.name}</h3>
                          <p className="text-sm text-slate-400 mt-1">{template.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                            <span>{template.nodes.length} blok</span>
                            <span>•</span>
                            <span>{template.edges.length} bağlantı</span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
                <p className="text-xs text-slate-500 text-center">
                  Şablon seçtiğinizde mevcut akış temizlenecektir
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

TemplatesModal.displayName = 'TemplatesModal';
export default TemplatesModal;
