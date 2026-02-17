import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';

const CodeDrawer = memo(({ isOpen, code, pythonCode, selectedLanguage = 'javascript', onClose }) => {
  const isPython = selectedLanguage === 'python';
  const currentCode = isPython ? pythonCode : code;
  const fileName = isPython ? 'flow.py' : 'flow.js';
  const languageLabel = isPython ? '🐍 Python' : '⚡ JavaScript';
  const languageColor = isPython ? 'blue' : 'yellow';
  
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[480px] bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <span className="text-lg">{'</>'}</span>
                <h2 className="text-lg font-semibold text-white">Üretilen Kod</h2>
                <span className={`px-2 py-1 rounded text-xs font-medium bg-${languageColor}-500/20 text-${languageColor}-400`}>
                  {languageLabel}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {/* Code */}
            <div className="flex-1 overflow-auto p-4">
              <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border-b border-slate-700/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-slate-400 ml-2">{fileName}</span>
                </div>
                
                <Highlight theme={themes.nightOwl} code={currentCode} language={isPython ? 'python' : 'javascript'}>
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} p-4 text-sm overflow-x-auto`} style={{ ...style, background: 'transparent', margin: 0 }}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })} className="table-row">
                          <span className="table-cell text-slate-500 pr-4 select-none text-right w-8">
                            {i + 1}
                          </span>
                          <span className="table-cell">
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </span>
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50 space-y-2">
              <button
                onClick={() => {
                  const blob = new Blob([currentCode], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium text-sm transition-all"
              >
                💾 {isPython ? 'Python' : 'JavaScript'} Dosyası İndir
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(currentCode)}
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                📋 Kodu Kopyala
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

CodeDrawer.displayName = 'CodeDrawer';
export default CodeDrawer;
