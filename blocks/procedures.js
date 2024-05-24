const rootProcedures = "[blocks][procedures]";
const COLOUR_PROCEDURE_BLOCK = 230;

Blockly.Blocks.procedures = {};

// Function to defined
Blockly.Blocks['procedures_defnoreturn'] = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} procedures_defnoreturn`);
        var name = Blockly.Procedures.findLegalName("", this);
        name = new Blockly.FieldTextInput(name, Blockly.Procedures.rename);
        name.setSpellcheck(false);
        this.appendDummyInput()
            .appendField("void")
            .appendField(name, "NAME")
            .appendField("( )", "PARAMS").appendField("{");
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.arguments_ = [];
        this.types_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
        this.appendDummyInput().appendField("}");
    },
    setStatements_: function (hasStatements) {
        if (this.hasStatements_ !== hasStatements) {
            if (hasStatements) {
                this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
                if (this.getInput("RETURN")) {
                    this.moveInputBefore("STACK", "RETURN");
                }
            } else {
                this.removeInput("STACK", true);
            }
            this.hasStatements_ = hasStatements;
        }
    },
    updateParams_: function () {
        var params = this.arguments_.map((arg, index) => this.types_[index] + " " + arg);
        var paramString = params.length ? " " + params.join(", ") + " " : "";
        Blockly.Events.disable();
        try {
            this.setFieldValue("( " + paramString.toLowerCase() + ")", "PARAMS");
        } finally {
            Blockly.Events.enable();
        }
    },
    mutationToDom: function (opt_paramIds) {
        var container = Blockly.utils.xml.createElement('mutation');
        if (opt_paramIds) {
            container.setAttribute('name', this.getFieldValue('NAME'));
        }
        this.argumentVarModels_.forEach((argModel, i) => {
            var parameter = Blockly.utils.xml.createElement('arg');
            parameter.setAttribute('name', argModel.name);
            parameter.setAttribute('varid', argModel.getId());
            parameter.setAttribute('type', this.types_[i]);
            if (opt_paramIds && this.paramIds_) {
                parameter.setAttribute('paramId', this.paramIds_[i]);
            }
            container.appendChild(parameter);
        });
        if (!this.hasStatements_) {
            container.setAttribute('statements', 'false');
        }
        return container;
    },
    domToMutation: function (xmlElement) {
        this.arguments_ = [];
        this.types_ = [];
        this.argumentVarModels_ = [];
        Array.from(xmlElement.childNodes).forEach(childNode => {
            if (childNode.nodeName.toLowerCase() === 'arg') {
                var name = childNode.getAttribute('name');
                var type = childNode.getAttribute('type');
                var varId = childNode.getAttribute('varid');
                this.arguments_.push(name);
                this.types_.push(type);
                var variable = Blockly.Variables.getOrCreateVariablePackage(this.workspace, varId, name, '');
                if (variable) {
                    this.argumentVarModels_.push(variable);
                } else {
                    console.warn('Failed to create a variable with name ' + name);
                }
            }
        });
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
        this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        this.arguments_.forEach((arg, i) => {
            var parameterBlock = workspace.newBlock('procedures_mutatorarg');
            parameterBlock.setFieldValue(arg, 'NAME');
            parameterBlock.setFieldValue(this.types_[i], 'TYPE');
            parameterBlock.initSvg();
            connection.connect(parameterBlock.previousConnection);
            connection = parameterBlock.nextConnection;
        });
        return containerBlock;
    },
    compose: function (containerBlock) {
        this.arguments_ = [];
        this.types_ = [];
        this.argumentVarModels_ = [];
        var paramBlock = containerBlock.getInputTargetBlock('STACK');
        while (paramBlock) {
            var name = paramBlock.getFieldValue('NAME');
            var type = paramBlock.getFieldValue('TYPE');
            this.arguments_.push(name);
            this.types_.push(type);
            var variable = this.workspace.getVariable(name, '');
            if (variable) {
                this.argumentVarModels_.push(variable);
            } else {
                console.warn('Failed to get a variable with name ' + name);
            }
            paramBlock = paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
        this.setStatements_(true);
        Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
        this.statementConnection_ = null;
    },
    getProcedureDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, false];
    },
    getVars: function () {
        return this.arguments_;
    },
    getVarModels: function () {
        return this.argumentVarModels_;
    },
    renameVarById: function (oldId, newId) {
        var oldVariable = this.workspace.getVariableById(oldId);
        if (oldVariable.type === '') {
            var newVariable = this.workspace.getVariableById(newId);
            this.argumentVarModels_.forEach((argModel, i) => {
                if (argModel.getId() === oldId) {
                    this.arguments_[i] = newVariable.name;
                    this.argumentVarModels_[i] = newVariable;
                }
            });
            this.updateParams_();
            Blockly.Procedures.mutateCallers(this);
        }
    },
    updateVarName: function (variable) {
        this.argumentVarModels_.forEach((argModel, i) => {
            if (argModel.getId() === variable.getId()) {
                this.arguments_[i] = variable.name;
            }
        });
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
    },
    customContextMenu: function (options) {
        if (!this.isInFlyout) {
            var option = { enabled: true };
            var name = this.getFieldValue('NAME');
            option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
            var xmlMutation = Blockly.utils.xml.createElement('mutation');
            xmlMutation.setAttribute('name', name);
            this.arguments_.forEach((arg, i) => {
                var xmlArg = Blockly.utils.xml.createElement('arg');
                xmlArg.setAttribute('name', arg);
                xmlArg.setAttribute('type', this.types_[i]);
                xmlMutation.appendChild(xmlArg);
            });
            var xmlBlock = Blockly.utils.xml.createElement('block');
            xmlBlock.setAttribute('type', this.callType_);
            xmlBlock.appendChild(xmlMutation);
            option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
            options.push(option);
            if (!this.isCollapsed()) {
                this.argumentVarModels_.forEach(variable => {
                    var argOption = { enabled: true };
                    argOption.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', variable.name);
                    var xmlField = Blockly.Variables.generateVariableFieldDom(variable);
                    var xmlGetBlock = Blockly.utils.xml.createElement('block');
                    xmlGetBlock.setAttribute('type', 'variables_get');
                    xmlGetBlock.appendChild(xmlField);
                    argOption.callback = Blockly.ContextMenu.callbackFactory(this, xmlGetBlock);
                    options.push(argOption);
                });
            }
        }
    },
    callType_: 'procedures_callnoreturn'
};
Blockly.Blocks['procedures_defreturn'] = {
    init: function () {
        var a = Blockly.Procedures.findLegalName("", this);
        a = new Blockly.FieldTextInput(a, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["int", "INT"], ["char", "CHAR"]]), "TYPE")
            .appendField(a, "NAME")
            .appendField("( )", "PARAMS").appendField("{");
        this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        (this.workspace.options.comments ||
            this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT && this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
        this.appendDummyInput().appendField("; }");
    },
    setStatements_: Blockly.Blocks.procedures_defnoreturn.setStatements_,
    updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
    mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
    decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
    compose: Blockly.Blocks.procedures_defnoreturn.compose,
    getProcedureDef: function () {
        return [this.getFieldValue("NAME"), this.arguments_, !0]
    },
    getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
    getVarModels: Blockly.Blocks.procedures_defnoreturn.getVarModels,
    renameVarById: Blockly.Blocks.procedures_defnoreturn.renameVarById,
    updateVarName: Blockly.Blocks.procedures_defnoreturn.updateVarName,
    displayRenamedVar_: Blockly.Blocks.procedures_defnoreturn.displayRenamedVar_,
    customContextMenu: Blockly.Blocks.procedures_defnoreturn.customContextMenu,
    callType_: "procedures_callreturn"
};
Blockly.Blocks.procedures_mutatorcontainer = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} procedures_mutatorcontainer`);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput("STACK");
        this.appendDummyInput("STATEMENT_INPUT");
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.procedures_mutatorarg = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootProcedures} procedures_mutatorarg`);
        var a = new Blockly.FieldTextInput(Blockly.Procedures.DEFAULT_ARG, this.validator_);
        a.oldShowEditorFn_ = a.showEditor_;
        a.showEditor_ = function () {
            this.createdVariables_ = [];
            this.oldShowEditorFn_()
        };
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([["int", "INT"], ["char", "CHAR"]]), "TYPE").appendField(a, "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = !1;
        a.onFinishEditing_ = this.deleteIntermediateVars_;
        a.createdVariables_ = [];
        a.onFinishEditing_("x")
    },
    validator_: function (a) {
        var b = this.getSourceBlock(),
            c = Blockly.Mutator.findParentWs(b.workspace);
        a = a.replace(/[\s\xa0]+/g, " ").replace(/^ | $/g, "");
        if (!a) return null;
        for (var d = (b.workspace.targetWorkspace || b.workspace).getAllBlocks(!1), e = a.toLowerCase(), f = 0; f < d.length; f++)
            if (d[f].id != this.getSourceBlock().id) {
                var g = d[f].getFieldValue("NAME");
                if (g && g.toLowerCase() == e) return null
            } if (b.isInFlyout) return a;
        (b = c.getVariable(a, "")) && b.name != a && c.renameVariableById(b.getId(), a);
        b || (b = c.createVariable(a, "")) && this.createdVariables_ && this.createdVariables_.push(b);
        return a
    },
    deleteIntermediateVars_: function (a) {
        var b = Blockly.Mutator.findParentWs(this.getSourceBlock().workspace);
        if (b)
            for (var c = 0; c < this.createdVariables_.length; c++) {
                var d = this.createdVariables_[c];
                d.name != a && b.deleteVariableById(d.getId())
            }
    }
};
// Function to call
Blockly.Blocks.procedures_callnoreturn = {
    init: function () {
        this.appendDummyInput("TOPROW").appendField("", "NAME").appendField('( );', 'OPEN_CLOSE');
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousEnabledState_ = !0;
    },
    getProcedureCall: function () {
        return this.getFieldValue("NAME")
    },
    renameProcedure: function (a, b) {
        Blockly.Names.equals(a,
            this.getProcedureCall()) && (this.setFieldValue(b, "NAME"), this.setTooltip((this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1", b)))
    },
    setProcedureParameters_: function (a, b) {
        var c = Blockly.Procedures.getDefinition(this.getProcedureCall(), this.workspace),
            d = c && c.mutator && c.mutator.isVisible();
        d || (this.quarkConnections_ = {}, this.quarkIds_ = null);
        if (b)
            if (a.join("\n") == this.arguments_.join("\n")) this.quarkIds_ = b;
            else {
                if (b.length != a.length) throw RangeError("paramNames and paramIds must be the same length.");
                this.setCollapsed(!1);
                this.quarkIds_ || (this.quarkConnections_ = {}, this.quarkIds_ = []);
                c = this.rendered;
                this.rendered = !1;
                for (var e = 0; e < this.arguments_.length; e++) {
                    var f = this.getInput("ARG" + e);
                    f && (f = f.connection.targetConnection, this.quarkConnections_[this.quarkIds_[e]] = f, d && f && -1 == b.indexOf(this.quarkIds_[e]) && (f.disconnect(), f.getSourceBlock().bumpNeighbours()))
                }
                this.arguments_ = [].concat(a);
                this.argumentVarModels_ = [];
                for (e = 0; e < this.arguments_.length; e++) a = Blockly.Variables.getOrCreateVariablePackage(this.workspace,
                    null, this.arguments_[e], ""), this.argumentVarModels_.push(a);
                this.updateShape_();
                if (this.quarkIds_ = b)
                    for (e = 0; e < this.arguments_.length; e++) b = this.quarkIds_[e], b in this.quarkConnections_ && (f = this.quarkConnections_[b], Blockly.Mutator.reconnect(f, this, "ARG" + e) || delete this.quarkConnections_[b]);
                (this.rendered = c) && this.render()
            }
    },
    updateShape_: function () {
        const fieldOpenClose = this.getField("OPEN_CLOSE");
        if (fieldOpenClose.value_) {
            fieldOpenClose.value_ = '(';
            fieldOpenClose.name = 'OPEN';
            console.log(fieldOpenClose);
        }
        for (var a = 0; a < this.arguments_.length; a++) {
            let b = this.getField("ARGNAME" + a);
            if (!b) {
                const p = (a === 0) ? '' : ', ';
                this.appendValueInput("ARG" + a)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(p, "ARGNAME" + a);
            }
        }
        while (this.getInput("ARG" + a)) {
            this.removeInput("ARG" + a);
            a++;
        }
        this.appendDummyInput('CLOSING').appendField(') ;');
    },
    mutationToDom: function () {
        var a = Blockly.utils.xml.createElement("mutation");
        a.setAttribute("name", this.getProcedureCall());
        for (var b = 0; b < this.arguments_.length; b++) {
            var c = Blockly.utils.xml.createElement("arg");
            c.setAttribute("name", this.arguments_[b]);
            a.appendChild(c)
        }
        return a
    },
    domToMutation: function (a) {
        var b = a.getAttribute("name");
        this.renameProcedure(this.getProcedureCall(), b);
        b = [];
        for (var c = [], d = 0, e; e = a.childNodes[d]; d++) "arg" == e.nodeName.toLowerCase() && (b.push(e.getAttribute("name")), c.push(e.getAttribute("paramId")));
        this.setProcedureParameters_(b, c)
    },
    getVars: function () {
        return this.arguments_
    },
    getVarModels: function () {
        return this.argumentVarModels_
    },
    onchange: function (a) {
        if (this.workspace && !this.workspace.isFlyout && a.recordUndo)
            if (a.type == Blockly.Events.BLOCK_CREATE && -1 != a.ids.indexOf(this.id)) {
                var b = this.getProcedureCall();
                b = Blockly.Procedures.getDefinition(b, this.workspace);
                !b || b.type == this.defType_ && JSON.stringify(b.getVars()) == JSON.stringify(this.arguments_) || (b = null);
                if (!b) {
                    Blockly.Events.setGroup(a.group);
                    a = Blockly.utils.xml.createElement("xml");
                    b = Blockly.utils.xml.createElement("block");
                    b.setAttribute("type", this.defType_);
                    var c = this.getRelativeToSurfaceXY(),
                        d = c.y + 2 * Blockly.SNAP_RADIUS;
                    b.setAttribute("x", c.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1));
                    b.setAttribute("y", d);
                    c = this.mutationToDom();
                    b.appendChild(c);
                    c = Blockly.utils.xml.createElement("field");
                    c.setAttribute("name", "NAME");
                    d = this.getProcedureCall();
                    d || (d = Blockly.Procedures.findLegalName("", this), this.renameProcedure("", d));
                    c.appendChild(Blockly.utils.xml.createTextNode(d));
                    b.appendChild(c);
                    a.appendChild(b);
                    Blockly.Xml.domToWorkspace(a, this.workspace);
                    Blockly.Events.setGroup(!1)
                }
            } else a.type == Blockly.Events.BLOCK_DELETE ?
                (b = this.getProcedureCall(), b = Blockly.Procedures.getDefinition(b, this.workspace), b || (Blockly.Events.setGroup(a.group), this.dispose(!0), Blockly.Events.setGroup(!1))) : a.type == Blockly.Events.CHANGE && "disabled" == a.element && (b = this.getProcedureCall(), (b = Blockly.Procedures.getDefinition(b, this.workspace)) && b.id == a.blockId && ((b = Blockly.Events.getGroup()) && console.log("Saw an existing group while responding to a definition change"), Blockly.Events.setGroup(a.group), a.newValue ? (this.previousEnabledState_ = this.isEnabled(),
                    this.setEnabled(!1)) : this.setEnabled(this.previousEnabledState_), Blockly.Events.setGroup(b)))
    },
    customContextMenu: function (a) {
        if (this.workspace.isMovable()) {
            var b = {
                enabled: !0
            };
            b.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
            var c = this.getProcedureCall(),
                d = this.workspace;
            b.callback = function () {
                var e = Blockly.Procedures.getDefinition(c, d);
                e && (d.centerOnBlock(e.id), e.select())
            };
            a.push(b)
        }
    },
    defType_: "procedures_defnoreturn"
};
Blockly.Blocks['procedures_callreturn'] = {
    init: function () {
        this.appendDummyInput("TOPROW").appendField("", "NAME").appendField('( );', 'OPEN_CLOSE');
        this.setOutput(!0);
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousEnabledState_ = !0;
    },
    getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
    renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
    setProcedureParameters_: Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
    updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
    mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
    getVars: Blockly.Blocks['procedures_callnoreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_callnoreturn'].getVarModels,
    onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
    customContextMenu: Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
    defType_: "procedures_defreturn"
};

Blockly.Blocks['procedures_ifreturn'] = {
    init: function () {
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if (");
        this.appendValueInput("VALUE").appendField(") return");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setStyle("procedure_blocks");
        this.setColour(COLOUR_PROCEDURE_BLOCK);
        this.setTooltip("If the condition is true, returns the value.");
        this.setHelpUrl(Blockly.Msg.PROCEDURES_IFRETURN_HELPURL);
        this.hasReturnValue_ = true;
        this.appendDummyInput().appendField(';');
    },
    mutationToDom: function () {
        var mutation = Blockly.utils.xml.createElement("mutation");
        mutation.setAttribute("value", Number(this.hasReturnValue_));
        return mutation;
    },
    domToMutation: function (mutation) {
        this.hasReturnValue_ = 1 == mutation.getAttribute("value");
        if (!this.hasReturnValue_) {
            this.removeInput("VALUE");
            this.appendDummyInput("VALUE").appendField("return");
        }
    },
    onchange: function (event) {
        if (this.workspace.isDragging && !this.workspace.isDragging()) {
            var isInsideFunction = false;
            var block = this;
            do {
                if (block.type === "procedures_defnoreturn" || block.type === "procedures_defreturn") {
                    isInsideFunction = true;
                    break;
                }
                block = block.getSurroundParent();
            } while (block);

            if (isInsideFunction) {
                if (block.type === "procedures_defnoreturn" && this.hasReturnValue_) {
                    this.removeInput("VALUE");
                    this.appendDummyInput("VALUE").appendField("return");
                    this.hasReturnValue_ = false;
                } else if (block.type === "procedures_defreturn" && !this.hasReturnValue_) {
                    this.removeInput("VALUE");
                    this.appendValueInput("VALUE").appendField("return");
                    this.hasReturnValue_ = true;
                }
                this.setWarningText(null);
                if (!this.isInFlyout && !this.getInheritedDisabled()) {
                    this.setEnabled(true);
                }
            } else {
                this.setWarningText("This block must be inside a function definition.");
                if (!this.isInFlyout && !this.getInheritedDisabled()) {
                    this.setEnabled(false);
                }
            }
        }
    }
};

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
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.arguments_ = [];
        this.types_ = [];
        this.appendDummyInput().appendField("}");

    },
    getName: function () {
        return ["Main"];
    },
    getParamInfo: function () {
        return [];
    }
};
