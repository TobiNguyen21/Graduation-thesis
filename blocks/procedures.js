const rootProcedures = "[blocks][procedures]";
const COLOUR_PROCEDURE_BLOCK = 230;

Blockly.Blocks.procedures = {};

/**
 * Main functional block
 */
Blockly.Blocks.main_block = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} main_block`);
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
        this.appendDummyInput().appendField(Blockly.Msg.MAIN_BLOCK);
        this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_DO);
        this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.MAIN_BLOCK_RETURN);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
        this.types_ = [];
        Blockly.Blocks.setCheckVariable(this,
            "int", "RETURN")
    },
    getName: function () {
        return ["Main"]
    },
    getParamInfo: function () {
        return []
    }
};

/**
 * Void functional block
 */
Blockly.Blocks.procedures_defnoreturn = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} main_block`);
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        const procedureName = Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, this);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(new Blockly.FieldTextInput(procedureName, Blockly.Procedures.rename), "NAME").appendField("", "PARAMS");
        this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg", "procedures_mutatorarg_pointer", "procedures_mutatorarg_array"]));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.arguments_ = [];
        this.types_ = [];
        this.dist_ = [];
        this.spec_ = [];
        this.tag = Blockly.Msg.TAG_PROCEDURE_DEFNORETURN;
        Blockly.Procedures.setProcedureName(this.getName());
    },
    initName: function () {
        this.setFieldValue("", "NAME");
    },
    getName: function () {
        return [this.getFieldValue("NAME")];
    },
    onchange: function () {
        Blockly.Blocks.requireOutFunction();
    },
    updateParams_: function () {
        let hasDuplicate = false;
        const argDict = {};
        for (let i = 0; i < this.arguments_.length; i++) {
            if (argDict["arg_" + this.arguments_[i].toLowerCase()]) {
                hasDuplicate = true;
                break;
            }
            argDict["arg_" + this.arguments_[i].toLowerCase()] = true;
        }
        if (hasDuplicate) {
            this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
        } else {
            this.setWarningText(null);
        }

        let paramString = "";
        if (this.arguments_.length) {
            paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS;
            for (let i = 0; i < this.arguments_.length; i++) {
                if (i === 0) {
                    if (this.dist_[i] === "v") {
                        paramString += " " + this.types_[i] + " " + this.arguments_[i];
                    } else if (this.dist_[i] === "a") {
                        if (this.spec_[i][0] === 1) {
                            paramString += " " + this.types_[i] + " " + this.arguments_[i] + "[]";
                        } else if (this.spec_[i][0] === 2) {
                            paramString += " " + this.types_[i] + " " + this.arguments_[i] + "[][" + this.spec_[i][2] + "]";
                        }
                    } else if (this.dist_[i] === "p") {
                        paramString += " " + this.types_[i] + " " + this.spec_[i] + this.arguments_[i];
                    }
                } else {
                    if (this.dist_[i] === "v") {
                        paramString += ", " + this.types_[i] + " " + this.arguments_[i];
                    } else if (this.dist_[i] === "a") {
                        if (this.spec_[i][0] === 1) {
                            paramString += " " + this.types_[i] + " " + this.arguments_[i] + "[]";
                        } else if (this.spec_[i][0] === 2) {
                            paramString += " " + this.types_[i] + " " + this.arguments_[i] + "[][" + this.spec_[i][2] + "]";
                        }
                    } else if (this.dist_[i] === "p") {
                        paramString += ", " + this.types_[i] + " " + this.spec_[i] + this.arguments_[i];
                    }
                }
            }
        }
        this.setFieldValue(paramString, "PARAMS");
    },
    mutationToDom: function () {
        const mutation = document.createElement("mutation");
        for (let i = 0; i < this.arguments_.length; i++) {
            const arg = document.createElement("arg");
            arg.setAttribute("name", this.arguments_[i]);
            arg.setAttribute("types", this.types_[i]);
            arg.setAttribute("dist", this.dist_[i]);
            if (this.dist_[i] === "a") {
                if (this.spec_[i][0] === 1) {
                    arg.setAttribute("length_1", this.spec_[i][1]);
                } else if (this.spec_[i][0] === 2) {
                    arg.setAttribute("length_1", this.spec_[i][1]);
                    arg.setAttribute("length_2", this.spec_[i][2]);
                }
            } else if (this.dist_[i] === "p") {
                arg.setAttribute("iteration", this.spec_[i]);
            }
            mutation.appendChild(arg);
        }
        if (!this.getInput("STACK").isVisible()) {
            mutation.setAttribute("statements", "false");
        }
        return mutation;
    },
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        for (let i = 0; i < xmlElement.childNodes.length; i++) {
            const child = xmlElement.childNodes[i];
            if (child.nodeName.toLowerCase() === "arg") {
                this.arguments_.push(child.getAttribute("name"));
                this.types_.push(child.getAttribute("types"));
                this.dist_.push(child.getAttribute("dist"));
                if (this.dist_[i] === "v") {
                    this.spec_.push(null);
                } else if (this.dist_[i] === "a") {
                    const length1 = child.getAttribute("length_1");
                    const length2 = child.getAttribute("length_2");
                    const length1Int = parseInt(length1, 10);
                    const length2Int = parseInt(length2, 10);
                    if (length1Int !== 0 && length2Int === 0) {
                        this.spec_.push([1, length1]);
                    } else if (length1Int !== 0 && length2Int !== 0) {
                        this.spec_.push([2, length1, length2]);
                    }
                } else if (this.dist_[i] === "p") {
                    this.spec_.push(child.getAttribute("iteration"));
                }
            }
        }
        this.updateParams_();
        const statementsVisible = xmlElement.getAttribute("statements") !== "false";
        this.getInput("STACK").setVisible(statementsVisible);
    },
    decompose: function (workspace) {
        const containerBlock = Blockly.Block.obtain(workspace, "procedures_mutatorcontainer");
        containerBlock.initSvg();
        if (this.getInput("RETURN")) {
            const statementsVisible = this.getInput("STACK").isVisible();
            containerBlock.setFieldValue(statementsVisible ? "TRUE" : "FALSE", "STATEMENTS");
        } else {
            containerBlock.getInput("STATEMENT_INPUT").setVisible(false);
        }
        Blockly.Procedures.setProcedureName(this.getName());
        let connection = containerBlock.getInput("STACK").connection;
        for (let i = 0; i < this.arguments_.length; i++) {
            let argBlock;
            if (this.dist_[i] === "v") {
                argBlock = Blockly.Block.obtain(workspace, "procedures_mutatorarg");
                argBlock.initSvg();
                argBlock.setFieldValue(this.arguments_[i], "NAME");
                argBlock.setFieldValue(this.types_[i], "TYPES");
            } else if (this.dist_[i] === "a") {
                argBlock = Blockly.Block.obtain(workspace, "procedures_mutatorarg_array");
                argBlock.initSvg();
                argBlock.setFieldValue(this.arguments_[i], "NAME");
                argBlock.setFieldValue(this.types_[i], "TYPES");
                if (this.spec_[i][0] === 1) {
                    argBlock.setFieldValue(this.spec_[i][1], "LENGTH_1");
                } else if (this.spec_[i][0] === 2) {
                    argBlock.setFieldValue(this.spec_[i][1], "LENGTH_1");
                    argBlock.setFieldValue(this.spec_[i][2], "LENGTH_2");
                }
            } else if (this.dist_[i] === "p") {
                argBlock = Blockly.Block.obtain(workspace, "procedures_mutatorarg_pointer");
                argBlock.initSvg();
                argBlock.setFieldValue(this.arguments_[i], "NAME");
                argBlock.setFieldValue(this.types_[i], "TYPES");
                argBlock.setFieldValue(this.spec_[i], "ITERATION");
            }
            argBlock.oldLocation = i;
            connection.connect(argBlock.previousConnection);
            connection = argBlock.nextConnection;
        }
        Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"), this.getFieldValue("TYPES"), this.workspace, this.arguments_, this.types_, this.dist_, this.spec_, null);
        return containerBlock;
    },
    compose: function (containerBlock) {
        this.arguments_ = [];
        this.types_ = [];
        this.dist_ = [];
        this.spec_ = [];
        this.paramIds_ = [];
        let block = containerBlock.getInputTargetBlock("STACK");
        while (block) {
            this.arguments_.push(block.getFieldValue("NAME"));
            this.types_.push(block.getFieldValue("TYPES"));
            this.dist_.push(block.getDist());
            if (block.getDist() === "v") {
                this.spec_.push(null);
            } else if (block.getDist() === "a") {
                const length1 = block.getFieldValue("LENGTH_1");
                const length2 = block.getFieldValue("LENGTH_2");
                const length1Int = parseInt(length1, 10);
                const length2Int = parseInt(length2, 10);
                if (length1Int !== 0 && length2Int === 0) {
                    this.spec_.push([1, length1]);
                } else if (length1Int !== 0 && length2Int !== 0) {
                    this.spec_.push([2, length1, length2]);
                }
            } else if (block.getDist() === "p") {
                this.spec_.push(block.getFieldValue("ITERATION"));
            }
            this.paramIds_.push(block.id);
            block = block.nextConnection && block.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"), this.getFieldValue("TYPES"), this.workspace, this.arguments_, this.types_, this.dist_, this.spec_, this.paramIds_);
        const statements = containerBlock.getFieldValue("STATEMENTS");
        if (statements !== null) {
            const statementsVisible = statements === "TRUE";
            const stackInput = this.getInput("STACK");
            if (stackInput.isVisible() !== statementsVisible) {
                if (statementsVisible) {
                    if (!stackInput.connection.targetConnection && this.statementConnection_ && this.statementConnection_.targetConnection && this.statementConnection_.sourceBlock_.workspace === this.workspace) {
                        stackInput.connection.connect(this.statementConnection_);
                    }
                } else {
                    if (this.statementConnection_ = stackInput.connection.targetConnection) {
                        const targetBlock = stackInput.connection.targetBlock();
                        targetBlock.setParent(null);
                        targetBlock.bumpNeighbours_();
                    }
                }
                stackInput.setVisible(statementsVisible);
            }
        }
    },
    dispose: function () {
        const procedureName = this.getFieldValue("NAME");
        const procedureType = this.getFieldValue("TYPES");
        Blockly.Procedures.disposeCallers(procedureName, this.workspace);
        Blockly.Block.prototype.dispose.apply(this, arguments);
    },
    getProcedureDef: function () {
        return [false, this.getFieldValue("NAME"), this.getFieldValue("TYPES"), this.arguments_, this.types_, this.dist_, this.spec_];
    },
    getVars: function () {
        return this.arguments_;
    },
    renameVar: function (oldName, newName) {
        let renamed = false;
        for (let i = 0; i < this.arguments_.length; i++) {
            if (Blockly.Names.equals(oldName, this.arguments_[i])) {
                this.arguments_[i] = newName;
                renamed = true;
            }
        }
        if (renamed) {
            this.updateParams_();
        }
    },
    customContextMenu: function (options) {
        const option = {
            enabled: true
        };
        const procedureName = this.getFieldValue("NAME");
        option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1", procedureName);
        const mutation = goog.dom.createDom("mutation");
        mutation.setAttribute("name", procedureName);
        for (let i = 0; i < this.arguments_.length; i++) {
            const arg = goog.dom.createDom("arg");
            arg.setAttribute("name", this.arguments_[i]);
            mutation.appendChild(arg);
        }
        const block = goog.dom.createDom("block", null, mutation);
        block.setAttribute("type", this.callType_);
        option.callback = Blockly.ContextMenu.callbackFactory(this, block);
        options.push(option);
        if (!this.isCollapsed()) {
            for (let i = 0; i < this.arguments_.length; i++) {
                const option = {
                    enabled: true
                };
                const varName = this.arguments_[i];
                option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", varName);
                const field = goog.dom.createDom("field", null, varName);
                field.setAttribute("name", "VAR");
                const block = goog.dom.createDom("block", null, field);
                block.setAttribute("type", "variables_declare");
                option.callback = Blockly.ContextMenu.callbackFactory(this, block);
                options.push(option);
            }
        }
    },
    callType_: "procedures_callnoreturn",
    getParamInfo: function () {
        const paramInfo = [];
        for (let i = 0; i < this.arguments_.length; i++) {
            paramInfo.push([this.types_[i], this.dist_[i], this.arguments_[i], this.getFieldValue("NAME"), this.getRelativeToSurfaceXY().y, this.spec_[i]]);
        }
        return paramInfo;
    }
};

