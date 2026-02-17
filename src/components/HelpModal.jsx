import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shortcuts = [
  { key: 'Delete', description: 'Seçili blok veya bağlantıyı sil' },
  { key: 'Ctrl + Z', description: 'Geri al' },
  { key: 'Ctrl + Y', description: 'Yinele' },
  { key: 'Ctrl + S', description: 'Akışı dışa aktar (JSON)' },
  { key: 'Ctrl + Enter', description: 'Akışı çalıştır' },
  { key: 'Escape', description: 'Açık pencereleri kapat' },
  { key: 'Scroll', description: 'Yakınlaştır / Uzaklaştır' },
  { key: 'Shift + Drag', description: 'Çoklu seçim' },
  { key: 'Space + Drag', description: 'Canvas\'ı kaydır' },
  { key: '?', description: 'Bu yardım penceresini aç/kapat' },
];

const HelpModal = memo(({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⌨️</span>
                  <h2 className="text-xl font-bold text-white">Klavye Kısayolları</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-slate-300 text-sm">{shortcut.description}</span>
                    <kbd className="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-slate-400 border border-slate-700">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 text-center">
                  Press <kbd className="px-1 bg-slate-800 rounded">?</kbd> to toggle this help
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

HelpModal.displayName = 'HelpModal';
export default HelpModal;
