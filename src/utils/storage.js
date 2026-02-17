const STORAGE_KEY = 'logic-flow-builder-state';

export function saveToLocalStorage(nodes, edges) {
  try {
    const state = { nodes, edges, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return false;
  }
}

export function loadFromLocalStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored);
      return { nodes: state.nodes || [], edges: state.edges || [] };
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return { nodes: [], edges: [] };
}

export function clearLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
    return false;
  }
}
