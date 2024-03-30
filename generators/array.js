Blockly.c_language.variables_array_get = function (block) {
    let varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    varName = Blockly.Blocks.checkUnselect(varName);
    const length1 = Blockly.c_language.valueToCode(block, "LENGTH_1", Blockly.c_language.ORDER_NONE) || "-1",
        length2 = Blockly.c_language.valueToCode(block, "LENGTH_2", Blockly.c_language.ORDER_NONE) || "-1",
        length3 = Blockly.c_language.valueToCode(block, "LENGTH_3", Blockly.c_language.ORDER_NONE) || "-1",
        wantedBlocksArray = Blockly.Blocks.getWantedBlockArray("a"),
        indexesArray = Blockly.Blocks.getIndexArray(wantedBlocksArray, varName);
    let result = "";
    const index1 = Blockly.Blocks.checkArrayIndex(length1, indexesArray[0]);
    const index2 = Blockly.Blocks.checkArrayIndex(length2, indexesArray[1]);
    const index3 = Blockly.Blocks.checkArrayIndex(length3, indexesArray[2]);
    if (index1 == 0 && length1 != -1 || index2 == 0 && length2 != -1 || index3 == 0 && length3 != -1) {
        window.alert("Error: Array index out of bounds...");
        block.initIdx(index1, index2, index3);
    } else if (index1 && !index2 && !index3) {
        result = varName + "[" + length1 + "]";
    } else if (index1 && index2 && !index3) {
        result = varName + "[" + length1 + "][" + length2 + "]";
    } else if (index1 && index2 && index3) {
        result = varName + "[" + length1 + "][" + length2 + "][" + length3 + "]";
    } else if (!index1 && !index2 && !index3) {
        block = this.getFieldValue("VAR");
        block = Blockly.FieldVariableArray.getBlockIdxLength(block);
        result = 1 == block ? varName + "[]" : 2 == block ? varName + "[][]" : varName + "[][][]";
    } else {
        block.initIdx(index1, index2, index3)
    }
    return [result, Blockly.c_language.ORDER_ATOMIC]
};

Blockly.c_language.variables_array_set = function (block) {
    let value = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
    let varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    varName = Blockly.Blocks.checkUnselect(varName);

    const length1 = Blockly.c_language.valueToCode(block, "LENGTH_1", Blockly.c_language.ORDER_NONE) || "-1";
    const length2 = Blockly.c_language.valueToCode(block, "LENGTH_2", Blockly.c_language.ORDER_NONE) || "-1";
    const length3 = Blockly.c_language.valueToCode(block, "LENGTH_3", Blockly.c_language.ORDER_NONE) || "-1";

    const wantedBlocksArray = Blockly.Blocks.getWantedBlockArray("a");
    const indexesArray = Blockly.Blocks.getIndexArray(wantedBlocksArray, varName);

    let result = "";
    const index1 = Blockly.Blocks.checkArrayIndex(length1, indexesArray[0]);
    const index2 = Blockly.Blocks.checkArrayIndex(length2, indexesArray[1]);
    const index3 = Blockly.Blocks.checkArrayIndex(length3, indexesArray[2]);

    if ((index1 == 0 && length1 != -1) || (index2 == 0 && length2 != -1) || (index3 == 0 && length3 != -1)) {
        window.alert("Error: Array index out of bounds...");
        block.initIdx(index1, index2, index3);
    } else if (index1 && !index2 && !index3) {
        result = `${varName}[${length1}] = ${value};\n`;
    } else if (index1 && index2 && !index3) {
        result = `${varName}[${length1}][${length2}] = ${value};\n`;
    } else if (index1 && index2 && index3) {
        result = `${varName}[${length1}][${length2}][${length3}] = ${value};\n`;
    } else {
        block.initIdx(index1, index2, index3);
    }
    return result;
};

Blockly.c_language.variables_array_declare = function (block) {
    const value = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || "0";
    let varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    const type = block.getFieldValue("TYPES");
    const length1 = Blockly.c_language.valueToCode(block, "LENGTH_1", Blockly.c_language.ORDER_NONE) || "0";
    const length2 = Blockly.c_language.valueToCode(block, "LENGTH_2", Blockly.c_language.ORDER_NONE) || "0";
    const length3 = Blockly.c_language.valueToCode(block, "LENGTH_3", Blockly.c_language.ORDER_NONE) || "0";

    let declaration;

    if (value == 0) {
        if (length1 != 0 && length2 == 0 && length3 == 0) {
            declaration = `${type} ${varName}[${length1}];\n`;
        } else if (length1 != 0 && length2 != 0 && length3 == 0) {
            declaration = `${type} ${varName}[${length1}][${length2}];\n`;
        } else if (length1 != 0 && length2 != 0 && length3 != 0) {
            declaration = `${type} ${varName}[${length1}][${length2}][${length3}];\n`;
        }
    } else {
        if (length1 != 0 && length2 == 0 && length3 == 0) {
            declaration = `${type} ${varName}[${length1}] = ${value};\n`;
        } else if (length1 != 0 && length2 != 0 && length3 == 0) {
            declaration = `${type} ${varName}[${length1}][${length2}] = ${value};\n`;
        } else if (length1 != 0 && length2 != 0 && length3 != 0) {
            declaration = `${type} ${varName}[${length1}][${length2}][${length3}] = ${value};\n`;
        }
    }

    if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) === -1) {
        this.initVar();
    }
     
    return declaration;
};

Blockly.c_language.variables_array_initial = function (block) {
    const values = Array(block.itemCount_);
    for (let i = 0; i < block.itemCount_; i++) {
        values[i] = Blockly.c_language.valueToCode(block, "ADD" + i, Blockly.c_language.ORDER_NONE) || "0";
    }
    const arrayString = "{" + values.join(", ") + "}";
    return [arrayString, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.variables_array_pointer = function (block) {
    const varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    return [varName, Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.variables_string_null = function () {
    return ["'\\0'", Blockly.c_language.ORDER_ATOMIC];
};

Blockly.c_language.variables_string_declare = function (block) {
    const value = Blockly.c_language.valueToCode(block, "VALUE", Blockly.c_language.ORDER_ASSIGNMENT) || '""';
    let varName = Blockly.c_language.variableDB_.getName(block.getFieldValue("VAR"), Blockly.Variables.NAME_TYPE);
    const type = block.getFieldValue("TYPES");
    const length = Blockly.c_language.valueToCode(block, "LENGTH_1", Blockly.c_language.ORDER_NONE) || "0";

    const declaration = `${type} ${varName}[${length}] = ${value};\n`;

    if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) === -1) {
        this.initVar();
    }

    return declaration;
};
