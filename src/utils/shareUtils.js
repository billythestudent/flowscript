// Flow sharing utilities
import LZString from 'lz-string';

// Generate a shareable URL from flow data
export function generateShareUrl(nodes, edges, selectedLanguage) {
  const flowData = {
    n: nodes.map(node => ({
      id: node.id,
      t: node.type,
      p: { x: Math.round(node.position.x), y: Math.round(node.position.y) },
      d: node.data,
    })),
    e: edges.map(edge => ({
      id: edge.id,
      s: edge.source,
      t: edge.target,
    })),
    l: selectedLanguage,
    v: 1, // version
  };

  const jsonString = JSON.stringify(flowData);
  const compressed = LZString.compressToEncodedURIComponent(jsonString);
  
  return `${window.location.origin}${window.location.pathname}?flow=${compressed}`;
}

// Parse shared flow from URL
export function parseShareUrl(url) {
  try {
    const urlParams = new URLSearchParams(new URL(url).search);
    const flowParam = urlParams.get('flow');
    
    if (!flowParam) return null;
    
    const decompressed = LZString.decompressFromEncodedURIComponent(flowParam);
    if (!decompressed) return null;
    
    const flowData = JSON.parse(decompressed);
    
    // Reconstruct full node/edge format
    const nodes = flowData.n.map(n => ({
      id: n.id,
      type: n.t,
      position: { x: n.p.x, y: n.p.y },
      data: n.d,
    }));
    
    const edges = flowData.e.map(e => ({
      id: e.id,
      source: e.s,
      target: e.t,
    }));
    
    return {
      nodes,
      edges,
      language: flowData.l,
      version: flowData.v,
    };
  } catch (error) {
    console.error('Error parsing share URL:', error);
    return null;
  }
}

// Check if current URL has shared flow
export function getSharedFlowFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const flowParam = urlParams.get('flow');
  
  if (!flowParam) return null;
  
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(flowParam);
    if (!decompressed) return null;
    
    const flowData = JSON.parse(decompressed);
    
    const nodes = flowData.n.map(n => ({
      id: n.id,
      type: n.t,
      position: { x: n.p.x, y: n.p.y },
      data: n.d,
    }));
    
    const edges = flowData.e.map(e => ({
      id: e.id,
      source: e.s,
      target: e.t,
    }));
    
    return {
      nodes,
      edges,
      language: flowData.l,
      version: flowData.v,
    };
  } catch (error) {
    console.error('Error parsing shared flow:', error);
    return null;
  }
}

// Clear flow parameter from URL
export function clearFlowFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('flow');
  window.history.replaceState({}, '', url.toString());
}

// Generate a short code for the flow (for display purposes)
export function generateFlowCode(nodes) {
  const hash = nodes.length.toString(36) + Date.now().toString(36).slice(-4);
  return hash.toUpperCase();
}
