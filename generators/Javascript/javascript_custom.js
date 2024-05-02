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

function getArrayAndIndex(str) {
    const matches = str.match(/([a-zA-Z_]\w*)\[(\d+)\]/);
    return matches && matches.length === 3 ? { arrayName: matches[1], index: parseInt(matches[2]) } : null;
}
Blockly.JavaScript.variables_assignment = function (block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
    const type_block_a = block.getInputTargetBlock('A')?.type || undefined;
    const type_block_b = block.getInputTargetBlock('B')?.type || 'no_value';
    const memory = JSON.parse(localStorage.getItem('memory'));

    if (type_block_b === 'variables_get') {
        const object_a = memory[a];
        const object_b = memory[b];
        if (object_b['value'] === 'no_value' || object_b['type'] !== object_a['type']) {
            window.alert("Error: Type mismatch or variable not assigned.");
            block.getInputTargetBlock('B').dispose();
            return '';
        } else {
            object_a['value'] = object_b['value'];
        }
    }

    if (
        (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
        type_block_b === 'math_number'
    ) {
        if (type_block_a === 'lists_getValueAtIndex') {
            const result = getArrayAndIndex(a);
            if(result===null) return '';
            const { arrayName, index } = result;
            console.log({ arrayName, index });

            if(memory[arrayName]?.type === 'CHAR'){
                window.alert("Error: type variable is not match");
                block.getInputTargetBlock('B').dispose();
                return '';
            }
            memory[arrayName].value[index] = b;
        }
        if (type_block_a === 'variables_get') {
            if (memory[a]['type'] === 'INT') memory[a]['value'] = b;
            else {
                window.alert("Error: Type mismatch or variable not assigned.");
                block.getInputTargetBlock('B').dispose();
                return '';
            }
        }
    }

    if (
        (type_block_a === 'variables_get' || type_block_a === 'lists_getValueAtIndex') &&
        type_block_b === 'single_character_input'
    ) {
        if (type_block_a === 'lists_getValueAtIndex') {
            const result = getArrayAndIndex(a);
            if(result===null) return '';
            const { arrayName, index } = result;
            console.log({ arrayName, index });

            if(memory[arrayName]?.type === 'INT'){
                window.alert("Error: type variable is not match");
                block.getInputTargetBlock('B').dispose();
                return '';
            }
            memory[arrayName].value[index] = b;
        }
        if (type_block_a === 'variables_get') {
            if (memory[a]['type'] === 'CHAR') memory[a]['value'] = b;
            else {
                window.alert("Error: Type mismatch or variable not assigned.");
                block.getInputTargetBlock('B').dispose();
                return '';
            }
        }
    }

    if (type_block_b === 'math_arithmetic') {
        if (memory[a]['type'] === 'INT') memory[a]['value'] = 'value_of_math_arithmetic';
        else {
            window.alert("Error: Type mismatch.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
    }

    if (type_block_b === 'math_modulo') {
        if (memory[a]['type'] === 'INT') memory[a]['value'] = 'value_of_math_modulo';
        else {
            window.alert("Error: Type mismatch.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
    }

    if (type_block_b === 'math_round') {
        if (memory[a]['type'] === 'INT') memory[a]['value'] = 'value_of_math_round';
        else {
            window.alert("Error: Type mismatch.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
    }

    if (type_block_b === 'operator_bitwise') {
        if (memory[a]['type'] === 'INT') memory[a]['value'] = 'value_of_operator_bitwise';
        else {
            window.alert("Error: Type mismatch.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
    }

    if (type_block_b === 'math_pow') {
        if (memory[a]['type'] === 'INT') memory[a]['value'] = 'value_of_math_pow';
        else {
            window.alert("Error: Type mismatch.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
    }

    if (
        type_block_a === 'variables_array_get_name' &&
        type_block_b === 'lists_create_empty_v2'
    ) {
        if (memory[a]['type'] === 'INT' || memory[a]['type'] === 'CHAR')
            memory[a]['value'] = b;
        else {
            window.alert("Error: Type mismatch.");
            block.getInputTargetBlock('B').dispose();
            return '';
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
        window.alert("Error: Type mismatch.");
        block.getInputTargetBlock('B').dispose();
        return '';
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

    if (memory[value_text].value === "no_value") {
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
    // const dropdown_type = block.getFieldValue('TYPE');
    // const text_index = block.getFieldValue('INDEX');
    const text_var = block.getFieldValue('VAR');
    const type = block.getFieldValue("TYPE");

    let memory = JSON.parse(localStorage.getItem('memory'));
    memory[text_var] = {
        type,
        value: []
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
