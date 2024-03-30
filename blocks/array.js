const rootArray = "[blocks][array]";
const COLOUR_ARRAY_BLOCK = 10;

/**
 * [Toolbox][Array] array get block
 */
Blockly.Blocks.variables_array_get = {
    init() {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_array_get`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.ARRAY_GET_TITLE).appendField(new Blockly.FieldVariableArray(Blockly.Msg.SELECT_MENU, null, this), "VAR");
        this.appendValueInput("LENGTH_1").setCheck("Number INT Variable VAR_INT VAR_UNINT Aster Macro".split(" "));
        this.appendValueInput("LENGTH_2").setCheck("Number INT Variable VAR_INT VAR_UNINT Aster Macro".split(" ")).appendField(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setOutput(true, "Array");
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        this.contextMenuType_ = "variables_array_get";
        this.tag = Blockly.Msg.TAG_VARIABLE_ARRAY_GET;
    },
    getIndices() {
        let a = 0,
            b = 0,
            c = 0,
            d = this.childBlocks_.length;
        if (this.getNextBlock()) d--;
        if (this.getInput("VALUE") && this.getInput("VALUE").connection.targetBlock()) d--;
        switch (d) {
            case 3:
                if ("math_number" == this.getInput("LENGTH_3").connection.targetBlock().type) {
                    c = this.getInput("LENGTH_3").connection.targetBlock().getFieldValue("NUM");
                } else if ("variables_get" == this.getInput("LENGTH_3").connection.targetBlock().type) {
                    c = this.getInput("LENGTH_3").connection.targetBlock().getVars();
                } else if ("math_arithmetic" == this.getInput("LENGTH_3").connection.targetBlock().type) {
                    const result = Blockly.cake.math_arithmetic(this.getInput("LENGTH_3").connection.targetBlock());
                    c = result[0];
                }
            case 2:
                if ("math_number" == this.getInput("LENGTH_2").connection.targetBlock().type) {
                    b = this.getInput("LENGTH_2").connection.targetBlock().getFieldValue("NUM");
                } else if ("variables_get" == this.getInput("LENGTH_2").connection.targetBlock().type) {
                    b = this.getInput("LENGTH_2").connection.targetBlock().getVars();
                } else if ("math_arithmetic" == this.getInput("LENGTH_2").connection.targetBlock().type) {
                    const result = Blockly.cake.math_arithmetic(this.getInput("LENGTH_2").connection.targetBlock());
                    b = result[0];
                }
            case 1:
                if ("math_number" == this.getInput("LENGTH_1").connection.targetBlock().type) {
                    a = this.getInput("LENGTH_1").connection.targetBlock().getFieldValue("NUM");
                } else if ("variables_get" == this.getInput("LENGTH_1").connection.targetBlock().type) {
                    a = this.getInput("LENGTH_1").connection.targetBlock().getVars();
                } else if ("math_arithmetic" == this.getInput("LENGTH_1").connection.targetBlock().type) {
                    const result = Blockly.cake.math_arithmetic(this.getInput("LENGTH_1").connection.targetBlock());
                    a = result[0];
                }
        }
        return [a, b, c];
    },
    getVars() {
        return [this.getFieldValue("VAR")];
    },
    getPos() {
        return this.getRelativeToSurfaceXY().y;
    },
    renameVar(a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    customContextMenu(a) {
        const b = { enabled: true };
        let c = this.getFieldValue("VAR");
        b.text = this.contextMenuMsg_.replace("%1", c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b);
    },
    initIdx(a, b, c) {
        if (a === 0) {
            this.childBlocks_[0].setFieldValue("0", "NUM");
        } else if (b === 0) {
            this.childBlocks_[1].setFieldValue("0", "NUM");
        } else {
            this.childBlocks_[2].setFieldValue("0", "NUM");
        }
    },
    getInputIdxLength() {
        return this.getNextBlock() ? this.childBlocks_.length - 1 : this.childBlocks_.length;
    },
    onchange() {
        Blockly.Blocks.requireInFunction(this);
        const a = this.getFieldValue("VAR");
        const b = Blockly.FieldVariableArray.getBlockIdxLength(a);
        const outputType = Blockly.FieldDropdown.prototype.getTypefromVars(a, 0);
        const c = this.getInputIdxLength();
        if (b === c) {
            this.setOutputType("VAR", outputType);
        } else if (b > c) {
            this.setOutputType("PTR", outputType);
        } else {
            this.changeOutput("Array");
        }
    },
    setOutputType: Blockly.Blocks.variables_get.setOutputType
};

/**
 * [Toolbox][Array] array set block
 */
Blockly.Blocks.variables_array_set = {
    init() {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_array_set`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.VARIABLES_SET_TITLE).appendField(new Blockly.FieldVariableArray(Blockly.Msg.SELECT_MENU, null, this), "VAR");
        this.appendValueInput("LENGTH_1").setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster".split(" "));
        this.appendValueInput("LENGTH_2").setCheck("Number INT NEGATIVE Variable VAR_INT VAR_UNINT DOUBLE VAR_FLOAT VAR_DOUBLE Aster".split(" "));
        this.appendValueInput("VALUE").setCheck(null).appendField(Blockly.Msg.VARIABLES_SET_TAIL);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = "variables_array_set";
        this.tag = Blockly.Msg.TAG_VARIABLE_ARRAY_SET;
    },
    getVars() {
        return [this.getFieldValue("VAR")];
    },
    getPos() {
        return this.getRelativeToSurfaceXY().y;
    },
    renameVar(a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    getIndices: Blockly.Blocks.variables_array_get.getIndices,
    initIdx: Blockly.Blocks.variables_array_get.initIdx,
    customContextMenu: Blockly.Blocks.variables_array_get.customContextMenu,
    getInputIdxLength: Blockly.Blocks.variables_array_get.getInputIdxLength,
    onchange() {
        Blockly.Blocks.requireInFunction(this);
        if (this.getFieldValue("VAR")) {
            const variable = this.getFieldValue("VAR");
            const type = Blockly.FieldDropdown.prototype.getTypefromVars(variable, 0);
            const length = Blockly.FieldVariableArray.getBlockIdxLength(variable);
            let inputLength = this.getInputIdxLength();
            if (this.getInput("VALUE") && this.getInput("VALUE").connection.targetBlock()) {
                inputLength--;
            }
            length === inputLength ? Blockly.Blocks.setCheckVariable(this, type, "VALUE") : Blockly.Blocks.setCheckPointer(this, type, "VALUE");
        }
    }
};

