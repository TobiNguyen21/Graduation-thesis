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

    if (type_block_b === 'math_number') {
        if (memory[a]['type'] === 'INT') memory[a]['value'] = b;
        else {
            window.alert("Error: Type mismatch or variable not assigned.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
    }

    if (type_block_b === 'single_character_input') {
        if (memory[a]['type'] === 'CHAR') memory[a]['value'] = b;
        else {
            window.alert("Error: Type mismatch or variable not assigned.");
            block.getInputTargetBlock('B').dispose();
            return '';
        }
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
            // console.log({ memory, variable, rs: memory[variable]['value'] });
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

// Generator for main block
Blockly.JavaScript['main_block'] = function (block) {
    const stackCode = Blockly.JavaScript.statementToCode(block, 'STACK');
    let code = 'function main() {\n';
    code += stackCode;
    code += '}\n';
    code += 'main();\n';
    return code;
};
