const rootProcedures = "[blocks][procedures]";
const COLOUR_PROCEDURE_BLOCK = 230;

Blockly.Blocks.procedures = {};

Blockly.Blocks.procedures_defnoreturn = {
    init: function () {
        var a = Blockly.Procedures.findLegalName("", this);
        a = new Blockly.FieldTextInput(a, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        (this.workspace.options.comments || this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT &&
            this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
        this.setStyle("procedure_blocks");
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
    },
    setStatements_: function (a) {
        this.hasStatements_ !== a && (a ? (this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO), this.getInput("RETURN") && this.moveInputBefore("STACK",
            "RETURN")) : this.removeInput("STACK", !0), this.hasStatements_ = a)
    },
    updateParams_: function () {
        var a = "";
        this.arguments_.length && (a = Blockly.Msg.PROCEDURES_BEFORE_PARAMS + " " + this.arguments_.join(", "));
        Blockly.Events.disable();
        try {
            this.setFieldValue(a, "PARAMS")
        } finally {
            Blockly.Events.enable()
        }
    },
    mutationToDom: function (a) {
        var b = Blockly.utils.xml.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.argumentVarModels_.length; c++) {
            var d = Blockly.utils.xml.createElement("arg"),
                e = this.argumentVarModels_[c];
            d.setAttribute("name", e.name);
            d.setAttribute("varid", e.getId());
            a && this.paramIds_ && d.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(d)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
    domToMutation: function (a) {
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++)
            if ("arg" == c.nodeName.toLowerCase()) {
                var d = c.getAttribute("name");
                c = c.getAttribute("varid") || c.getAttribute("varId");
                this.arguments_.push(d);
                c = Blockly.Variables.getOrCreateVariablePackage(this.workspace,
                    c, d, "");
                null != c ? this.argumentVarModels_.push(c) : console.log("Failed to create a variable with name " + d + ", ignoring.")
            } this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
    decompose: function (a) {
        var b = Blockly.utils.xml.createElement("block");
        b.setAttribute("type", "procedures_mutatorcontainer");
        var c = Blockly.utils.xml.createElement("statement");
        c.setAttribute("name", "STACK");
        b.appendChild(c);
        for (var d = 0; d < this.arguments_.length; d++) {
            var e =
                Blockly.utils.xml.createElement("block");
            e.setAttribute("type", "procedures_mutatorarg");
            var f = Blockly.utils.xml.createElement("field");
            f.setAttribute("name", "NAME");
            var g = Blockly.utils.xml.createTextNode(this.arguments_[d]);
            f.appendChild(g);
            e.appendChild(f);
            f = Blockly.utils.xml.createElement("next");
            e.appendChild(f);
            c.appendChild(e);
            c = f
        }
        a = Blockly.Xml.domToBlock(b, a);
        "procedures_defreturn" == this.type ? a.setFieldValue(this.hasStatements_, "STATEMENTS") : a.removeInput("STATEMENT_INPUT");
        Blockly.Procedures.mutateCallers(this);
        return a
    },
    compose: function (a) {
        this.arguments_ = [];
        this.paramIds_ = [];
        this.argumentVarModels_ = [];
        for (var b = a.getInputTargetBlock("STACK"); b && !b.isInsertionMarker();) {
            var c = b.getFieldValue("NAME");
            this.arguments_.push(c);
            c = this.workspace.getVariable(c, "");
            this.argumentVarModels_.push(c);
            this.paramIds_.push(b.id);
            b = b.nextConnection && b.nextConnection.targetBlock()
        }
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a = "TRUE" == a, this.hasStatements_ != a))
            if (a) this.setStatements_(!0),
                Blockly.Mutator.reconnect(this.statementConnection_, this, "STACK"), this.statementConnection_ = null;
            else {
                a = this.getInput("STACK").connection;
                if (this.statementConnection_ = a.targetConnection) a = a.targetBlock(), a.unplug(), a.bumpNeighbours();
                this.setStatements_(!1)
            }
    },
    getProcedureDef: function () {
        return [this.getFieldValue("NAME"), this.arguments_, !1]
    },
    getVars: function () {
        return this.arguments_
    },
    getVarModels: function () {
        return this.argumentVarModels_
    },
    renameVarById: function (a, b) {
        var c = this.workspace.getVariableById(a);
        if ("" == c.type) {
            c = c.name;
            b = this.workspace.getVariableById(b);
            for (var d = !1, e = 0; e < this.argumentVarModels_.length; e++) this.argumentVarModels_[e].getId() == a && (this.arguments_[e] = b.name, this.argumentVarModels_[e] = b, d = !0);
            d && (this.displayRenamedVar_(c, b.name), Blockly.Procedures.mutateCallers(this))
        }
    },
    updateVarName: function (a) {
        for (var b = a.name, c = !1, d = 0; d < this.argumentVarModels_.length; d++)
            if (this.argumentVarModels_[d].getId() == a.getId()) {
                var e = this.arguments_[d];
                this.arguments_[d] = b;
                c = !0
            } c && (this.displayRenamedVar_(e,
                b), Blockly.Procedures.mutateCallers(this))
    },
    displayRenamedVar_: function (a, b) {
        this.updateParams_();
        if (this.mutator && this.mutator.isVisible())
            for (var c = this.mutator.workspace_.getAllBlocks(!1), d = 0, e; e = c[d]; d++) "procedures_mutatorarg" == e.type && Blockly.Names.equals(a, e.getFieldValue("NAME")) && e.setFieldValue(b, "NAME")
    },
    customContextMenu: function (a) {
        if (!this.isInFlyout) {
            var b = {
                enabled: !0
            },
                c = this.getFieldValue("NAME");
            b.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1", c);
            var d = Blockly.utils.xml.createElement("mutation");
            d.setAttribute("name", c);
            for (c = 0; c < this.arguments_.length; c++) {
                var e = Blockly.utils.xml.createElement("arg");
                e.setAttribute("name", this.arguments_[c]);
                d.appendChild(e)
            }
            c = Blockly.utils.xml.createElement("block");
            c.setAttribute("type", this.callType_);
            c.appendChild(d);
            b.callback = Blockly.ContextMenu.callbackFactory(this, c);
            a.push(b);
            if (!this.isCollapsed())
                for (c = 0; c < this.argumentVarModels_.length; c++) b = {
                    enabled: !0
                }, d = this.argumentVarModels_[c], b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", d.name),
                    d = Blockly.Variables.generateVariableFieldDom(d), e = Blockly.utils.xml.createElement("block"), e.setAttribute("type", "variables_get"), e.appendChild(d), b.callback = Blockly.ContextMenu.callbackFactory(this, e), a.push(b)
        }
    },
    callType_: "procedures_callnoreturn"
};
Blockly.Blocks.procedures_defreturn = {
    init: function () {
        var a = Blockly.Procedures.findLegalName("", this);
        a = new Blockly.FieldTextInput(a, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
        this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        (this.workspace.options.comments ||
            this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT && this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
        this.setStyle("procedure_blocks");
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
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
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput("STACK");
        this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"), "STATEMENTS");
        this.setStyle("procedure_blocks");
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.procedures_mutatorarg = {
    init: function () {
        var a = new Blockly.FieldTextInput(Blockly.Procedures.DEFAULT_ARG, this.validator_);
        a.oldShowEditorFn_ = a.showEditor_;
        a.showEditor_ = function () {
            this.createdVariables_ = [];
            this.oldShowEditorFn_()
        };
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE).appendField(a, "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setStyle("procedure_blocks");
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
Blockly.Blocks.procedures_callnoreturn = {
    init: function () {
        this.appendDummyInput("TOPROW").appendField("", "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setStyle("procedure_blocks");
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousEnabledState_ = !0
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
        for (var a = 0; a < this.arguments_.length; a++) {
            var b = this.getField("ARGNAME" + a);
            if (b) {
                Blockly.Events.disable();
                try {
                    b.setValue(this.arguments_[a])
                } finally {
                    Blockly.Events.enable()
                }
            } else b =
                new Blockly.FieldLabel(this.arguments_[a]), this.appendValueInput("ARG" + a).setAlign(Blockly.ALIGN_RIGHT).appendField(b, "ARGNAME" + a).init()
        }
        for (; this.getInput("ARG" + a);) this.removeInput("ARG" + a), a++;
        if (a = this.getInput("TOPROW")) this.arguments_.length ? this.getField("WITH") || (a.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, "WITH"), a.init()) : this.getField("WITH") && a.removeField("WITH")
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
Blockly.Blocks.procedures_callreturn = {
    init: function () {
        this.appendDummyInput("TOPROW").appendField("", "NAME");
        this.setOutput(!0);
        this.setStyle("procedure_blocks");
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousEnabledState_ = !0
    },
    getProcedureCall: Blockly.Blocks.procedures_callnoreturn.getProcedureCall,
    renameProcedure: Blockly.Blocks.procedures_callnoreturn.renameProcedure,
    setProcedureParameters_: Blockly.Blocks.procedures_callnoreturn.setProcedureParameters_,
    updateShape_: Blockly.Blocks.procedures_callnoreturn.updateShape_,
    mutationToDom: Blockly.Blocks.procedures_callnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_callnoreturn.domToMutation,
    getVars: Blockly.Blocks.procedures_callnoreturn.getVars,
    getVarModels: Blockly.Blocks.procedures_callnoreturn.getVarModels,
    onchange: Blockly.Blocks.procedures_callnoreturn.onchange,
    customContextMenu: Blockly.Blocks.procedures_callnoreturn.customContextMenu,
    defType_: "procedures_defreturn"
};
Blockly.Blocks.procedures_ifreturn = {
    init: function () {
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setStyle("procedure_blocks");
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_IFRETURN_HELPURL);
        this.hasReturnValue_ = !0
    },
    mutationToDom: function () {
        var a =
            Blockly.utils.xml.createElement("mutation");
        a.setAttribute("value", Number(this.hasReturnValue_));
        return a
    },
    domToMutation: function (a) {
        this.hasReturnValue_ = 1 == a.getAttribute("value");
        this.hasReturnValue_ || (this.removeInput("VALUE"), this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN))
    },
    onchange: function (a) {
        if (this.workspace.isDragging && !this.workspace.isDragging()) {
            a = !1;
            var b = this;
            do {
                if (-1 != this.FUNCTION_TYPES.indexOf(b.type)) {
                    a = !0;
                    break
                }
                b = b.getSurroundParent()
            } while (b);
            a ? ("procedures_defnoreturn" == b.type && this.hasReturnValue_ ? (this.removeInput("VALUE"), this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN), this.hasReturnValue_ = !1) : "procedures_defreturn" != b.type || this.hasReturnValue_ || (this.removeInput("VALUE"), this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN), this.hasReturnValue_ = !0), this.setWarningText(null), this.isInFlyout || this.setEnabled(!0)) : (this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING),
                this.isInFlyout || this.getInheritedDisabled() || this.setEnabled(!1))
        }
    },
    FUNCTION_TYPES: ["procedures_defnoreturn", "procedures_defreturn"]
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
