import { useCallback, useEffect, useRef } from 'react';
import { useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import toast from 'react-hot-toast';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';
import { useUndoRedo } from './useUndoRedo';

let nodeId = 0;
const getNodeId = () => `node_${nodeId++}`;

export function useFlowManager() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const reactFlowInstance = useRef(null);
  const { saveState, undo: undoState, redo: redoState, canUndo, canRedo } = useUndoRedo();

  // Load from localStorage on mount
  useEffect(() => {
    const { nodes: savedNodes, edges: savedEdges } = loadFromLocalStorage();
    if (savedNodes.length > 0) {
      // Default operations by node type
      const defaultOperations = {
        function: 'uppercase',
        math: 'add',
        logic: 'contains',
        text: 'split'
      };
      
      // Restore callbacks and fix operation if needed
      const restoredNodes = savedNodes.map(node => {
        // Fix operation value if it doesn't match node type
        let operation = node.data.operation;
        if (node.type === 'math' && !['add', 'subtract', 'multiply', 'divide', 'power', 'sqrt', 'abs', 'round'].includes(operation)) {
          operation = 'add';
        } else if (node.type === 'function' && !['uppercase', 'lowercase', 'reverse', 'length', 'trim', 'double'].includes(operation)) {
          operation = 'uppercase';
        } else if (node.type === 'text' && !['split', 'replace', 'substring', 'concat', 'includes', 'repeat'].includes(operation)) {
          operation = 'split';
        } else if (node.type === 'logic' && !['contains', 'equals', 'greater', 'less', 'startsWith', 'endsWith', 'isEmpty'].includes(operation)) {
          operation = 'contains';
        }
        
        return {
          ...node,
          data: {
            ...node.data,
            operation,
            onChange: (value) => updateNodeData(node.id, { value }),
            onOperationChange: (op) => updateNodeData(node.id, { operation: op }),
            onConditionChange: (condition) => updateNodeData(node.id, { condition }),
            onCompareValueChange: (compareValue) => updateNodeData(node.id, { compareValue }),
            onMathValueChange: (mathValue) => updateNodeData(node.id, { mathValue }),
            onTextParamChange: (textParam) => updateNodeData(node.id, { textParam }),
            onTextParam2Change: (textParam2) => updateNodeData(node.id, { textParam2 }),
            onDelayChange: (delay) => updateNodeData(node.id, { delay }),
            onSeparatorChange: (separator) => updateNodeData(node.id, { separator }),
            onRandomTypeChange: (randomType) => updateNodeData(node.id, { randomType }),
            onMinChange: (min) => updateNodeData(node.id, { min }),
            onMaxChange: (max) => updateNodeData(node.id, { max }),
            onNoteChange: (note) => updateNodeData(node.id, { note }),
          }
        };
      });
      setNodes(restoredNodes);
      setEdges(savedEdges);
      // Update nodeId counter
      const maxId = Math.max(...savedNodes.map(n => parseInt(n.id.replace('node_', '')) || 0), 0);
      nodeId = maxId + 1;
      toast.success('Önceki çalışma yüklendi!');
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      // Strip callbacks before saving
      const nodesToSave = nodes.map(node => ({
        ...node,
        data: {
          value: node.data.value,
          operation: node.data.operation,
          condition: node.data.condition,
          compareValue: node.data.compareValue,
          output: node.data.output,
          result: node.data.result,
          mathValue: node.data.mathValue,
          textParam: node.data.textParam,
          textParam2: node.data.textParam2,
          delay: node.data.delay,
          separator: node.data.separator,
          randomType: node.data.randomType,
          min: node.data.min,
          max: node.data.max,
          note: node.data.note,
        }
      }));
      saveToLocalStorage(nodesToSave, edges);
    }
  }, [nodes, edges]);

  const updateNodeData = useCallback((nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...newData },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({
      ...params,
      animated: true,
      style: { stroke: '#6366f1', strokeWidth: 2 },
    }, eds));
    toast.success('Bağlantı oluşturuldu!', { duration: 1500 });
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowInstance.current) return;

    const position = reactFlowInstance.current.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNodeId = getNodeId();
    
    // Set default operation based on node type
    const defaultOperations = {
      function: 'uppercase',
      math: 'add',
      logic: 'contains',
      text: 'split',
      date: 'now',
      json: 'parse',
      array: 'length',
      api: 'get'
    };
    const defaultOperation = defaultOperations[type] || 'uppercase';
    
    const newNode = {
      id: newNodeId,
      type,
      position,
      data: {
        value: '',
        operation: defaultOperation,
        condition: 'contains',
        compareValue: '',
        mathValue: '',
        textParam: '',
        textParam2: '',
        delay: 1000,
        separator: ', ',
        randomType: 'number',
        min: 0,
        max: 100,
        note: '',
        onChange: (value) => updateNodeData(newNodeId, { value }),
        onOperationChange: (operation) => updateNodeData(newNodeId, { operation }),
        onConditionChange: (condition) => updateNodeData(newNodeId, { condition }),
        onCompareValueChange: (compareValue) => updateNodeData(newNodeId, { compareValue }),
        onMathValueChange: (mathValue) => updateNodeData(newNodeId, { mathValue }),
        onTextParamChange: (textParam) => updateNodeData(newNodeId, { textParam }),
        onTextParam2Change: (textParam2) => updateNodeData(newNodeId, { textParam2 }),
        onDelayChange: (delay) => updateNodeData(newNodeId, { delay }),
        onSeparatorChange: (separator) => updateNodeData(newNodeId, { separator }),
        onRandomTypeChange: (randomType) => updateNodeData(newNodeId, { randomType }),
        onMinChange: (min) => updateNodeData(newNodeId, { min }),
        onMaxChange: (max) => updateNodeData(newNodeId, { max }),
        onNoteChange: (note) => updateNodeData(newNodeId, { note }),
      },
    };

    setNodes((nds) => nds.concat(newNode));
    
    const typeNames = {
      input: 'Giriş',
      function: 'Fonksiyon',
      logic: 'Mantık',
      output: 'Çıkış',
      math: 'Matematik',
      text: 'Metin',
      delay: 'Gecikme',
      merge: 'Birleştir',
      random: 'Rastgele',
      note: 'Not',
      date: 'Tarih',
      json: 'JSON',
      array: 'Dizi',
      api: 'API'
    };
    toast.success(`${typeNames[type] || type} bloğu eklendi!`, { duration: 1500 });
  }, [setNodes, updateNodeData]);

  const onNodesDelete = useCallback((deleted) => {
    toast(`${deleted.length} blok silindi`, { icon: '🗑️', duration: 1500 });
  }, []);

  const onEdgesDelete = useCallback((deleted) => {
    toast(`${deleted.length} bağlantı silindi`, { icon: '🔗', duration: 1500 });
  }, []);

  const runFlow = useCallback(() => {
    // ÖNCE hesapla, SONRA state güncelle
    const currentNodes = [...nodes];
    const currentEdges = [...edges];
    const processedOutputs = new Map();
    const processed = new Set();
    
    // Helper to get input value from source
    const getSourceValue = (nodeId) => {
      const inputEdge = currentEdges.find(e => e.target === nodeId);
      if (!inputEdge) return '';
      if (processedOutputs.has(inputEdge.source)) {
        return processedOutputs.get(inputEdge.source);
      }
      const sourceNode = currentNodes.find(n => n.id === inputEdge.source);
      if (!sourceNode) return '';
      return sourceNode.data.value ?? sourceNode.data.output ?? sourceNode.data.result ?? '';
    };
    
    // Check if all inputs are ready
    const allInputsReady = (nodeId) => {
      const inputEdges = currentEdges.filter(e => e.target === nodeId);
      return inputEdges.every(e => {
        const sourceNode = currentNodes.find(n => n.id === e.source);
        if (!sourceNode) return true;
        if (sourceNode.type === 'input' || sourceNode.type === 'random') return true;
        return processedOutputs.has(e.source);
      });
    };
    
    // First pass: Input and Random nodes
    for (const node of currentNodes) {
      if (node.type === 'input') {
          processedOutputs.set(node.id, node.data.value ?? '');
        processed.add(node.id);
      } else if (node.type === 'random') {
        const randomType = node.data.randomType || 'number';
        const min = parseFloat(node.data.min) || 0;
        const max = parseFloat(node.data.max) || 100;
        let output;
        
        switch (randomType) {
          case 'number':
            output = Math.floor(Math.random() * (max - min + 1)) + min;
            break;
          case 'uuid':
            output = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
              const r = Math.random() * 16 | 0;
              return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            break;
          case 'boolean':
            output = Math.random() > 0.5;
            break;
          case 'pick':
            const items = (node.data.textParam || '').split(',').map(s => s.trim()).filter(Boolean);
            output = items[Math.floor(Math.random() * items.length)] || '';
            break;
          default:
            output = Math.random();
        }
        processedOutputs.set(node.id, output);
        processed.add(node.id);
      }
    }
    
    // Multiple passes for dependent nodes
    let iterations = 0;
    const maxIterations = currentNodes.length * 2;
    
    while (processed.size < currentNodes.length && iterations < maxIterations) {
      iterations++;
      
      for (const node of currentNodes) {
        if (processed.has(node.id)) continue;
        if (!allInputsReady(node.id)) continue;
        
        if (node.type === 'function') {
          const inputValue = getSourceValue(node.id);
          const op = node.data.operation || 'uppercase';
          let output = inputValue;
          
          switch (op) {
            case 'uppercase': output = String(inputValue).toUpperCase(); break;
            case 'lowercase': output = String(inputValue).toLowerCase(); break;
            case 'reverse': output = String(inputValue).split('').reverse().join(''); break;
            case 'length': output = String(inputValue).length; break;
            case 'trim': output = String(inputValue).trim(); break;
            case 'double': output = (parseFloat(inputValue) || 0) * 2; break;
          }
          processedOutputs.set(node.id, output);
        } else if (node.type === 'math') {
          const inputValue = getSourceValue(node.id);
          const num = parseFloat(inputValue) || 0;
          const mathValue = parseFloat(node.data.mathValue) || 0;
          const op = node.data.operation || 'add';
          let output = num;
          
          switch (op) {
            case 'add': output = num + mathValue; break;
            case 'subtract': output = num - mathValue; break;
            case 'multiply': output = num * mathValue; break;
            case 'divide': output = mathValue !== 0 ? num / mathValue : 'Hata'; break;
            case 'power': output = Math.pow(num, mathValue); break;
            case 'sqrt': output = Math.sqrt(num); break;
            case 'abs': output = Math.abs(num); break;
            case 'round': output = Math.round(num); break;
          }
          processedOutputs.set(node.id, output);
        } else if (node.type === 'text') {
          const inputValue = getSourceValue(node.id);
          const param = node.data.textParam || '';
          const param2 = node.data.textParam2 || '';
          const op = node.data.operation || 'split';
          let output = inputValue;
          
          switch (op) {
            case 'split': output = JSON.stringify(String(inputValue).split(param)); break;
            case 'join': output = String(inputValue).split(',').join(param); break;
            case 'replace': output = String(inputValue).replace(new RegExp(param, 'g'), param2); break;
            case 'substring': output = String(inputValue).substring(parseInt(param) || 0, parseInt(param2) || undefined); break;
            case 'repeat': output = String(inputValue).repeat(parseInt(param) || 1); break;
            case 'padStart': output = String(inputValue).padStart(parseInt(param) || 0, param2 || ' '); break;
            case 'slice': output = String(inputValue).slice(parseInt(param) || 0, parseInt(param2) || undefined); break;
            case 'charAt': output = String(inputValue).charAt(parseInt(param) || 0); break;
          }
          processedOutputs.set(node.id, output);
        } else if (node.type === 'logic') {
          const inputValue = getSourceValue(node.id);
          const condition = node.data.condition || 'contains';
          const compareValue = node.data.compareValue || '';
          let result = false;
          
          switch (condition) {
            case 'contains': result = String(inputValue).includes(compareValue); break;
            case 'startsWith': result = String(inputValue).startsWith(compareValue); break;
            case 'endsWith': result = String(inputValue).endsWith(compareValue); break;
            case 'equals': result = String(inputValue) === compareValue; break;
            case 'notEmpty': result = String(inputValue).length > 0; break;
            case 'isNumber': result = !isNaN(inputValue) && inputValue !== ''; break;
          }
          processedOutputs.set(node.id, result);
        } else if (node.type === 'merge') {
          const inputEdges = currentEdges.filter(e => e.target === node.id);
          const values = inputEdges.map(edge => processedOutputs.get(edge.source) ?? '');
          const separator = node.data.separator || ', ';
          processedOutputs.set(node.id, values.join(separator));
        } else if (node.type === 'delay') {
          const inputValue = getSourceValue(node.id);
          processedOutputs.set(node.id, inputValue);
        } else if (node.type === 'output') {
          const inputValue = getSourceValue(node.id);
          processedOutputs.set(node.id, inputValue);
        } else if (node.type === 'note') {
          processedOutputs.set(node.id, '');
        } else if (node.type === 'date') {
          const inputValue = getSourceValue(node.id);
          const op = node.data.operation || 'now';
          const param = node.data.textParam || '';
          const now = new Date();
          let output = '';
          
          const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
          
          switch (op) {
            case 'now':
              output = now.toLocaleString('tr-TR');
              break;
            case 'date':
              output = now.toLocaleDateString('tr-TR');
              break;
            case 'time':
              output = now.toLocaleTimeString('tr-TR');
              break;
            case 'timestamp':
              output = now.getTime();
              break;
            case 'dayOfWeek':
              output = days[now.getDay()];
              break;
            case 'format':
              output = param
                .replace('YYYY', now.getFullYear())
                .replace('MM', String(now.getMonth() + 1).padStart(2, '0'))
                .replace('DD', String(now.getDate()).padStart(2, '0'))
                .replace('HH', String(now.getHours()).padStart(2, '0'))
                .replace('mm', String(now.getMinutes()).padStart(2, '0'))
                .replace('ss', String(now.getSeconds()).padStart(2, '0'));
              break;
            case 'addDays':
              const addDate = new Date(inputValue || now);
              addDate.setDate(addDate.getDate() + (parseInt(param) || 0));
              output = addDate.toLocaleDateString('tr-TR');
              break;
            case 'diff':
              const date1 = new Date(inputValue || now);
              const date2 = new Date(param || now);
              const diffTime = Math.abs(date2 - date1);
              output = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              break;
            default:
              output = now.toLocaleString('tr-TR');
          }
          processedOutputs.set(node.id, output);
        } else if (node.type === 'json') {
          const inputValue = getSourceValue(node.id);
          const op = node.data.operation || 'parse';
          const key = node.data.textParam || '';
          const setValue = node.data.textParam2 || '';
          let output = inputValue;
          
          try {
            switch (op) {
              case 'parse':
                output = JSON.parse(inputValue);
                break;
              case 'stringify':
                output = JSON.stringify(typeof inputValue === 'object' ? inputValue : JSON.parse(inputValue), null, 0);
                break;
              case 'get':
                const obj = typeof inputValue === 'object' ? inputValue : JSON.parse(inputValue);
                output = key.split('.').reduce((o, k) => o?.[k], obj) ?? '';
                break;
              case 'set':
                const objSet = typeof inputValue === 'object' ? { ...inputValue } : JSON.parse(inputValue);
                const keys = key.split('.');
                let current = objSet;
                for (let i = 0; i < keys.length - 1; i++) {
                  current = current[keys[i]] = current[keys[i]] || {};
                }
                current[keys[keys.length - 1]] = setValue;
                output = JSON.stringify(objSet);
                break;
              case 'keys':
                const objKeys = typeof inputValue === 'object' ? inputValue : JSON.parse(inputValue);
                output = JSON.stringify(Object.keys(objKeys));
                break;
              case 'values':
                const objValues = typeof inputValue === 'object' ? inputValue : JSON.parse(inputValue);
                output = JSON.stringify(Object.values(objValues));
                break;
              case 'has':
                const objHas = typeof inputValue === 'object' ? inputValue : JSON.parse(inputValue);
                output = key.split('.').reduce((o, k) => o?.[k], objHas) !== undefined;
                break;
              case 'prettify':
                output = JSON.stringify(typeof inputValue === 'object' ? inputValue : JSON.parse(inputValue), null, 2);
                break;
            }
          } catch (e) {
            output = 'Hata: Geçersiz JSON';
          }
          processedOutputs.set(node.id, output);
        } else if (node.type === 'array') {
          const inputValue = getSourceValue(node.id);
          const op = node.data.operation || 'length';
          const param = node.data.textParam || '';
          let arr = [];
          let output = '';
          
          try {
            arr = typeof inputValue === 'object' && Array.isArray(inputValue) 
              ? inputValue 
              : JSON.parse(inputValue);
            if (!Array.isArray(arr)) arr = [arr];
          } catch {
            arr = String(inputValue).split(',').map(s => s.trim());
          }
          
          switch (op) {
            case 'length': output = arr.length; break;
            case 'first': output = arr[0] ?? ''; break;
            case 'last': output = arr[arr.length - 1] ?? ''; break;
            case 'get': output = arr[parseInt(param) || 0] ?? ''; break;
            case 'push': output = JSON.stringify([...arr, param]); break;
            case 'pop': output = JSON.stringify(arr.slice(0, -1)); break;
            case 'shift': output = JSON.stringify(arr.slice(1)); break;
            case 'reverse': output = JSON.stringify([...arr].reverse()); break;
            case 'sort': output = JSON.stringify([...arr].sort()); break;
            case 'unique': output = JSON.stringify([...new Set(arr)]); break;
            case 'sum': output = arr.reduce((a, b) => a + (parseFloat(b) || 0), 0); break;
            case 'avg': output = arr.length > 0 ? arr.reduce((a, b) => a + (parseFloat(b) || 0), 0) / arr.length : 0; break;
            case 'min': output = Math.min(...arr.map(Number).filter(n => !isNaN(n))); break;
            case 'max': output = Math.max(...arr.map(Number).filter(n => !isNaN(n))); break;
            case 'join': output = arr.join(param || ', '); break;
            case 'filter': output = JSON.stringify(arr.filter(Boolean)); break;
            default: output = JSON.stringify(arr);
          }
          processedOutputs.set(node.id, output);
        } else if (node.type === 'api') {
          const inputValue = getSourceValue(node.id);
          const op = node.data.operation || 'get';
          const url = node.data.textParam || '';
          let output = '';
          
          // Mock responses (simülasyon - gerçek API çağrısı yok)
          switch (op) {
            case 'get':
            case 'post':
            case 'put':
            case 'delete':
              output = JSON.stringify({ method: op.toUpperCase(), url, status: 200, body: inputValue || null });
              break;
            case 'mock-user':
              output = JSON.stringify({
                id: Math.floor(Math.random() * 1000),
                name: 'Ahmet Yılmaz',
                email: 'ahmet@example.com',
                age: 28
              });
              break;
            case 'mock-product':
              output = JSON.stringify({
                id: Math.floor(Math.random() * 1000),
                name: 'Laptop',
                price: 15999.99,
                stock: 42
              });
              break;
            case 'mock-list':
              output = JSON.stringify([
                { id: 1, item: 'Kalem' },
                { id: 2, item: 'Defter' },
                { id: 3, item: 'Silgi' }
              ]);
              break;
            default:
              output = JSON.stringify({ error: 'Bilinmeyen işlem' });
          }
          processedOutputs.set(node.id, output);
        }
        
        processed.add(node.id);
      }
    }
    
    // Get output result BEFORE setState
    const outputNode = currentNodes.find(n => n.type === 'output');
    const finalResult = outputNode ? processedOutputs.get(outputNode.id) : undefined;
    
    // Now update state with calculated values
    setNodes((nds) => 
      nds.map(node => {
        const newData = { ...node.data };
        if (processedOutputs.has(node.id)) {
          if (node.type === 'output') {
            newData.value = processedOutputs.get(node.id);
          } else if (node.type === 'logic') {
            newData.result = processedOutputs.get(node.id);
          } else {
            newData.output = processedOutputs.get(node.id);
          }
        }
        return { ...node, data: newData };
      })
    );
    
    // Return the calculated result directly
    return finalResult;
  }, [nodes, edges, setNodes]);

  // Export flow to JSON
  const exportFlow = useCallback(() => {
    const nodesToExport = nodes.map(node => ({
      ...node,
      data: {
        value: node.data.value,
        operation: node.data.operation,
        condition: node.data.condition,
        compareValue: node.data.compareValue,
        mathValue: node.data.mathValue,
        textParam: node.data.textParam,
        textParam2: node.data.textParam2,
        delay: node.data.delay,
        separator: node.data.separator,
        randomType: node.data.randomType,
        min: node.data.min,
        max: node.data.max,
        note: node.data.note,
      }
    }));
    const exportData = { nodes: nodesToExport, edges, exportedAt: new Date().toISOString() };
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logic-flow-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Akış dışa aktarıldı!');
  }, [nodes, edges]);

  // Import flow from JSON
  const importFlow = useCallback((jsonData) => {
    try {
      const { nodes: importedNodes, edges: importedEdges } = JSON.parse(jsonData);
      
      // Restore callbacks
      const restoredNodes = importedNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onChange: (value) => updateNodeData(node.id, { value }),
          onOperationChange: (operation) => updateNodeData(node.id, { operation }),
          onConditionChange: (condition) => updateNodeData(node.id, { condition }),
          onCompareValueChange: (compareValue) => updateNodeData(node.id, { compareValue }),
          onMathValueChange: (mathValue) => updateNodeData(node.id, { mathValue }),
          onTextParamChange: (textParam) => updateNodeData(node.id, { textParam }),
          onTextParam2Change: (textParam2) => updateNodeData(node.id, { textParam2 }),
          onDelayChange: (delay) => updateNodeData(node.id, { delay }),
          onSeparatorChange: (separator) => updateNodeData(node.id, { separator }),
          onRandomTypeChange: (randomType) => updateNodeData(node.id, { randomType }),
          onMinChange: (min) => updateNodeData(node.id, { min }),
          onMaxChange: (max) => updateNodeData(node.id, { max }),
          onNoteChange: (note) => updateNodeData(node.id, { note }),
        }
      }));
      
      setNodes(restoredNodes);
      setEdges(importedEdges);
      
      // Update nodeId counter
      const maxId = Math.max(...importedNodes.map(n => parseInt(n.id.replace('node_', '')) || 0), 0);
      nodeId = maxId + 1;
      
      toast.success('Akış içe aktarıldı!');
    } catch (error) {
      toast.error('Dosya okunamadı!');
    }
  }, [setNodes, setEdges, updateNodeData]);

  // Clear all
  const clearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
    toast.success('Tüm akış temizlendi!');
  }, [setNodes, setEdges]);

  // Save state to history on changes
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      const nodesToSave = nodes.map(node => ({
        ...node,
        data: {
          value: node.data.value,
          operation: node.data.operation,
          condition: node.data.condition,
          compareValue: node.data.compareValue,
          output: node.data.output,
          result: node.data.result,
          mathValue: node.data.mathValue,
          textParam: node.data.textParam,
          textParam2: node.data.textParam2,
          delay: node.data.delay,
          separator: node.data.separator,
          randomType: node.data.randomType,
          min: node.data.min,
          max: node.data.max,
          note: node.data.note,
        }
      }));
      saveState(nodesToSave, edges);
    }
  }, [nodes, edges, saveState]);

  // Undo function
  const undo = useCallback(() => {
    const state = undoState();
    if (state) {
      const restoredNodes = state.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onChange: (value) => updateNodeData(node.id, { value }),
          onOperationChange: (operation) => updateNodeData(node.id, { operation }),
          onConditionChange: (condition) => updateNodeData(node.id, { condition }),
          onCompareValueChange: (compareValue) => updateNodeData(node.id, { compareValue }),
          onMathValueChange: (mathValue) => updateNodeData(node.id, { mathValue }),
          onTextParamChange: (textParam) => updateNodeData(node.id, { textParam }),
          onTextParam2Change: (textParam2) => updateNodeData(node.id, { textParam2 }),
          onDelayChange: (delay) => updateNodeData(node.id, { delay }),
          onSeparatorChange: (separator) => updateNodeData(node.id, { separator }),
          onRandomTypeChange: (randomType) => updateNodeData(node.id, { randomType }),
          onMinChange: (min) => updateNodeData(node.id, { min }),
          onMaxChange: (max) => updateNodeData(node.id, { max }),
          onNoteChange: (note) => updateNodeData(node.id, { note }),
        }
      }));
      setNodes(restoredNodes);
      setEdges(state.edges);
      toast('Geri alındı', { icon: '↩️', duration: 1000 });
    }
  }, [undoState, setNodes, setEdges, updateNodeData]);

  // Redo function
  const redo = useCallback(() => {
    const state = redoState();
    if (state) {
      const restoredNodes = state.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onChange: (value) => updateNodeData(node.id, { value }),
          onOperationChange: (operation) => updateNodeData(node.id, { operation }),
          onConditionChange: (condition) => updateNodeData(node.id, { condition }),
          onCompareValueChange: (compareValue) => updateNodeData(node.id, { compareValue }),
          onMathValueChange: (mathValue) => updateNodeData(node.id, { mathValue }),
          onTextParamChange: (textParam) => updateNodeData(node.id, { textParam }),
          onTextParam2Change: (textParam2) => updateNodeData(node.id, { textParam2 }),
          onDelayChange: (delay) => updateNodeData(node.id, { delay }),
          onSeparatorChange: (separator) => updateNodeData(node.id, { separator }),
          onRandomTypeChange: (randomType) => updateNodeData(node.id, { randomType }),
          onMinChange: (min) => updateNodeData(node.id, { min }),
          onMaxChange: (max) => updateNodeData(node.id, { max }),
          onNoteChange: (note) => updateNodeData(node.id, { note }),
        }
      }));
      setNodes(restoredNodes);
      setEdges(state.edges);
      toast('Yinelendi', { icon: '↪️', duration: 1000 });
    }
  }, [redoState, setNodes, setEdges, updateNodeData]);

  // Load template
  const loadTemplate = useCallback((template) => {
    const restoredNodes = template.nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onChange: (value) => updateNodeData(node.id, { value }),
        onOperationChange: (operation) => updateNodeData(node.id, { operation }),
        onConditionChange: (condition) => updateNodeData(node.id, { condition }),
        onCompareValueChange: (compareValue) => updateNodeData(node.id, { compareValue }),
        onMathValueChange: (mathValue) => updateNodeData(node.id, { mathValue }),
        onTextParamChange: (textParam) => updateNodeData(node.id, { textParam }),
        onTextParam2Change: (textParam2) => updateNodeData(node.id, { textParam2 }),
        onDelayChange: (delay) => updateNodeData(node.id, { delay }),
        onSeparatorChange: (separator) => updateNodeData(node.id, { separator }),
        onRandomTypeChange: (randomType) => updateNodeData(node.id, { randomType }),
        onMinChange: (min) => updateNodeData(node.id, { min }),
        onMaxChange: (max) => updateNodeData(node.id, { max }),
        onNoteChange: (note) => updateNodeData(node.id, { note }),
      }
    }));
    
    const restoredEdges = template.edges.map(edge => ({
      ...edge,
      style: { stroke: '#6366f1', strokeWidth: 2 },
    }));
    
    setNodes(restoredNodes);
    setEdges(restoredEdges);
    
    // Update nodeId counter
    const maxId = Math.max(...template.nodes.map(n => parseInt(n.id.replace('node_', '')) || 0), 0);
    nodeId = maxId + 1;
  }, [setNodes, setEdges, updateNodeData]);

  return {
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
  };
}
