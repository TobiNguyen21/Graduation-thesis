Blockly.JavaScript.errorHandler = function (block, msg, blockDispose = null) {
  window.alert(`Error: ${msg}`);
  if (blockDispose) block.getInputTargetBlock(blockDispose).dispose();
  return '';
}

// Generator for declaring variables
Blockly.JavaScript.variables_declare = function (block) {
  const variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
  const type = block.getFieldValue("TYPE");

  let memory = JSON.parse(localStorage.getItem('memory'));

  memory[variable] = {
    type,
    value: 'no_value'
  }
  localStorage.setItem('memory', JSON.stringify(memory));
  // return "let " + variable + ";\n";
  return '';
};

Blockly.JavaScript.variables_assignment = function (block) {
  const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  const type_block_a = block.getInputTargetBlock('A')?.type || undefined;
  const type_block_b = block.getInputTargetBlock('B')?.type || 'no_value';
  const memory = JSON.parse(localStorage.getItem('memory'));

  const getArrayAndIndex = (str) => {
    const matches = str.match(/([a-zA-Z_]\w*)\[(\d+)\]/);
    return matches && matches.length === 3 ? { arrayName: matches[1], index: parseInt(matches[2]) } : null;
  }

  const handleError = (msg, blockDispose = null) => {
    return Blockly.JavaScript.errorHandler(block, msg, blockDispose);
  }

  // Case 1: (arr[index] || b || 123 || 'a' ) = a
  if (type_block_b === 'variables_get') {
    const object_a = memory[a];
    const object_b = memory[b];
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return '';
      const { arrayName, index } = result;
      if (memory[arrayName]?.type !== object_b['type'] || object_b?.value === "no_value") {
        return handleError('Type mismatch or variable not assigned.', 'B');
      } else {
        const arr = memory[arrayName].value;
        arr[index] = (object_b?.value !== "pending") ? object_b.value : null;
      }
    } else {
      if (object_b['value'] === 'no_value' || object_b['type'] !== object_a['type']) {
        return handleError('Type mismatch or variable not assigned.', 'B');
      } else {
        object_a['value'] = object_b['value'];
      }
    }
  }

  // Case 2: (a || arr[index]) = 123
  if (
    (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
    type_block_b === 'math_number'
  ) {
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return '';
      const { arrayName, index } = result;
      // console.log({ arrayName, index });

      if (memory[arrayName]?.type !== 'INT') {
        return handleError('Type array is not match.', 'B');
      }
      memory[arrayName].value[index] = b;
    }
    if (type_block_a === 'variables_get') {
      if (memory[a]?.type === 'INT') memory[a]['value'] = b;
      else {
        return handleError('Type mismatch or variable not assigned.', 'B');
      }
    }
  }

  // Case 3: (a || arr[index]) = 'a'
  if (
    (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
    type_block_b === 'single_character_input'
  ) {
    if (type_block_a === 'lists_getValueAtIndex') {
      const result = getArrayAndIndex(a);
      if (result === null) return '';
      const { arrayName, index } = result;
      // console.log({ arrayName, index });

      if (memory[arrayName]?.type !== 'CHAR') {
        return handleError('Type array is not match', 'B');
      }
      memory[arrayName].value[index] = b;
    }
    if (type_block_a === 'variables_get') {
      if (memory[a]?.type === 'CHAR') memory[a]['value'] = b;
      else {
        return handleError('Type mismatch or variable not assigned.', 'B');
      }
    }
  }

  // Case 4: ... = 123
  if (type_block_b === 'math_arithmetic') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_arithmetic';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 5: ... = expression
  if (type_block_b === 'math_modulo') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_modulo';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 6: ... = roundNumber
  if (type_block_b === 'math_round') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_round';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 7: ... = bitwise expression ( &|^!)
  if (type_block_b === 'operator_bitwise') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_operator_bitwise';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 8: ... = a^B
  if (type_block_b === 'math_pow') {
    if (memory[a]?.type === 'INT') memory[a]['value'] = 'value_of_math_pow';
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  }

  // Case 9: arr[index] = [] - cover case with type int or char
  if (
    type_block_a === 'variables_array_get_name' &&
    type_block_b === 'lists_create_empty_v2'
  ) {
    if (memory[a]?.type === 'INT' || memory[a]?.type === 'CHAR')
      memory[a]['value'] = b;
    else {
      return handleError('Type mismatch or variable not assigned.', 'B');
    }
  } else if (
    (type_block_a === undefined &&
      type_block_b === 'lists_create_empty_v2') ||
    (type_block_a === 'variables_array_get_name' &&
      type_block_b === 'no_value')
  ) {
    return '';
  } else if (
    (type_block_a !== 'variables_array_get_name' &&
      type_block_b === 'lists_create_empty_v2') ||
    (type_block_a === 'variables_array_get_name' &&
      type_block_b !== 'lists_create_empty_v2')
  ) {
    return handleError('Type mismatch or variable not assigned.', 'B');
  }

  localStorage.setItem('memory', JSON.stringify(memory));

  return a + ' = ' + b + ';\n';
};

