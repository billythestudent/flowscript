import { memo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const languageNames = {
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
};

const Header = memo(({ onRun, isRunning, onToggleCodeDrawer, isCodeDrawerOpen, onExport, onImport, onClear, onUndo, onRedo, canUndo, canRedo, selectedLanguage, onBackToHome }) => {
  const fileInputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImport(event.target.result);
      };
      reader.readAsText(file);
      e.target.value = '';
    }
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Home Button */}
        <button
          onClick={onBackToHome}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          title="Ana Sayfa"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FS</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            FlowScript
          </h1>
          {selectedLanguage && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-500/30">
              {languageNames[selectedLanguage] || selectedLanguage}
            </span>
          )}
        </div>
        
        {/* File Actions */}
        <div className="flex items-center gap-1 ml-4 pl-4 border-l border-slate-700/50">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={handleImportClick}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            title="İçe Aktar (JSON)"
          >
            📂 İçe Aktar
          </button>
          <button
            onClick={onExport}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
            title="Dışa Aktar (JSON)"
          >
            💾 Dışa Aktar
          </button>
          <button
            onClick={onClear}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/50 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-all"
            title="Tümünü Temizle"
          >
            🗑️ Temizle
          </button>
          
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-700/50">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                canUndo 
                  ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white' 
                  : 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
              }`}
              title="Geri Al (Ctrl+Z)"
            >
              ↩️
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className={`px-2 py-1.5 rounded-lg text-sm font-medium transition-all ${
                canRedo 
                  ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white' 
                  : 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
              }`}
              title="Yinele (Ctrl+Y)"
            >
              ↪️
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 rounded-lg font-medium text-sm bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
          title={theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        
        <button
          onClick={onToggleCodeDrawer}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            isCodeDrawerOpen
              ? 'bg-slate-700 text-white'
              : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {'</>'} Kod
        </button>
        
        <motion.button
          onClick={onRun}
          disabled={isRunning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-6 py-2 rounded-lg font-semibold text-sm text-white overflow-hidden transition-all duration-300 ${
            isRunning
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-lg shadow-green-500/25'
          }`}
        >
          {isRunning ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Çalışıyor...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>▶</span> Çalıştır
            </span>
          )}
          
          {!isRunning && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </motion.button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
