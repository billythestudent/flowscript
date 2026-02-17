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
  const regexNodes = nodes.filter(n => n.type === 'regex');
  const fetchNodes = nodes.filter(n => n.type === 'fetch');
  const loopNodes = nodes.filter(n => n.type === 'loop');
  const conditionalNodes = nodes.filter(n => n.type === 'conditional');
  const storageNodes = nodes.filter(n => n.type === 'storage');
  const consoleNodes = nodes.filter(n => n.type === 'console');

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
      case 'regex': return `regexResult${regexNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'fetch': return `fetchResult${fetchNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'loop': return `loopResult${loopNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'conditional': return `condResult${conditionalNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'storage': return `storageResult${storageNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'console': return `consoleResult${consoleNodes.findIndex(n => n.id === node.id) + 1}`;
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

  // Generate regex operations
  if (regexNodes.length > 0) {
    code += '// RegEx İşlemleri\n';
    regexNodes.forEach((node, i) => {
      const op = node.data.operation || 'test';
      const pattern = node.data.pattern || '';
      const flags = node.data.flags || '';
      const replacement = node.data.replacement || '';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'test': operation = `/${pattern}/${flags}.test(String(${inputVar}))`; break;
        case 'match': operation = `String(${inputVar}).match(/${pattern}/${flags})`; break;
        case 'replace': operation = `String(${inputVar}).replace(/${pattern}/${flags}, "${replacement}")`; break;
        case 'split': operation = `String(${inputVar}).split(/${pattern}/${flags})`; break;
        case 'extract': operation = `(String(${inputVar}).match(/${pattern}/${flags}) || [])[0] || ""`; break;
        default: operation = inputVar;
      }
      
      code += `const regexResult${i + 1} = ${operation};\n`;
    });
    code += '\n';
  }

  // Generate fetch operations
  if (fetchNodes.length > 0) {
    code += '// HTTP İstekleri (async)\n';
    fetchNodes.forEach((node, i) => {
      const method = node.data.method || 'GET';
      const url = node.data.url || '';
      const body = node.data.body || '';
      const headers = node.data.headers || '{}';
      
      if (method === 'GET' || method === 'DELETE') {
        code += `const fetchResult${i + 1} = await fetch("${url}", {\n  method: "${method}",\n  headers: ${headers}\n}).then(r => r.json());\n`;
      } else {
        code += `const fetchResult${i + 1} = await fetch("${url}", {\n  method: "${method}",\n  headers: { "Content-Type": "application/json", ...${headers} },\n  body: JSON.stringify(${body || '{}'})\n}).then(r => r.json());\n`;
      }
    });
    code += '\n';
  }

  // Generate loop operations
  if (loopNodes.length > 0) {
    code += '// Döngü İşlemleri\n';
    loopNodes.forEach((node, i) => {
      const loopType = node.data.loopType || 'forEach';
      const expression = node.data.expression || 'x';
      const start = node.data.start || 0;
      const end = node.data.end || 10;
      const initialValue = node.data.initialValue || '0';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (loopType) {
        case 'forEach': operation = `(() => { const result = []; ${inputVar}.forEach(x => result.push(${expression})); return result; })()`; break;
        case 'map': operation = `${inputVar}.map(x => ${expression})`; break;
        case 'filter': operation = `${inputVar}.filter(x => ${expression})`; break;
        case 'reduce': operation = `${inputVar}.reduce((acc, x) => ${expression}, ${initialValue})`; break;
        case 'for': operation = `(() => { const result = []; for(let i = ${start}; i < ${end}; i++) result.push(i); return result; })()`; break;
        case 'times': operation = `Array.from({ length: ${end - start} }, (_, i) => i + ${start})`; break;
        default: operation = inputVar;
      }
      
      code += `const loopResult${i + 1} = ${operation};\n`;
    });
    code += '\n';
  }

  // Generate conditional operations
  if (conditionalNodes.length > 0) {
    code += '// Koşul (If-Else) İşlemleri\n';
    conditionalNodes.forEach((node, i) => {
      const operator = node.data.operator || 'equals';
      const compareValue = node.data.compareValue || '';
      const trueValue = node.data.trueValue || 'true';
      const falseValue = node.data.falseValue || 'false';
      const inputVar = getSourceVar(node.id);
      
      let condition = '';
      switch (operator) {
        case 'equals': condition = `${inputVar} === "${compareValue}"`; break;
        case 'notEquals': condition = `${inputVar} !== "${compareValue}"`; break;
        case 'greater': condition = `Number(${inputVar}) > ${compareValue}`; break;
        case 'greaterOrEqual': condition = `Number(${inputVar}) >= ${compareValue}`; break;
        case 'less': condition = `Number(${inputVar}) < ${compareValue}`; break;
        case 'lessOrEqual': condition = `Number(${inputVar}) <= ${compareValue}`; break;
        case 'contains': condition = `String(${inputVar}).includes("${compareValue}")`; break;
        case 'startsWith': condition = `String(${inputVar}).startsWith("${compareValue}")`; break;
        case 'endsWith': condition = `String(${inputVar}).endsWith("${compareValue}")`; break;
        case 'truthy': condition = `Boolean(${inputVar})`; break;
        case 'falsy': condition = `!Boolean(${inputVar})`; break;
        default: condition = 'true';
      }
      
      code += `const condResult${i + 1} = (${condition}) ? "${trueValue}" : "${falseValue}";\n`;
    });
    code += '\n';
  }

  // Generate storage operations
  if (storageNodes.length > 0) {
    code += '// Storage İşlemleri\n';
    storageNodes.forEach((node, i) => {
      const storageType = node.data.storageType === 'session' ? 'sessionStorage' : 'localStorage';
      const operation = node.data.operation || 'get';
      const key = node.data.key || '';
      const value = node.data.value || '';
      const inputVar = getSourceVar(node.id);
      
      let op = '';
      switch (operation) {
        case 'get': op = `${storageType}.getItem("${key}")`; break;
        case 'set': op = `(() => { ${storageType}.setItem("${key}", ${value || inputVar}); return ${value || inputVar}; })()`; break;
        case 'remove': op = `(() => { ${storageType}.removeItem("${key}"); return true; })()`; break;
        case 'clear': op = `(() => { ${storageType}.clear(); return true; })()`; break;
        case 'keys': op = `Object.keys(${storageType})`; break;
        case 'length': op = `${storageType}.length`; break;
        default: op = 'null';
      }
      
      code += `const storageResult${i + 1} = ${op};\n`;
    });
    code += '\n';
  }

  // Generate console operations
  if (consoleNodes.length > 0) {
    code += '// Console İşlemleri\n';
    consoleNodes.forEach((node, i) => {
      const logType = node.data.logType || 'log';
      const label = node.data.label || '';
      const inputVar = getSourceVar(node.id);
      
      let op = '';
      switch (logType) {
        case 'log': op = label ? `console.log("${label}", ${inputVar})` : `console.log(${inputVar})`; break;
        case 'info': op = label ? `console.info("${label}", ${inputVar})` : `console.info(${inputVar})`; break;
        case 'warn': op = label ? `console.warn("${label}", ${inputVar})` : `console.warn(${inputVar})`; break;
        case 'error': op = label ? `console.error("${label}", ${inputVar})` : `console.error(${inputVar})`; break;
        case 'table': op = `console.table(${inputVar})`; break;
        case 'group': op = `console.group("${label || 'Group'}")`; break;
        case 'time': op = `console.time("${label || 'Timer'}")`; break;
        case 'clear': op = `console.clear()`; break;
        default: op = `console.log(${inputVar})`;
      }
      
      code += `${op};\nconst consoleResult${i + 1} = ${inputVar};\n`;
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
        } else if (node.type === 'regex') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? String(nodeValues.get(inputEdge.source) || '') : '';
          const op = node.data.operation || 'test';
          const pattern = node.data.pattern || '';
          const flags = node.data.flags || '';
          const replacement = node.data.replacement || '';
          
          let result;
          try {
            const regex = new RegExp(pattern, flags);
            switch (op) {
              case 'test':
                result = regex.test(inputValue);
                break;
              case 'match':
                result = inputValue.match(regex);
                break;
              case 'replace':
                result = inputValue.replace(regex, replacement);
                break;
              case 'split':
                result = inputValue.split(regex);
                break;
              case 'extract':
                result = (inputValue.match(regex) || [])[0] || '';
                break;
              default:
                result = inputValue;
            }
          } catch (e) {
            result = `Error: ${e.message}`;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'fetch') {
          // Fetch is simulated synchronously for now
          const method = node.data.method || 'GET';
          const url = node.data.url || '';
          nodeValues.set(node.id, `[Fetch: ${method} ${url}]`);
        } else if (node.type === 'loop') {
          const inputEdge = inputEdges[0];
          let inputValue = inputEdge ? nodeValues.get(inputEdge.source) : [];
          const loopType = node.data.loopType || 'forEach';
          const expression = node.data.expression || 'x';
          const start = Number(node.data.start) || 0;
          const end = Number(node.data.end) || 10;
          const initialValue = node.data.initialValue || '0';
          
          // Try to parse as array if string
          if (typeof inputValue === 'string') {
            try {
              inputValue = JSON.parse(inputValue);
            } catch {
              inputValue = inputValue.split(',').map(s => s.trim());
            }
          }
          
          let result;
          try {
            const arr = Array.isArray(inputValue) ? inputValue : [inputValue];
            switch (loopType) {
              case 'forEach':
              case 'map':
                result = arr.map(x => {
                  try { return eval(expression); } catch { return x; }
                });
                break;
              case 'filter':
                result = arr.filter(x => {
                  try { return eval(expression); } catch { return true; }
                });
                break;
              case 'reduce':
                result = arr.reduce((acc, x) => {
                  try { return eval(expression); } catch { return acc; }
                }, eval(initialValue));
                break;
              case 'for':
              case 'times':
                result = Array.from({ length: end - start }, (_, i) => i + start);
                break;
              default:
                result = arr;
            }
          } catch (e) {
            result = `Error: ${e.message}`;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'conditional') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? nodeValues.get(inputEdge.source) : '';
          const operator = node.data.operator || 'equals';
          const compareValue = node.data.compareValue || '';
          const trueValue = node.data.trueValue || 'true';
          const falseValue = node.data.falseValue || 'false';
          
          let conditionResult = false;
          const numInput = Number(inputValue);
          const numCompare = Number(compareValue);
          
          switch (operator) {
            case 'equals':
              conditionResult = String(inputValue) === compareValue;
              break;
            case 'notEquals':
              conditionResult = String(inputValue) !== compareValue;
              break;
            case 'greater':
              conditionResult = numInput > numCompare;
              break;
            case 'greaterOrEqual':
              conditionResult = numInput >= numCompare;
              break;
            case 'less':
              conditionResult = numInput < numCompare;
              break;
            case 'lessOrEqual':
              conditionResult = numInput <= numCompare;
              break;
            case 'contains':
              conditionResult = String(inputValue).includes(compareValue);
              break;
            case 'startsWith':
              conditionResult = String(inputValue).startsWith(compareValue);
              break;
            case 'endsWith':
              conditionResult = String(inputValue).endsWith(compareValue);
              break;
            case 'truthy':
              conditionResult = Boolean(inputValue);
              break;
            case 'falsy':
              conditionResult = !Boolean(inputValue);
              break;
            default:
              conditionResult = false;
          }
          
          nodeValues.set(node.id, conditionResult ? trueValue : falseValue);
        } else if (node.type === 'storage') {
          const storageType = node.data.storageType === 'session' ? sessionStorage : localStorage;
          const operation = node.data.operation || 'get';
          const key = node.data.key || '';
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? nodeValues.get(inputEdge.source) : node.data.value || '';
          
          let result;
          try {
            switch (operation) {
              case 'get':
                result = storageType.getItem(key);
                break;
              case 'set':
                storageType.setItem(key, String(inputValue));
                result = inputValue;
                break;
              case 'remove':
                storageType.removeItem(key);
                result = true;
                break;
              case 'clear':
                storageType.clear();
                result = true;
                break;
              case 'keys':
                result = Object.keys(storageType);
                break;
              case 'length':
                result = storageType.length;
                break;
              default:
                result = null;
            }
          } catch (e) {
            result = `Error: ${e.message}`;
          }
          nodeValues.set(node.id, result);
        } else if (node.type === 'console') {
          const inputEdge = inputEdges[0];
          const inputValue = inputEdge ? nodeValues.get(inputEdge.source) : '';
          const logType = node.data.logType || 'log';
          const label = node.data.label || '';
          
          switch (logType) {
            case 'log':
              label ? console.log(label, inputValue) : console.log(inputValue);
              break;
            case 'info':
              label ? console.info(label, inputValue) : console.info(inputValue);
              break;
            case 'warn':
              label ? console.warn(label, inputValue) : console.warn(inputValue);
              break;
            case 'error':
              label ? console.error(label, inputValue) : console.error(inputValue);
              break;
            case 'table':
              console.table(inputValue);
              break;
            case 'group':
              console.group(label || 'Group');
              break;
            case 'time':
              console.time(label || 'Timer');
              break;
            case 'clear':
              console.clear();
              break;
          }
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

// Generate Python code from nodes and edges
export function generatePythonCode(nodes, edges) {
  if (nodes.length === 0) {
    return '# Akış boş, blok ekleyin';
  }

  let code = '# Logic Flow Builder - Python Kodu\n';
  code += 'import re\nimport json\nimport random\nimport time\nfrom datetime import datetime\nimport uuid\n\n';
  
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
  const regexNodes = nodes.filter(n => n.type === 'regex');
  const fetchNodes = nodes.filter(n => n.type === 'fetch');
  const loopNodes = nodes.filter(n => n.type === 'loop');
  const conditionalNodes = nodes.filter(n => n.type === 'conditional');
  const consoleNodes = nodes.filter(n => n.type === 'console');

  // Helper to get variable name for a node
  const getVarName = (node) => {
    if (!node) return '"undefined"';
    switch (node.type) {
      case 'input': return `input_${inputNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'function': return `func_result_${functionNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'math': return `math_result_${mathNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'text': return `text_result_${textNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'logic': return `condition_${logicNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'random': return `random_${randomNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'merge': return `merged_${mergeNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'delay': return `delayed_${delayNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'regex': return `regex_result_${regexNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'fetch': return `fetch_result_${fetchNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'loop': return `loop_result_${loopNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'conditional': return `cond_result_${conditionalNodes.findIndex(n => n.id === node.id) + 1}`;
      case 'console': return `console_result_${consoleNodes.findIndex(n => n.id === node.id) + 1}`;
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
    code += '# Giriş Değerleri\n';
    inputNodes.forEach((node, i) => {
      const value = node.data.value || '';
      code += `input_${i + 1} = "${value}"\n`;
    });
    code += '\n';
  }

  // Generate random values
  if (randomNodes.length > 0) {
    code += '# Rastgele Değerler\n';
    randomNodes.forEach((node, i) => {
      const type = node.data.randomType || 'number';
      const min = node.data.min || 0;
      const max = node.data.max || 100;
      let randomCode = '';
      switch (type) {
        case 'number':
          randomCode = `random.randint(${min}, ${max})`;
          break;
        case 'uuid':
          randomCode = `str(uuid.uuid4())`;
          break;
        case 'boolean':
          randomCode = `random.choice([True, False])`;
          break;
        default:
          randomCode = `random.random()`;
      }
      code += `random_${i + 1} = ${randomCode}\n`;
    });
    code += '\n';
  }

  // Generate function calls
  if (functionNodes.length > 0) {
    code += '# Fonksiyonlar\n';
    functionNodes.forEach((node, i) => {
      const op = node.data.operation || 'uppercase';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'uppercase': operation = `str(${inputVar}).upper()`; break;
        case 'lowercase': operation = `str(${inputVar}).lower()`; break;
        case 'reverse': operation = `str(${inputVar})[::-1]`; break;
        case 'length': operation = `len(str(${inputVar}))`; break;
        case 'trim': operation = `str(${inputVar}).strip()`; break;
        case 'double': operation = `str(${inputVar}) + str(${inputVar})`; break;
        default: operation = inputVar;
      }
      
      code += `func_result_${i + 1} = ${operation}\n`;
    });
    code += '\n';
  }

  // Generate math operations
  if (mathNodes.length > 0) {
    code += '# Matematik İşlemleri\n';
    mathNodes.forEach((node, i) => {
      const op = node.data.operation || 'add';
      const mathValue = node.data.mathValue || 0;
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'add': operation = `float(${inputVar}) + ${mathValue}`; break;
        case 'subtract': operation = `float(${inputVar}) - ${mathValue}`; break;
        case 'multiply': operation = `float(${inputVar}) * ${mathValue}`; break;
        case 'divide': operation = `float(${inputVar}) / ${mathValue} if ${mathValue} != 0 else 0`; break;
        case 'power': operation = `float(${inputVar}) ** ${mathValue}`; break;
        case 'sqrt': operation = `float(${inputVar}) ** 0.5`; break;
        case 'abs': operation = `abs(float(${inputVar}))`; break;
        case 'round': operation = `round(float(${inputVar}))`; break;
        default: operation = inputVar;
      }
      
      code += `math_result_${i + 1} = ${operation}\n`;
    });
    code += '\n';
  }

  // Generate text operations
  if (textNodes.length > 0) {
    code += '# Metin İşlemleri\n';
    textNodes.forEach((node, i) => {
      const op = node.data.operation || 'split';
      const param = node.data.textParam || '';
      const param2 = node.data.textParam2 || '';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (op) {
        case 'split': operation = `str(${inputVar}).split("${param}")`; break;
        case 'join': operation = `"${param}".join(str(${inputVar}).split(","))`; break;
        case 'replace': operation = `str(${inputVar}).replace("${param}", "${param2}")`; break;
        case 'substring': operation = `str(${inputVar})[${param || 0}:${param2 || ''}]`; break;
        case 'repeat': operation = `str(${inputVar}) * ${param || 1}`; break;
        case 'slice': operation = `str(${inputVar})[${param || 0}:${param2 || ''}]`; break;
        case 'charAt': operation = `str(${inputVar})[${param || 0}] if len(str(${inputVar})) > ${param || 0} else ""`; break;
        default: operation = inputVar;
      }
      
      code += `text_result_${i + 1} = ${operation}\n`;
    });
    code += '\n';
  }

  // Generate merge operations
  if (mergeNodes.length > 0) {
    code += '# Birleştirme\n';
    mergeNodes.forEach((node, i) => {
      const separator = node.data.separator || ', ';
      const inputEdges = edges.filter(e => e.target === node.id);
      const sources = inputEdges.map(e => {
        const sourceNode = nodes.find(n => n.id === e.source);
        return `str(${getVarName(sourceNode)})`;
      });
      code += `merged_${i + 1} = "${separator}".join([${sources.join(', ')}])\n`;
    });
    code += '\n';
  }

  // Generate delay operations
  if (delayNodes.length > 0) {
    code += '# Gecikme\n';
    delayNodes.forEach((node, i) => {
      const delay = node.data.delay || 1000;
      const inputVar = getSourceVar(node.id);
      code += `time.sleep(${delay / 1000})\n`;
      code += `delayed_${i + 1} = ${inputVar}\n`;
    });
    code += '\n';
  }

  // Generate logic checks
  if (logicNodes.length > 0) {
    code += '# Mantık Kontrolleri\n';
    logicNodes.forEach((node, i) => {
      const condition = node.data.condition || 'contains';
      const compareValue = node.data.compareValue || '';
      const inputVar = getSourceVar(node.id);
      
      let check = '';
      switch (condition) {
        case 'contains': check = `"${compareValue}" in str(${inputVar})`; break;
        case 'startsWith': check = `str(${inputVar}).startswith("${compareValue}")`; break;
        case 'endsWith': check = `str(${inputVar}).endswith("${compareValue}")`; break;
        case 'equals': check = `str(${inputVar}) == "${compareValue}"`; break;
        case 'notEmpty': check = `len(str(${inputVar})) > 0`; break;
        case 'isNumber': check = `str(${inputVar}).replace(".", "", 1).replace("-", "", 1).isdigit()`; break;
        default: check = 'True';
      }
      
      code += `condition_${i + 1} = ${check}\n`;
    });
    code += '\n';
  }

  // Generate regex operations
  if (regexNodes.length > 0) {
    code += '# RegEx İşlemleri\n';
    regexNodes.forEach((node, i) => {
      const op = node.data.operation || 'test';
      const pattern = node.data.pattern || '';
      const flags = node.data.flags || '';
      const replacement = node.data.replacement || '';
      const inputVar = getSourceVar(node.id);
      
      const pyFlags = flags.includes('i') ? ', re.IGNORECASE' : '';
      
      let operation = '';
      switch (op) {
        case 'test': operation = `bool(re.search(r"${pattern}", str(${inputVar})${pyFlags}))`; break;
        case 'match': operation = `re.findall(r"${pattern}", str(${inputVar})${pyFlags})`; break;
        case 'replace': operation = `re.sub(r"${pattern}", "${replacement}", str(${inputVar})${pyFlags})`; break;
        case 'split': operation = `re.split(r"${pattern}", str(${inputVar})${pyFlags})`; break;
        case 'extract': operation = `(re.search(r"${pattern}", str(${inputVar})${pyFlags}) or type("", (), {"group": lambda s: ""})()).group(0)`; break;
        default: operation = inputVar;
      }
      
      code += `regex_result_${i + 1} = ${operation}\n`;
    });
    code += '\n';
  }

  // Generate fetch operations
  if (fetchNodes.length > 0) {
    code += '# HTTP İstekleri\nimport requests\n\n';
    fetchNodes.forEach((node, i) => {
      const method = node.data.method || 'GET';
      const url = node.data.url || '';
      const body = node.data.body || '{}';
      const headers = node.data.headers || '{}';
      
      if (method === 'GET') {
        code += `fetch_result_${i + 1} = requests.get("${url}", headers=${headers}).json()\n`;
      } else if (method === 'POST') {
        code += `fetch_result_${i + 1} = requests.post("${url}", json=${body}, headers=${headers}).json()\n`;
      } else if (method === 'PUT') {
        code += `fetch_result_${i + 1} = requests.put("${url}", json=${body}, headers=${headers}).json()\n`;
      } else if (method === 'DELETE') {
        code += `fetch_result_${i + 1} = requests.delete("${url}", headers=${headers}).json()\n`;
      } else if (method === 'PATCH') {
        code += `fetch_result_${i + 1} = requests.patch("${url}", json=${body}, headers=${headers}).json()\n`;
      }
    });
    code += '\n';
  }

  // Generate loop operations
  if (loopNodes.length > 0) {
    code += '# Döngü İşlemleri\n';
    loopNodes.forEach((node, i) => {
      const loopType = node.data.loopType || 'forEach';
      const expression = node.data.expression || 'x';
      const start = node.data.start || 0;
      const end = node.data.end || 10;
      const initialValue = node.data.initialValue || '0';
      const inputVar = getSourceVar(node.id);
      
      let operation = '';
      switch (loopType) {
        case 'forEach':
        case 'map':
          operation = `[${expression} for x in ${inputVar}]`;
          break;
        case 'filter':
          operation = `[x for x in ${inputVar} if ${expression}]`;
          break;
        case 'reduce':
          code += `from functools import reduce\n`;
          operation = `reduce(lambda acc, x: ${expression}, ${inputVar}, ${initialValue})`;
          break;
        case 'for':
        case 'times':
          operation = `list(range(${start}, ${end}))`;
          break;
        default:
          operation = inputVar;
      }
      
      code += `loop_result_${i + 1} = ${operation}\n`;
    });
    code += '\n';
  }

  // Generate conditional operations
  if (conditionalNodes.length > 0) {
    code += '# Koşul (If-Else) İşlemleri\n';
    conditionalNodes.forEach((node, i) => {
      const operator = node.data.operator || 'equals';
      const compareValue = node.data.compareValue || '';
      const trueValue = node.data.trueValue || 'True';
      const falseValue = node.data.falseValue || 'False';
      const inputVar = getSourceVar(node.id);
      
      let condition = '';
      switch (operator) {
        case 'equals': condition = `str(${inputVar}) == "${compareValue}"`; break;
        case 'notEquals': condition = `str(${inputVar}) != "${compareValue}"`; break;
        case 'greater': condition = `float(${inputVar}) > ${compareValue}`; break;
        case 'greaterOrEqual': condition = `float(${inputVar}) >= ${compareValue}`; break;
        case 'less': condition = `float(${inputVar}) < ${compareValue}`; break;
        case 'lessOrEqual': condition = `float(${inputVar}) <= ${compareValue}`; break;
        case 'contains': condition = `"${compareValue}" in str(${inputVar})`; break;
        case 'startsWith': condition = `str(${inputVar}).startswith("${compareValue}")`; break;
        case 'endsWith': condition = `str(${inputVar}).endswith("${compareValue}")`; break;
        case 'truthy': condition = `bool(${inputVar})`; break;
        case 'falsy': condition = `not bool(${inputVar})`; break;
        default: condition = 'True';
      }
      
      code += `cond_result_${i + 1} = "${trueValue}" if ${condition} else "${falseValue}"\n`;
    });
    code += '\n';
  }

  // Generate console operations
  if (consoleNodes.length > 0) {
    code += '# Console İşlemleri\n';
    consoleNodes.forEach((node, i) => {
      const logType = node.data.logType || 'log';
      const label = node.data.label || '';
      const inputVar = getSourceVar(node.id);
      
      if (logType === 'table') {
        code += `print(${inputVar})  # table\n`;
      } else if (logType === 'clear') {
        code += `import os; os.system('cls' if os.name == 'nt' else 'clear')\n`;
      } else {
        const prefix = logType === 'warn' ? '[WARN] ' : logType === 'error' ? '[ERROR] ' : logType === 'info' ? '[INFO] ' : '';
        code += label 
          ? `print(f"${prefix}${label}: {${inputVar}}")\n` 
          : `print(f"${prefix}{${inputVar}}")\n`;
      }
      code += `console_result_${i + 1} = ${inputVar}\n`;
    });
    code += '\n';
  }

  // Generate output
  if (outputNodes.length > 0) {
    code += '# Çıkış\n';
    outputNodes.forEach((node, i) => {
      const outputVar = getSourceVar(node.id);
      code += `print(f"Çıkış ${i + 1}: {${outputVar}}")\n`;
    });
  }

  return code;
}