// Override method variables_get
Blockly.JavaScript['variables_get_original'] = Blockly.JavaScript['variables_get'];
Blockly.JavaScript['variables_get'] = function (block) {
  const code = Blockly.JavaScript['variables_get_original'](block);
  const memory = JSON.parse(localStorage.getItem('memory'));
  const variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);

  if (!memory[variable]) {
    window.alert('Variable not found');
    block.dispose();
    return;
  }
  return code;
};

// Override method text_print
Blockly.JavaScript['text_print_original'] = Blockly.JavaScript['text_print'];
Blockly.JavaScript['text_print'] = function (block) {
  const code = Blockly.JavaScript['text_print_original'](block);
  const inputConnection = block.getInput('TEXT').connection;
  let connectedBlock = null;
  const memory = JSON.parse(localStorage.getItem('memory'));

  if (inputConnection.targetConnection) {
    connectedBlock = inputConnection.targetConnection.sourceBlock_;

    if (connectedBlock.type === 'variables_get') {
      const variable = Blockly.JavaScript.variableDB_.getName(connectedBlock.getFieldValue("VAR"), Blockly.VARIABLE_CATEGORY_NAME);
      if (memory[variable]['value'] === 'no_value') {
        window.alert("Variable not assigned");
        connectedBlock.dispose();
      }
    }

    if (connectedBlock.type === 'lists_getValueAtIndex') {
      const arrayName = connectedBlock.getFieldValue("ARRAY");
      const index = connectedBlock.getFieldValue("INDEX");
      const arr = memory[arrayName]?.value ? (memory[arrayName].value) : null;
      if (arrayName !== '--select--' && !arr[index]) {
        window.alert("Variable not assigned");
        connectedBlock.dispose();
      }
    }
  }
  return code;
};

