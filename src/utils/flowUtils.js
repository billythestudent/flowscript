// Generate JavaScript code from nodes and edges
export function generateCode(nodes, edges) {
  if (nodes.length === 0) {
    return '// Akış boş, blok ekleyin';
  }

  let code = '// Logic Flow Builder - Üretilen Kod\n\n';
  
  // Find all node types
  const inputNodes = nodes.filter(n => n.type === 'input');
  const functionNodes = nodes.filter(n => n.type === 'function');
  const mathNodes = nodes.filter(n => n.type === 'math');
  const textNodes = nodes.filter(n => n.type === 'text');
  const logicNodes = nodes.filter(n => n.type === 'logic');
  const randomNodes = nodes.filter(n => n.type === 'random');
  const mergeNodes = nodes.filter(n => n.type === 'merge');
  const delayNodes = nodes.filter(n => n.type === 'delay');
  const outputNodes = nodes.filter(n => n.type === 'output');

  // Helper to get variable name for a node
  const getVarName = (node) => {
    if (!node) return '"undefined"';
    switch (node.type) {
      case 'input': return `input${inputNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'function': return `funcResult${functionNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'math': return `mathResult${mathNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'text': return `textResult${textNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'logic': return `condition${logicNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'random': return `random${randomNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'merge': return `merged${mergeNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'delay': return `delayed${delayNodes.findIndex(n => n.id === node.id) + 1}`;
      default: return '"unknown"';
    }
  };

  const getSourceVar = (nodeId) => {
    const inputEdge = edges.find(e => e.target === nodeId);
    if (!inputEdge) return '"no_input"';
    const sourceNode = nodes.find(n => n.id === inputEdge.source);
    return getVarName(sourceNode);
  };

  // Generate input variables
  if (inputNodes.length > 0) {
    code += '// Giriş Değerleri\n';
    inputNodes.forEach((node, i) => {
      const value = node.data.value || '';
      code += `const input${i + 1} = "${value}";\n`;
    });
    code += '\n';
  }

  // Generate random values
  if (randomNodes.length > 0) {
    code += '// Rastgele Değerler\n';
    randomNodes.forEach((node, i) => {
      const type = node.data.randomType || 'number';
      const min = node.data.min || 0;
      const max = node.data.max || 100;
      let randomCode = '';
      switch (type) {
        case 'number':
          randomCode = `Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min}`;
          break;
        case 'uuid':
          randomCode = `crypto.randomUUID()`;
          break;
        case 'boolean':
          randomCode = `Math.random() > 0.5`;
          break;
        default:
          randomCode = `Math.random()`;
      }
      code += `const random${i + 1} = ${randomCode};\n`;
    });
    code += '\n';
  }

  // Generate function calls
  if (functionNodes.length > 0) {
    code += '// Fonksiyonlar\n';
    functionNodes.forEach((node, i) => {
      const op = node.data.operation || 'uppercase';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'uppercase': operation = `String(${inputVar}).toUpperCase()`; break;
        case 'lowercase': operation = `String(${inputVar}).toLowerCase()`; break;
        case 'reverse': operation = `String(${inputVar}).split('').reverse().join('')`; break;
        case 'length': operation = `String(${inputVar}).length`; break;
        case 'trim': operation = `String(${inputVar}).trim()`; break;
        case 'double': operation = `${inputVar} + ${inputVar}`; break;
        default: operation = inputVar;
      }
      
      code += `const funcResult${i + 1} = ${operation};\n`;
    });
    code += '\n';
  }

  // Generate math operations
  if (mathNodes.length > 0) {
    code += '// Matematik İşlemleri\n';
    mathNodes.forEach((node, i) => {
      const op = node.data.operation || 'add';
      const mathValue = node.data.mathValue || 0;
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'add': operation = `Number(${inputVar}) + ${mathValue}`; break;
        case 'subtract': operation = `Number(${inputVar}) - ${mathValue}`; break;
        case 'multiply': operation = `Number(${inputVar}) * ${mathValue}`; break;
        case 'divide': operation = `Number(${inputVar}) / ${mathValue}`; break;
        case 'power': operation = `Math.pow(Number(${inputVar}), ${mathValue})`; break;
        case 'sqrt': operation = `Math.sqrt(Number(${inputVar}))`; break;
        case 'abs': operation = `Math.abs(Number(${inputVar}))`; break;
        case 'round': operation = `Math.round(Number(${inputVar}))`; break;
        default: operation = inputVar;
      }
      
      code += `const mathResult${i + 1} = ${operation};\n`;
    });
    code += '\n';
  }

  // Generate text operations
  if (textNodes.length > 0) {
    code += '// Metin İşlemleri\n';
    textNodes.forEach((node, i) => {
      const op = node.data.operation || 'split';
      const param = node.data.textParam || '';
      const param2 = node.data.textParam2 || '';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'split': operation = `String(${inputVar}).split("${param}")`; break;
        case 'join': operation = `String(${inputVar}).split(',').join("${param}")`; break;
        case 'replace': operation = `String(${inputVar}).replace(/${param}/g, "${param2}")`; break;
        case 'substring': operation = `String(${inputVar}).substring(${param || 0}, ${param2 || 'undefined'})`; break;
        case 'repeat': operation = `String(${inputVar}).repeat(${param || 1})`; break;
        case 'slice': operation = `String(${inputVar}).slice(${param || 0}, ${param2 || 'undefined'})`; break;
        case 'charAt': operation = `String(${inputVar}).charAt(${param || 0})`; break;
        default: operation = inputVar;
      }
      
      code += `const textResult${i + 1} = ${operation};\n`;
    });
    code += '\n';
  }

  // Generate merge operations
  if (mergeNodes.length > 0) {
    code += '// Birleştirme\n';
    mergeNodes.forEach((node, i) => {
      const separator = node.data.separator || ', ';
      const inputEdges = edges.filter(e => e.target === node.id);
      const sources = inputEdges.map(e => {
        const sourceNode = nodes.find(n => n.id === e.source);
        return getVarName(sourceNode);
      });
      code += `const merged${i + 1} = [${sources.join(', ')}].join("${separator}");\n`;
    });
    code += '\n';
  }

  // Generate delay operations
  if (delayNodes.length > 0) {
    code += '// Gecikme (async)\n';
    delayNodes.forEach((node, i) => {
      const delay = node.data.delay || 1000;
      const inputVar = getSourceVar(node.id);
      code += `const delayed${i + 1} = await new Promise(r => setTimeout(() => r(${inputVar}), ${delay}));\n`;
    });
    code += '\n';
  }

  // Generate logic checks
  if (logicNodes.length > 0) {
    code += '// Mantık Kontrolleri\n';
    logicNodes.forEach((node, i) => {
      const condition = node.data.condition || 'contains';
      const compareValue = node.data.compareValue || '';
      const inputVar = getSourceVar(node.id);
      
      let check = '';
      switch (condition) {
        case 'contains': check = `String(${inputVar}).includes("${compareValue}")`; break;
        case 'startsWith': check = `String(${inputVar}).startsWith("${compareValue}")`; break;
        case 'endsWith': check = `String(${inputVar}).endsWith("${compareValue}")`; break;
        case 'equals': check = `${inputVar} === "${compareValue}"`; break;
        case 'notEmpty': check = `String(${inputVar}).length > 0`; break;
        case 'isNumber': check = `!isNaN(${inputVar})`; break;
        default: check = 'true';
      }
      
      code += `const condition${i + 1} = ${check};\n`;
    });
    code += '\n';
  }

  // Generate output
  if (outputNodes.length > 0) {
    code += '// Çıkış\n';
    outputNodes.forEach((node, i) => {
      const outputVar = getSourceVar(node.id);
      code += `console.log("Çıkış ${i + 1}:", ${outputVar});\n`;
    });
  }

  return code;
}

// Execute the flow and return result
export function executeFlow(nodes, edges) {
  const nodeValues = new Map();
  
  // Initialize input values
  nodes.filter(n => n.type === 'input').forEach(node => {
    nodeValues.set(node.id, node.data.value || '');
  });
  
  // Process in order (simple topological sort based on edges)
  const processed = new Set();
  let iterations = 0;
  const maxIterations = nodes.length * 2;
  
  while (processed.size < nodes.length && iterations < maxIterations) {
    iterations++;
    
    for (const node of nodes) {
      if (processed.has(node.id)) continue;
      
      // Check if all inputs are ready
      const inputEdges = edges.filter(e => e.target === node.id);
      const allInputsReady = inputEdges.every(e => nodeValues.has(e.source));
      
      if (node.type === 'input' || allInputsReady) {
        if (node.type === 'input') {
          // Already initialized
        } else if (node.type === 'function') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? String(nodeValues.get(inputEdge.source) || '') : '';
          const op = node.data.operation || 'uppercase';
          
          let result = inputValue;
          switch (op) {
            case 'uppercase':
              result = inputValue.toUpperCase();
              break;
            case 'lowercase':
              result = inputValue.toLowerCase();
              break;
            case 'reverse':
              result = inputValue.split('').reverse().join('');
              break;
            case 'length':
              result = inputValue.length;
              break;
            case 'trim':
              result = inputValue.trim();
              break;
            case 'double':
              result = inputValue + inputValue;
              break;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'logic') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? String(nodeValues.get(inputEdge.source) || '') : '';
          const condition = node.data.condition || 'contains';
          const compareValue = node.data.compareValue || '';
          
          let result = false;
          switch (condition) {
            case 'contains':
              result = inputValue.includes(compareValue);
              break;
            case 'startsWith':
              result = inputValue.startsWith(compareValue);
              break;
            case 'endsWith':
              result = inputValue.endsWith(compareValue);
              break;
            case 'equals':
              result = inputValue === compareValue;
              break;
            case 'notEmpty':
              result = inputValue.length > 0;
              break;
            case 'isNumber':
              result = !isNaN(inputValue) && inputValue !== '';
              break;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'math') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? Number(nodeValues.get(inputEdge.source)) || 0 : 0;
          const op = node.data.operation || 'add';
          const mathValue = Number(node.data.mathValue) || 0;
          
          let result = inputValue;
          switch (op) {
            case 'add':
              result = inputValue + mathValue;
              break;
            case 'subtract':
              result = inputValue - mathValue;
              break;
            case 'multiply':
              result = inputValue * mathValue;
              break;
            case 'divide':
              result = mathValue !== 0 ? inputValue / mathValue : 0;
              break;
            case 'power':
              result = Math.pow(inputValue, mathValue);
              break;
            case 'sqrt':
              result = Math.sqrt(inputValue);
              break;
            case 'abs':
              result = Math.abs(inputValue);
              break;
            case 'round':
              result = Math.round(inputValue);
              break;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'text') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? String(nodeValues.get(inputEdge.source) || '') : '';
          const op = node.data.operation || 'split';
          const param = node.data.textParam || '';
          const param2 = node.data.textParam2 || '';
          
          let result = inputValue;
          switch (op) {
            case 'split':
              result = inputValue.split(param);
              break;
            case 'join':
              result = inputValue.split(',').join(param);
              break;
            case 'replace':
              result = inputValue.replace(new RegExp(param, 'g'), param2);
              break;
            case 'substring':
              result = inputValue.substring(Number(param) || 0, param2 ? Number(param2) : undefined);
              break;
            case 'repeat':
              result = inputValue.repeat(Number(param) || 1);
              break;
            case 'slice':
              result = inputValue.slice(Number(param) || 0, param2 ? Number(param2) : undefined);
              break;
            case 'charAt':
              result = inputValue.charAt(Number(param) || 0);
              break;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'random') {
          const type = node.data.randomType || 'number';
          const min = Number(node.data.min) || 0;
          const max = Number(node.data.max) || 100;
          
          let result;
          switch (type) {
            case 'number':
              result = Math.floor(Math.random() * (max - min + 1)) + min;
              break;
            case 'uuid':
              result = crypto.randomUUID();
              break;
            case 'boolean':
              result = Math.random() > 0.5;
              break;
            default:
              result = Math.random();
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'merge') {
          const separator = node.data.separator || ', ';
          const values = inputEdges.map(e => nodeValues.get(e.source));
          nodeValues.set(node.id, values.join(separator));
        } else if (node.type === 'delay') {
          // Delay is handled synchronously for now
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? nodeValues.get(inputEdge.source) : '';
          nodeValues.set(node.id, inputValue);
        } else if (node.type === 'output') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? nodeValues.get(inputEdge.source) : undefined;
          nodeValues.set(node.id, inputValue);
        }
        
        processed.add(node.id);
      }
    }
  }
  
  // Return output node values
  const outputNodes = nodes.filter(n => n.type === 'output');
  if (outputNodes.length > 0) {
    return nodeValues.get(outputNodes[0].id);
  }
  
  return undefined;
}
