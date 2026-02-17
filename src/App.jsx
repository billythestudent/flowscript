import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { nodeTypes } from './components/nodes';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CodeDrawer from './components/CodeDrawer';
import ResultModal from './components/ResultModal';
import HelpModal from './components/HelpModal';
import TemplatesModal from './components/TemplatesModal';
import LandingPage from './components/LandingPage';
import { useFlowManager } from './hooks/useFlowManager';
import { generateCode, generatePythonCode } from './utils/flowUtils';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || null;
  });
  const [isCodeDrawerOpen, setIsCodeDrawerOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleSelectLanguage = useCallback((lang) => {
    setSelectedLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setSelectedLanguage(null);
    localStorage.removeItem('selectedLanguage');
  }, []);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
    onNodesDelete,
    onEdgesDelete,
    runFlow,
    exportFlow,
    importFlow,
    clearAll,
    undo,
    redo,
    canUndo,
    canRedo,
    loadTemplate,
    reactFlowWrapper,
    reactFlowInstance,
  } = useFlowManager();

  const handleSelectTemplate = useCallback((template) => {
    loadTemplate(template);
    toast.success(`"${template.name}" şablonu yüklendi!`);
  }, [loadTemplate]);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    
    // Simulate processing with animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const flowResult = runFlow();
    setResult(flowResult);
    setIsRunning(false);
    setShowResult(true);
  }, [runFlow]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // '?' to toggle help
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsHelpOpen(prev => !prev);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setIsHelpOpen(false);
        setIsCodeDrawerOpen(false);
        setShowResult(false);
      }
      // Ctrl+Z = Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl+Y or Ctrl+Shift+Z = Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      // Ctrl+S = Export
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportFlow();
      }
      // Ctrl+Enter = Run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, exportFlow, handleRun]);

  const code = generateCode(nodes, edges);
  const pythonCode = generatePythonCode(nodes, edges);

  // Show landing page if no language selected
  if (!selectedLanguage) {
    return (
      <>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
            },
          }}
        />
        <LandingPage onSelectLanguage={handleSelectLanguage} />
      </>
    );
  }

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col">
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
        }}
      />
      
      <Header 
        onRun={handleRun}
        isRunning={isRunning}
        onToggleCodeDrawer={() => setIsCodeDrawerOpen(!isCodeDrawerOpen)}
        isCodeDrawerOpen={isCodeDrawerOpen}
        onExport={exportFlow}
        onImport={importFlow}
        onClear={clearAll}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        selectedLanguage={selectedLanguage}
        onBackToHome={handleBackToHome}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar selectedLanguage={selectedLanguage} />
        
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            onInit={(instance) => { reactFlowInstance.current = instance; }}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode="Delete"
            selectionKeyCode={null}
            className="bg-slate-900"
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: '#6366f1', strokeWidth: 2 },
            }}
            edgesReconnectable={true}
          >
            <Background 
              variant="dots" 
              gap={20} 
              size={1} 
              color="#334155"
              className="bg-slate-900"
            />
            <Controls 
              className="!bg-slate-800/80 !border-slate-700/50 !rounded-xl overflow-hidden [&>button]:!bg-slate-800 [&>button]:!border-slate-700/50 [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-700"
            />
            <MiniMap 
              className="!bg-slate-800/80 !border-slate-700/50 !rounded-xl"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'input': return '#3b82f6';
                  case 'function': return '#a855f7';
                  case 'logic': return '#22c55e';
                  case 'output': return '#f97316';
                  case 'math': return '#06b6d4';
                  case 'text': return '#ec4899';
                  case 'delay': return '#eab308';
                  case 'merge': return '#6366f1';
                  case 'random': return '#f43f5e';
                  case 'note': return '#64748b';
                  case 'date': return '#f59e0b';
                  case 'json': return '#14b8a6';
                  case 'array': return '#84cc16';
                  case 'api': return '#f43f5e';
                  default: return '#64748b';
                }
              }}
              maskColor="rgba(15, 23, 42, 0.8)"
            />
          </ReactFlow>
          
          {/* Empty state */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-slate-400 text-lg mb-2">Akış boş</p>
                <p className="text-slate-500 text-sm">Sol panelden blokları sürükleyip bırakın</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CodeDrawer 
        isOpen={isCodeDrawerOpen}
        code={code}
        pythonCode={pythonCode}
        selectedLanguage={selectedLanguage}
        onClose={() => setIsCodeDrawerOpen(false)}
      />
      
      <ResultModal 
        isOpen={showResult}
        result={result}
        onClose={() => setShowResult(false)}
      />
      
      <HelpModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
      
      <TemplatesModal 
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
      
      {/* Templates button */}
      <button
        onClick={() => setIsTemplatesOpen(true)}
        className="fixed bottom-4 right-16 w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center text-lg z-30"
        title="Şablonlar"
      >
        📋
      </button>
      
      {/* Help button */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center text-lg font-bold z-30"
        title="Klavye Kısayolları (?)"
      >
        ?
      </button>
    </div>
  );
}

export default App;
