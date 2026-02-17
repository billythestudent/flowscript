import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ResultModal = memo(({ isOpen, result, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <span className="text-xl">✓</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Çalıştırma Tamamlandı</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Result */}
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 mb-4">
                <p className="text-sm text-slate-400 mb-2">Sonuç:</p>
                <div className="text-lg font-mono text-white break-all">
                  {result !== undefined && result !== '' ? String(result) : <span className="text-slate-500 italic">Boş sonuç</span>}
                </div>
              </div>
              
              {/* Execution info */}
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Başarılı
                </span>
                <span>•</span>
                <span>{new Date().toLocaleTimeString('tr-TR')}</span>
              </div>
              
              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:from-blue-400 hover:to-purple-500 transition-all"
              >
                Tamam
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ResultModal.displayName = 'ResultModal';
export default ResultModal;