Blockly.JavaScript['single_character_input'] = function (block) {
  const text_char = `'${block.getFieldValue('CHAR')}'`;
  return [text_char, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['text_scanf'] = function (block) {
  const dropdown_type = block.getFieldValue('TYPE');
  let value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  const memory = JSON.parse(localStorage.getItem('memory'));
  const msgData = `Enter data input ${value_text}:`

  if (memory[value_text]?.value === "no_value") {
    memory[value_text]['value'] = 'pending';
    localStorage.setItem('memory', JSON.stringify(memory));
  }

  if (dropdown_type === '%s') {
    return value_text + ` = window.prompt('${msgData}');\n`;
  } else if (dropdown_type === '%d') {
    return value_text + ` = parseInt(window.prompt('${msgData}'));\n`;
  } else if (dropdown_type === '%c') {
    return value_text + ` = window.prompt('${msgData}')[0];\n`;
  }
  return '';
};

// Generator for bitwise block
Blockly.JavaScript['operator_bitwise'] = function (block) {
  const value_a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  const dropdown_op = block.getFieldValue('OP');
  const value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

  const code = value_a + ' ' + dropdown_op + ' ' + value_b;
  return [code, Blockly.JavaScript.ORDER_NONE];
}

// Generator for pow block
Blockly.JavaScript['math_pow'] = function (block) {
  const valueNum1 = Blockly.JavaScript.valueToCode(block, 'NUM1', Blockly.JavaScript.ORDER_NONE) || '0';
  const valueNum2 = Blockly.JavaScript.valueToCode(block, 'NUM2', Blockly.JavaScript.ORDER_NONE) || '0';
  const code = 'Math.pow(' + valueNum1 + ', ' + valueNum2 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['variables_array_declare'] = function (block) {
  const text_var = block.getFieldValue('VAR');
  const type = block.getFieldValue("TYPE");
  const lengthArr = +Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_ATOMIC) || 0;

  const arrInit = [];

  if (type === "INT") {
    for (let i = 0; i < lengthArr; i++) {
      arrInit.push(0);
    }
  } else if (type === "CHAR") {
    for (let i = 0; i < lengthArr; i++) {
      arrInit.push(null);
    }
  }


  let memory = JSON.parse(localStorage.getItem('memory'));
  memory[text_var] = {
    type,
    value: arrInit
  }
  localStorage.setItem('memory', JSON.stringify(memory));
  const code = 'var' + ' ' + text_var + ';\n';
  return code;
};

Blockly.JavaScript['variables_array_get_name'] = function (block) {
  const arrayName = block.getFieldValue('ARRAY');
  const code = arrayName;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_array_initial'] = function (block) {
  const varName = block.getFieldValue('VAR');
  const type = block.getFieldValue('TYPE');
  let length = +Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_ATOMIC) || undefined;
  const elementCode = Blockly.JavaScript.valueToCode(block, 'ELEMENT', Blockly.JavaScript.ORDER_NONE) || 'null';

  let element = elementCode.replace(/'/g, '"');
  if (type === "INT") element = element.replace(/null/g, '0');
  const arrInit = JSON.parse(element) || [];

  const handleError = (msg, blockDispose = null) => {
    return Blockly.JavaScript.errorHandler(block, msg, blockDispose)
  }

  if (length === undefined && arrInit.length > 0) {
    length = arrInit.length;
  }

  const checkConflictTypeElementOfArray = (arr = []) => {
    for (let i = 1; i < arr.length; i++) {
      if (
        arr[i] && ((typeof arr[0]) !== (typeof arr[i]))
      ) {
        return true;
      }
    }
    return false;
  }

  if (!Array.isArray(arrInit)) {
    return handleError("block connect must be array.", 'ELEMENT');
  }

  if (checkConflictTypeElementOfArray(arrInit)) {
    return handleError("Conflict type on array.", 'ELEMENT');
  }

  if (
    (arrInit.length > 0 && typeof arrInit[0] === "string" && type === "INT") ||
    (arrInit.length > 0 && typeof arrInit[0] === "number" && type === "CHAR")
  ) {
    return handleError("Type variable is not match.", 'ELEMENT');
  }

  if (Number.isInteger(length) && arrInit.length > length) {
    return handleError("Elements overload size allocated for array.", 'ELEMENT');
  }

  if (Number.isInteger(length) && arrInit.length < length) {
    const length_ = length - arrInit.length;
    for (let i = 0; i < length_; i++) {
      if (type === "INT") arrInit.push(0);
      if (type === "CHAR") arrInit.push(null);
    }
  }

  let memory = JSON.parse(localStorage.getItem('memory'));
  memory[varName] = {
    type,
    value: arrInit
  }
  localStorage.setItem('memory', JSON.stringify(memory));

  let code = 'var ' + varName + ' = ';
  code += elementCode + ';\n';

  return code;
};

Blockly.JavaScript['lists_create_empty_v2'] = function (block) {
  let code = '[';
  for (let i = 0; i < block.itemCount_; i++) {
    const itemCode = Blockly.JavaScript.valueToCode(block, 'ITEM' + i, Blockly.JavaScript.ORDER_NONE) || 'null';
    code += itemCode;
    if (i < block.itemCount_ - 1) {
      code += ', ';
    }
  }
  code += ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['lists_getValueAtIndex'] = function (block) {
  const arrayName = block.getFieldValue('ARRAY');
  const index = block.getFieldValue('INDEX');

  // const index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_NONE) || '0';
  return [arrayName + '[' + index + ']', Blockly.JavaScript.ORDER_ATOMIC];
};

// Generator for main block
Blockly.JavaScript['main_block'] = function (block) {
  const stackCode = Blockly.JavaScript.statementToCode(block, 'STACK');
  let code = 'function main() {\n';
  code += stackCode;
  code += '}\n';
  code += 'main();\n';
  return code;
};