/**
 * [Toolbox][Array] array declare block
 */
Blockly.Blocks.variables_array_declare = {
    init() {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_array_declare`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        const types = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        const defaultName = Blockly.Procedures.findLegalName(Blockly.Msg.VARIABLES_ARRAY_DECLARE_DEFAULT_NAME, this);
        this.varInputField = new Blockly.FieldTextInput(defaultName, Blockly.Procedures.rename);
        this.interpolateMsg(
            Blockly.Msg.VARIABLES_ARRAY_DECLARE_TITLE +
            " %1  " + Blockly.Msg.VARIABLES_DECLARE_NAME + " %2 " + Blockly.Msg.VARIABLES_ARRAY_DECLARE_LENGTH + " %3 %4 " + Blockly.Msg.VARIABLES_ARRAY_DECLARE_VALUE + " %5 ",
            ["TYPES", new Blockly.FieldDropdown(types)],
            ["VAR", this.varInputField],
            ["LENGTH_1", "Number INT Variable VAR_INT VAR_UNINT Aster Macro".split(" "), Blockly.ALIGN_RIGHT],
            ["LENGTH_2", "Number INT Variable VAR_INT VAR_UNINT Aster Macro".split(" "), Blockly.ALIGN_RIGHT],
            ["VALUE", ["Array_Initial"], Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT
        );
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_DECLARE_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = "variables_array_get";
        this.tag = Blockly.Msg.TAG_VARIABLE_ARRAY_DECLARE;
        this.oldName = defaultName;
    },
    getDist() {
        return "a";
    },
    getScope: Blockly.Blocks.variables_declare.getScope,
    getPos() {
        return this.getRelativeToSurfaceXY().y;
    },
    getSpec() {
        const [a, b, c] = this.getIndices().map(idx => parseInt(idx, 10));
        if (a !== 0 && b === 0 && c === 0) return [1, a];
        if (a !== 0 && b !== 0 && c === 0) return [2, a, b];
        if (a !== 0 && b !== 0 && c !== 0) return [3, a, b, c];
    },
    onchange() {
        Blockly.Blocks.variablePlaceCheck(this);
        const newName = this.getFieldValue("VAR");
        if (this.oldName !== newName) {
            const scope = this.getScope();
            if (scope) {
                Blockly.Variables.renameVariablebyScope(this.oldName, newName, scope[0]);
            }
            this.oldName = newName;
        }
    },
    getTypes() {
        return [this.getFieldValue("TYPES")];
    },
    getLength() {
        return [this.childBlocks_[0].getFieldValue("NUM")];
    },
    getVars() {
        return [this.getFieldValue("VAR")];
    },
    getDeclare() {
        return [this.getFieldValue("VAR")];
    },
    renameVar(a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    getIndices: Blockly.Blocks.variables_array_get.getIndices,
    customContextMenu: Blockly.Blocks.variables_array_get.customContextMenu
};

/**
 * [Toolbox][Array] array initial block
 */
Blockly.Blocks.variables_array_initial = {
    init() {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_array_initial`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.appendValueInput("ADD0").appendField(Blockly.Msg.VARIABLES_ARRAY_INITIAL);
        this.appendValueInput("ADD1");
        this.appendValueInput("ADD2");
        this.setOutput(true, "Array_Initial");
        this.setMutator(new Blockly.Mutator(["array_create_with_item"]));
        this.setTooltip(Blockly.Msg.VARIABLES_ARRAY_INITIAL_TOOLTIP);
        this.itemCount_ = 3;
    },
    mutationToDom() {
        const mutation = document.createElement("mutation");
        mutation.setAttribute("items", this.itemCount_);
        return mutation;
    },
    domToMutation(xmlElement) {
        for (let i = 0; i < this.itemCount_; i++) {
            this.removeInput("ADD" + i);
        }
        this.itemCount_ = parseInt(xmlElement.getAttribute("items"), 10);
        for (let i = 0; i < this.itemCount_; i++) {
            const input = this.appendValueInput("ADD" + i);
            if (i === 0) {
                input.appendField(Blockly.Msg.VARIABLES_ARRAY_INITIAL);
            }
        }
        if (this.itemCount_ === 0) {
            this.appendDummyInput("EMPTY").appendField(Blockly.Msg.VARIABLES_ARRAY_INITIAL);
        }
    },
    decompose(workspace) {
        const containerBlock = Blockly.Block.obtain(workspace, "array_create_with_container");
        containerBlock.initSvg();
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 0; i < this.itemCount_; i++) {
            const itemBlock = Blockly.Block.obtain(workspace, "array_create_with_item");
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose(containerBlock) {
        if (this.itemCount_ === 0) {
            this.removeInput("EMPTY");
        } else {
            for (let i = this.itemCount_ - 1; i >= 0; i--) {
                this.removeInput("ADD" + i);
            }
        }
        this.itemCount_ = 0;
        let itemBlock = containerBlock.getInputTargetBlock("STACK");
        while (itemBlock) {
            const input = this.appendValueInput("ADD" + this.itemCount_);
            if (this.itemCount_ === 0) {
                input.appendField(Blockly.Msg.VARIABLES_ARRAY_INITIAL);
            }
            if (itemBlock.valueConnection_) {
                input.connection.connect(itemBlock.valueConnection_);
            }
            this.itemCount_++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
        if (this.itemCount_ === 0) {
            this.appendDummyInput("EMPTY").appendField(Blockly.Msg.VARIABLES_ARRAY_INITIAL);
        }
    },
    saveConnections(containerBlock) {
        let itemBlock = containerBlock.getInputTargetBlock("STACK");
        let count = 0;
        while (itemBlock) {
            const input = this.getInput("ADD" + count);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            count++;
            itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
        }
    },
    onchange() {
        const parentBlock = this.getParent();
        if (parentBlock !== null && parentBlock.type === "variables_array_declare") {
            const indices = parentBlock.getIndices();
            if (this.itemCount_ > indices[0]) {
                this.setWarningText(Blockly.Msg.VARIABLES_ARRAY_INITIAL_WARNING);
            } else {
                this.setWarningText(null);
            }
        }
    }
};
Blockly.Blocks.array_create_with_container = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} array_create_with_container`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.ARRAY_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.ARRAY_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.array_create_with_item = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} array_create_with_item`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.ARRAY_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.ARRAY_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};

