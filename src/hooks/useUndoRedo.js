import { useState, useCallback, useRef } from 'react';

export function useUndoRedo(maxHistoryLength = 50) {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isUndoRedoing = useRef(false);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const saveState = useCallback((nodes, edges) => {
    if (isUndoRedoing.current) return;
    
    const state = { nodes: JSON.stringify(nodes), edges: JSON.stringify(edges) };
    
    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Check if state is different from current
      const lastState = newHistory[newHistory.length - 1];
      if (lastState && lastState.nodes === state.nodes && lastState.edges === state.edges) {
        return prev;
      }
      
      // Add new state
      const updated = [...newHistory, state];
      
      // Limit history length
      if (updated.length > maxHistoryLength) {
        return updated.slice(-maxHistoryLength);
      }
      
      return updated;
    });
    
    setCurrentIndex(prev => Math.min(prev + 1, maxHistoryLength - 1));
  }, [currentIndex, maxHistoryLength]);

  const undo = useCallback(() => {
    if (!canUndo) return null;
    
    isUndoRedoing.current = true;
    const prevIndex = currentIndex - 1;
    const prevState = history[prevIndex];
    setCurrentIndex(prevIndex);
    
    setTimeout(() => { isUndoRedoing.current = false; }, 100);
    
    return {
      nodes: JSON.parse(prevState.nodes),
      edges: JSON.parse(prevState.edges)
    };
  }, [canUndo, currentIndex, history]);

  const redo = useCallback(() => {
    if (!canRedo) return null;
    
    isUndoRedoing.current = true;
    const nextIndex = currentIndex + 1;
    const nextState = history[nextIndex];
    setCurrentIndex(nextIndex);
    
    setTimeout(() => { isUndoRedoing.current = false; }, 100);
    
    return {
      nodes: JSON.parse(nextState.nodes),
      edges: JSON.parse(nextState.edges)
    };
  }, [canRedo, currentIndex, history]);

  const reset = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    historyLength: history.length,
    currentIndex
  };
}