/**
 * return functional block
 */
Blockly.Blocks.procedures_defreturn = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} procedures_defreturn`);
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        const types = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        const dists = [
            [Blockly.Msg.VARIABLES_SET_DIST_VARIABLE, "variable"],
            [Blockly.Msg.VARIABLES_SET_DIST_POINTER, "pointer"],
            [Blockly.Msg.VARIABLES_SET_DIST_ARRAY, "array"]
        ];
        const procedureName = Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, this);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(new Blockly.FieldTextInput(procedureName, Blockly.Procedures.rename), "NAME").appendField("", "PARAMS");
        this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_DO);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN).appendField(new Blockly.FieldDropdown(types), "TYPES").appendField(new Blockly.FieldDropdown(dists), "DISTS").setAlign(Blockly.ALIGN_RIGHT);
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg", "procedures_mutatorarg_pointer", "procedures_mutatorarg_array"]));
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
        this.types_ = [];
        this.dist_ = [];
        this.spec_ = [];
        this.tag = Blockly.Msg.TAG_PROCEDURE_DEFRETURN;
        Blockly.Procedures.setProcedureName(this.getName());
    },
    initName: Blockly.Blocks.procedures_defnoreturn.initName,
    getName: function () {
        return [this.getFieldValue("NAME")];
    },
    updateShape: function () {
        const pointerSpecs = [
            [Blockly.Msg.VARIABLES_SET_POINTER_SPEC_ONE, "*"],
            [Blockly.Msg.VARIABLES_SET_POINTER_SPEC_TWO, "**"]
        ];
        const arraySpecs = [
            [Blockly.Msg.VARIABLES_SET_ARRAY_SPEC_ONE, "[]"],
            [Blockly.Msg.VARIABLES_SET_ARRAY_SPEC_TWO, "[][]"]
        ];
        if (this.getFieldValue("DISTS") !== null) {
            if (this.getFieldValue("DISTS") === "variable") {
                if (this.getField_("PSPECS")) {
                    this.inputList[2].removeField("PSPECS");
                } else if (this.getField_("ASPECS")) {
                    this.inputList[2].removeField("ASPECS");
                }
            } else if (this.getFieldValue("DISTS") === "pointer") {
                if (!this.getField_("PSPECS")) {
                    this.inputList[2].appendField(new Blockly.FieldDropdown(pointerSpecs), "PSPECS");
                } else if (this.getField_("ASPECS")) {
                    this.inputList[2].removeField("ASPECS");
                }
            } else if (this.getFieldValue("DISTS") === "array") {
                if (!this.getField_("ASPECS")) {
                    this.inputList[2].appendField(new Blockly.FieldDropdown(arraySpecs), "ASPECS");
                } else if (this.getField_("PSPECS")) {
                    this.inputList[2].removeField("PSPECS");
                }
            }
        }
    },
    updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
    mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
    decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
    compose: Blockly.Blocks.procedures_defnoreturn.compose,
    dispose: Blockly.Blocks.procedures_defnoreturn.dispose,
    getProcedureDef: function () {
        const distValue = this.getFieldValue("DISTS");
        if (distValue === "variable") {
            return [true, this.getFieldValue("NAME"), this.getFieldValue("TYPES"), this.arguments_, this.types_, this.dist_, this.spec_, distValue];
        } else if (distValue === "pointer") {
            return [true, this.getFieldValue("NAME"), this.getFieldValue("TYPES"), this.arguments_, this.types_, this.dist_, this.spec_, distValue, this.getFieldValue("PSPECS")];
        } else if (distValue === "array") {
            return [true, this.getFieldValue("NAME"), this.getFieldValue("TYPES"), this.arguments_, this.types_, this.dist_, this.spec_, distValue, this.getFieldValue("ASPECS")];
        }
    },
    getType: function () {
        return [this.getFieldValue("TYPES")];
    },
    getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
    renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
    customContextMenu: Blockly.Blocks.procedures_defnoreturn.customContextMenu,
    callType_: "procedures_callreturn",
    onchange: function () {
        Blockly.Blocks.requireOutFunction();
        this.updateShape();
    },
    getParamInfo: function () {
        const paramInfo = [];
        if (this.arguments_.length) {
            for (let i = 0; i < this.arguments_.length; i++) {
                paramInfo.push([this.types_[i], this.dist_[i], this.arguments_[i], this.getFieldValue("NAME"), this.getRelativeToSurfaceXY().y, this.spec_[i]]);
            }
        }
        return paramInfo;
    }
};

Blockly.Blocks.procedures_return = {
    init: function () {
        if (LOG_NAME_BLOCK) {
            console.log(`${rootProcedures} procedures_return`);
        }
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_RETURN_TITLE);
        this.setTooltip(Blockly.Msg.PROCEDURES_RETURN_TOOLTIP);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    },
    getType: function () {
        let block = this;
        let found = false;
        while (block.getSurroundParent()) {
            block = block.getSurroundParent();
            if (block.type === "main_block" || block.type === "procedures_defreturn") {
                found = true;
                break;
            }
        }
        if (found && block.type === "main_block") {
            return "int";
        } else if (found && block.type === "procedures_defreturn") {
            return block.getType();
        }
    },
    onchange: function () {
        Blockly.Blocks.requireInFunction();
        if (this.workspace) {
            let block = this;
            let found = false;
            while (block.getSurroundParent()) {
                block = block.getSurroundParent();
                if (block.type === "main_block" || block.type === "procedures_defreturn" || block.type === "procedures_defnoreturn") {
                    found = true;
                    break;
                }
            }
            if (found && block.type === "main_block") {
                Blockly.Blocks.setCheckVariable(this, "int", "VALUE");
            } else if (found && block.type === "procedures_defreturn") {
                const dist = block.getFieldValue("DISTS");
                const type = block.getFieldValue("TYPES");
                if (dist === "array" || dist === "variable") {
                    Blockly.Blocks.setCheckVariable(this, type, "VALUE");
                } else {
                    Blockly.Blocks.setCheckPointer(this, type, "VALUE");
                }
            } else if (found && block.type === "procedures_defnoreturn") {
                this.getInput("VALUE").setCheck("DUMMY_RETURN_VALUE");
            }
        }
    }
};

Blockly.Blocks.procedures_mutatorcontainer = {
    init: function () {
        if (LOG_NAME_BLOCK) {
            console.log(`${rootProcedures} procedures_mutatorcontainer`);
        }
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput("STACK");
        this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"), "STATEMENTS");
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = false;
    }
};

Blockly.Blocks.procedures_mutatorarg = {
    init: function () {
        const types = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        if (LOG_NAME_BLOCK) {
            console.log(`${rootProcedures} procedures_mutatorarg`);
        }
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.appendDummyInput()
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_PRETITLE)
            .appendField(new Blockly.FieldDropdown(types), "TYPES")
            .appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE)
            .appendField(new Blockly.FieldTextInput("x", Blockly.Procedures.rename), "NAME");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    validator_: function (input) {
        return (input = input.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")) || null;
    },
    getTypes: function () {
        return [this.getFieldValue("TYPES")];
    },
    getDist: function () {
        return "v";
    },
    getSpec: function () {
        return null;
    },
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue("NAME"))) {
            var procedureName = Blockly.Procedures.getProcedureName();
            Blockly.Variables.renameVariablebyScope(oldName, newName, procedureName[0]);
        }
    }
};

Blockly.Blocks.procedures_mutatorarg_pointer = {
    init: function () {
        const types = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        const iterations = [
            [Blockly.Msg.VARIABLES_SET_ITERATION_NORMAL, "*"],
            [Blockly.Msg.VARIABLES_SET_ITERATION_DOUBLE, "**"],
            [Blockly.Msg.VARIABLES_SET_ITERATION_TRIPLE, "***"]
        ];
        if (LOG_NAME_BLOCK) {
            console.log(`${rootProcedures} procedures_mutatorarg_pointer`);
        }
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.interpolateMsg(
            Blockly.Msg.PROCEDURES_MUTATORARG_POINTER_PRETITLE +
            " %1 " + Blockly.Msg.VARIABLES_POINTER_DECLARE_ITERATION +
            " %2 " + Blockly.Msg.VARIABLES_DECLARE_NAME + " %3 ", 
            ["TYPES", new Blockly.FieldDropdown(types)], 
            ["ITERATION", new Blockly.FieldDropdown(iterations)], 
            ["NAME", new Blockly.FieldTextInput("z", Blockly.Procedures.rename)], 
            Blockly.ALIGN_RIGHT
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    validator_: function (input) {
        return (input = input.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")) || null;
    },
    getTypes: function () {
        return [this.getFieldValue("TYPES")];
    },
    getDist: function () {
        return "p";
    },
    getSpec: function () {
        return [this.getFieldValue("ITERATION")];
    },
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue("NAME"))) {
            const procedureName = Blockly.Procedures.getProcedureName();
            Blockly.Variables.renameVariablebyScope(oldName, newName, procedureName[0]);
        }
    }
};

Blockly.Blocks.procedures_mutatorarg_array = {
    init: function () {
        const types = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        if (LOG_NAME_BLOCK) {
            console.log(`${rootProcedures} procedures_mutatorarg_array`);
        }
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.interpolateMsg(
            Blockly.Msg.PROCEDURES_MUTATORARG_ARRAY_PRETITLE + " %1 " + Blockly.Msg.VARIABLES_ARRAY_DECLARE_LENGTH + " %2  %3 " + Blockly.Msg.VARIABLES_DECLARE_NAME + " %4 ",
            ["TYPES", new Blockly.FieldDropdown(types)], 
            ["LENGTH_1", new Blockly.FieldTextInput("1")], 
            ["LENGTH_2", new Blockly.FieldTextInput(" ")], 
            ["NAME", new Blockly.FieldTextInput("y", Blockly.Procedures.rename)], 
            Blockly.ALIGN_RIGHT
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = false;
    },
    validator_: function (input) {
        return (input = input.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "")) || null;
    },
    getTypes: function () {
        return [this.getFieldValue("TYPES")];
    },
    getDist: function () {
        return "a";
    },
    getSpec: function () {
        const length1 = parseInt(this.getFieldValue("LENGTH_1"));
        const length2 = parseInt(this.getFieldValue("LENGTH_2"));
        if (length1 != 0 && length2 == 0) {
            return [1, length1];
        } else if (length1 != 0 && length2 != 0) {
            return [2, length1, length2];
        }
    },
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue("NAME"))) {
            var procedureName = Blockly.Procedures.getProcedureName();
            Blockly.Variables.renameVariablebyScope(oldName, newName, procedureName[0]);
        }
    }
};