/**
 * [Toolbox][Array] array pointer block
 */
Blockly.Blocks.variables_array_pointer = {
    init() {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_array_pointer`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.ARRAY_GET_TITLE).appendField(new Blockly.FieldVariableArray(Blockly.Msg.SELECT_MENU, null, this), "VAR");
        this.setOutput(true, ["Address", "Pointer"]);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.VARIABLES_ARRAY_POINTER_TOOLTIP);
    },
    renameVar(a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    getVars() {
        return [this.getFieldValue("VAR")];
    },
    setOutputType: Blockly.Blocks.variables_get.setOutputType
};

/**
 * [Toolbox][Array] string initial block
 */
Blockly.Blocks.variables_string_declare = {
    init() {
        const types = [
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_string_declare`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        const defaultName = Blockly.Procedures.findLegalName(Blockly.Msg.VARIABLES_STRING_DECLARE_DEFAULT_NAME, this);
        this.interpolateMsg(
            Blockly.Msg.VARIABLES_STRING_DECLARE_TITLE + " %1  " + Blockly.Msg.VARIABLES_DECLARE_NAME + " %2 " + Blockly.Msg.VARIABLES_STRING_DECLARE_LENGTH + " %3 " + Blockly.Msg.VARIABLES_STRING_DECLARE_VALUE + " %4", 
            ["TYPES", new Blockly.FieldDropdown(types)], 
            ["VAR", new Blockly.FieldTextInput(defaultName, Blockly.Procedures.rename)], 
            ["LENGTH_1", "Number INT Variable VAR_INT VAR_UNINT Aster Macro".split(" "), Blockly.ALIGN_RIGHT], 
            ["VALUE", null, Blockly.ALIGN_RIGHT], 
            Blockly.ALIGN_RIGHT
        );
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_DECLARE_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = "variables_array_get";
        this.tag = Blockly.Msg.TAG_VARIABLE_ARRAY_DECLARE;
        this.oldName = defaultName;
    },
    initVar: Blockly.Blocks.define_declare.initVar,
    getDist() {
        return "a";
    },
    getScope: Blockly.Blocks.variables_declare.getScope,
    getPos() {
        return this.getRelativeToSurfaceXY().y;
    },
    getSpec() {
        const [a, b, c] = this.getIndices().map(idx => parseInt(idx, 10));
        if (a !== 0 && b === 0 && c === 0) return [1, a];
        if (a !== 0 && b !== 0 && c === 0) return [2, a, b];
        if (a !== 0 && b !== 0 && c !== 0) return [3, a, b, c];
    },
    onchange() {
        Blockly.Blocks.variablePlaceCheck(this);
        const newName = this.getFieldValue("VAR");
        if (this.oldName !== newName) {
            Blockly.Variables.renameVariable(this.oldName, newName);
            this.oldName = newName;
        }
    },
    getTypes() {
        return [this.getFieldValue("TYPES")];
    },
    getLength() {
        return [this.childBlocks_[0].getFieldValue("NUM")];
    },
    getVars() {
        return [this.getFieldValue("VAR")];
    },
    getDeclare() {
        return [this.getFieldValue("VAR")];
    },
    renameVar(a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    getIndices: Blockly.Blocks.variables_array_get.getIndices,
    customContextMenu: Blockly.Blocks.variables_array_get.customContextMenu
};

Blockly.Blocks.variables_string_null = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootArray} variables_string_null`);
        this.setColour(COLOUR_ARRAY_BLOCK);
        this.setOutput(!0);
        this.appendDummyInput().appendField(Blockly.Msg.VARIABLES_STRING_NULL);
        this.setTooltip(Blockly.Msg.VARIABLES_STRING_NULL_TOOLTIP);
        this.tag = Blockly.Msg.TAG_VARIABLES_STRING_NULL
    },
    onchange: Blockly.Blocks.requireInFunction
};
