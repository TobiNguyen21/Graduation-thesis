const rootVariables = '[blocks][variables]';

Blockly.Blocks.variables = {};
Blockly.Blocks.define_get = {
    init: function () {
        this.setColour(160);
        this.appendDummyInput().appendField(Blockly.Msg.DEFINE_GET_TITLE).appendField(new Blockly.FieldVariableDefine(Blockly.Msg.SELECT_MENU, null, this), "VAR").appendField(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setOutput(!0, "Macro");
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        this.contextMenuType_ = "variables_set";
        this.tag = Blockly.Msg.TAG_DEFINE_GET
        console.log("define_get");
    },
    getTags: function () {
        return this.tag
    },
    getVars: function () {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function (a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    customContextMenu: function (a) {
        var b = {
            enabled: !0
        },
            c = this.getFieldValue("VAR");
        b.text = this.contextMenuMsg_.replace("%1", c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b)
    },
    onchange: Blockly.Blocks.requireInFunction
};
Blockly.Blocks.define_declare = {
    init: function () {
        this.setColour(160);
        var a = Blockly.Procedures.findLegalName(Blockly.Msg.DEFINE_DECLARE_DEFAULT_NAME, this);
        this.interpolateMsg(Blockly.Msg.DEFINE_DECLARE_TITLE + " " + Blockly.Msg.VARIABLES_DECLARE_NAME + " %1 " + Blockly.Msg.DEFINE_DECLARE_INIT + " %2", ["VAR", new Blockly.FieldTextInput(a, Blockly.Procedures.rename)], ["VALUE", null, Blockly.ALIGN_RIGHT], Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(!0, ["define_declare"]);
        this.setNextStatement(!0, ["define_declare",
            "main_block"
        ]);
        this.setTooltip(Blockly.Msg.VARIABLES_DECLARE_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = "define_get";
        this.tag = Blockly.Msg.TAG_DEFINE_DECLARE;
        this.macroType_ = "Macro"
    },
    initVar: function () {
        this.setFieldValue("", "VAR")
    },
    getTypes: function () {
        return [this.macroType_]
    },
    getDist: function () {
        return "d"
    },
    getScope: function () {
        return ["Global"]
    },
    getSpec: function () {
        return null
    },
    getPos: function () {
        return this.getRelativeToSurfaceXY().y
    },
    getDeclare: function () {
        return [this.getFieldValue("VAR")]
    },
    getVars: function () {
        return [this.getFieldValue("VAR")]
    },
    renameVar: function (a, b) {
        Blockly.Names.equals(a, this.getFieldValue("VAR")) && this.setFieldValue(b, "VAR")
    },
    customContextMenu: Blockly.Blocks.define_get.customContextMenu,
    onchange: function () {
        Blockly.Blocks.requireOutFunction();
        if (this.getInputTargetBlock("VALUE")) {
            var a = this.getInputTargetBlock("VALUE");
            a.type.match("math") ? this.macroType_ = "int" : a.type.match("text") && (1 == a.getFieldValue("TEXT").length ? this.macroType_ = "char" : this.macroType_ = "dbchar")
        }
    }
};

/**
 * [Toolbox][Variables] - Select block
 */
Blockly.Blocks.variables_get = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootVariables} variables_get`);
        this.setColour(250);
        this.appendDummyInput()
            .appendField(Blockly.Msg.VARIABLES_GET_TITLE)
            .appendField(new Blockly.FieldVariable(Blockly.Msg.SELECT_MENU, null, this), "VAR")
            .appendField(Blockly.Msg.VARIABLES_GET_TAIL);
        this.setOutput(true, "Variable");
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
        this.contextMenuType_ = "variables_set";
        this.tag = Blockly.Msg.TAG_VARIABLE_GET;
    },
    getVars: function () {
        return [this.getFieldValue("VAR")];
    },
    getPos: function () {
        return this.getRelativeToSurfaceXY().y;
    },
    renameVar: function (a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    customContextMenu: function (a) {
        var b = {
            enabled: true,
        };
        var c = this.getFieldValue("VAR");
        b.text = this.contextMenuMsg_.replace("%1", c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b);
    },
    onchange: function () {
        Blockly.Blocks.requireInFunction(this);
        var a = this.getFieldValue("VAR");
        a = Blockly.FieldDropdown.prototype.getTypefromVars(a, 0);
        this.setOutputType("VAR", a);
    },
    setOutputType: function (a, b) {
        switch (b) {
            case "int":
                this.changeOutput(a + "_INT");
                break;
            case "unsigned int":
                this.changeOutput(a + "_UNINT");
                break;
            case "float":
                this.changeOutput(a + "_FLOAT");
                break;
            case "double":
                this.changeOutput(a + "_DOUBLE");
                break;
            case "char":
                this.changeOutput(a + "_CHAR");
        }
    },
};

/**
 * [Toolbox][Variables] - Set Select to block
 */
Blockly.Blocks.variables_set = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootVariables} variables_set`);
        this.setColour(250);
        this.interpolateMsg(
            Blockly.Msg.VARIABLES_SET_TITLE + " %1 " + Blockly.Msg.VARIABLES_SET_TAIL + " %2",
            ["VAR", new Blockly.FieldVariable(Blockly.Msg.SELECT_MENU, null, this)],
            ["VALUE", null, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = "variables_get";
        this.tag = Blockly.Msg.TAG_VARIABLE_SET;
    },
    getVars: function () {
        return [this.getFieldValue("VAR")];
    },
    getPos: function () {
        return this.getRelativeToSurfaceXY().y;
    },
    renameVar: function (a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    customContextMenu: Blockly.Blocks.variables_get.customContextMenu,
    onchange: function () {
        Blockly.Blocks.requireInFunction(this);
        var a = this.getFieldValue("VAR");
        a = Blockly.FieldDropdown.prototype.getTypefromVars(a, 0);
        if (a === 0) {
            a = "int";
        }
        Blockly.Blocks.setCheckVariable(this, a, "VALUE");
    },
};

/**
 * [Toolbox][Variables] - Init value block
 */
Blockly.Blocks.variables_declare = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootVariables} variables_declare`);
        var a = [
            [Blockly.Msg.VARIABLES_SET_TYPE_INT, "int"],
            // [Blockly.Msg.VARIABLES_SET_TYPE_UNSIGNED_INT, "unsigned int"],
            [Blockly.Msg.VARIABLES_SET_TYPE_FLOAT, "float"],
            [Blockly.Msg.VARIABLES_SET_TYPE_DOUBLE, "double"],
            [Blockly.Msg.VARIABLES_SET_TYPE_CHAR, "char"]
        ];
        this.setColour(250);
        var b = Blockly.Procedures.findLegalName(Blockly.Msg.VARIABLES_DECLARE_DEFAULT_NAME, this);
        this.interpolateMsg(
            "%1 " + Blockly.Msg.VARIABLES_DECLARE_TITLE + Blockly.Msg.VARIABLES_DECLARE_NAME + " %2 " + Blockly.Msg.VARIABLES_DECLARE_INIT + " %3 ",
            ["TYPES", new Blockly.FieldDropdown(a, null, this)],
            ["VAR", new Blockly.FieldTextInput(b, Blockly.Procedures.rename)],
            ["VALUE", null, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT
        );
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.VARIABLES_DECLARE_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
        this.contextMenuType_ = "variables_get";
        this.tag = Blockly.Msg.TAG_VARIABLE_DECLARE;
        this.oldName = b;
    },
    initVar: Blockly.Blocks.define_declare.initVar,
    getDist: function () {
        return "v";
    },
    getScope: function () {
        if (this.getSurroundParent()) {
            return this.getSurroundParent().getName();
        }
    },
    getSpec: function () {
        return null;
    },
    getPos: function () {
        return this.getRelativeToSurfaceXY().y;
    },
    getTypes: function () {
        return [this.getFieldValue("TYPES")];
    },
    getVars: function () {
        return [this.getFieldValue("VAR")];
    },
    getDeclare: function () {
        return [this.getFieldValue("VAR")];
    },
    renameVar: function (a, b) {
        if (Blockly.Names.equals(a, this.getFieldValue("VAR"))) {
            this.setFieldValue(b, "VAR");
        }
    },
    customContextMenu: Blockly.Blocks.variables_get.customContextMenu,
    onchange: function () {
        Blockly.Blocks.variablePlaceCheck(this);
        var a = this.getFieldValue("TYPES");
        if (a === 0) {
            a = "int";
        }
        Blockly.Blocks.setCheckVariable(this, a, "VALUE");
        a = this.getFieldValue("VAR");
        if (this.oldName !== a) {
            var b = this.getScope();
            if (b) {
                Blockly.Variables.renameVariablebyScope(this.oldName, a, b[0]);
            }
            this.oldName = a;
        }
    },
};