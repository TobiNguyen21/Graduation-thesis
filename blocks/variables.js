const rootVariables = '[blocks][variables]';
const COLOUR_VAR_BLOCK = 330;

// Variables
Blockly.Blocks.variables = {};
Blockly.Constants.Variables = {};
Blockly.Constants.Variables.HUE = 330;
Blockly.defineBlocksWithJsonArray([
    {
        type: "variables_get",
        message0: "%1",
        args0: [{
            type: "field_variable",
            name: "VAR",
            variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
        }],
        output: "variables_get",
        style: "variable_blocks",
        extensions: ["contextMenu_variableSetterGetter"]
    }, {
        type: "variables_set",
        message0: "%{BKY_VARIABLES_SET}",
        args0: [
            {
                type: "field_dropdown",
                name: "TYPE",
                options: [
                    ["int", "INTEGER"],
                    ["char", "CHAR"]
                ]
            },
            {
                type: "field_variable",
                name: "VAR",
                variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
            }, {
                type: "input_value",
                name: "VALUE"
            }],
        previousStatement: null,
        nextStatement: null,
        style: "variable_blocks",
        extensions: ["contextMenu_variableSetterGetter"]
    }
]);
Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
    customContextMenu: function (a) {
        if (!this.isInFlyout) {
            if ("variables_get" == this.type) var b = "variables_set",
                c = Blockly.Msg.VARIABLES_GET_CREATE_SET;
            else b = "variables_get", c = Blockly.Msg.VARIABLES_SET_CREATE_GET;
            var d = {
                enabled: 0 < this.workspace.remainingCapacity()
            },
                e = this.getField("VAR").getText();
            d.text = c.replace("%1", e);
            c = Blockly.utils.xml.createElement("field");
            c.setAttribute("name", "VAR");
            c.appendChild(Blockly.utils.xml.createTextNode(e));
            e = Blockly.utils.xml.createElement("block");
            e.setAttribute("type", b);
            e.appendChild(c);
            d.callback = Blockly.ContextMenu.callbackFactory(this, e);
            a.push(d)
        } else if ("variables_get" == this.type || "variables_get_reporter" == this.type) b = {
            text: Blockly.Msg.RENAME_VARIABLE,
            enabled: !0,
            callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
        }, e = this.getField("VAR").getText(), d = {
            text: Blockly.Msg.DELETE_VARIABLE.replace("%1", e),
            enabled: !0,
            callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
        },
            a.unshift(b), a.unshift(d)
    }
};
Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        Blockly.Variables.renameVariable(b, c)
    }
};
Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        b.deleteVariableById(c.getId());
        b.refreshToolboxSelection()
    }
};
Blockly.Extensions.registerMixin("contextMenu_variableSetterGetter", Blockly.Constants.Variables.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);
Blockly.Constants.VariablesDynamic = {};
Blockly.Constants.VariablesDynamic.HUE = 310;
Blockly.defineBlocksWithJsonArray([{
    type: "variables_get_dynamic",
    message0: "%1",
    args0: [{
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    output: null,
    style: "variable_dynamic_blocks",
    extensions: ["contextMenu_variableDynamicSetterGetter"]
}, {
    type: "variables_set_dynamic",
    message0: "%{BKY_VARIABLES_SET}",
    args0: [{
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
    }, {
        type: "input_value",
        name: "VALUE"
    }],
    previousStatement: null,
    nextStatement: null,
    style: "variable_dynamic_blocks",
    extensions: ["contextMenu_variableDynamicSetterGetter"]
}]);
Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN = {
    customContextMenu: function (a) {
        if (!this.isInFlyout) {
            var b = this.getFieldValue("VAR");
            var c = this.workspace.getVariableById(b).type;
            if ("variables_get_dynamic" == this.type) {
                b = "variables_set_dynamic";
                var d = Blockly.Msg.VARIABLES_GET_CREATE_SET
            } else b = "variables_get_dynamic", d = Blockly.Msg.VARIABLES_SET_CREATE_GET;
            var e = {
                enabled: 0 < this.workspace.remainingCapacity()
            },
                f = this.getField("VAR").getText();
            e.text = d.replace("%1", f);
            d = Blockly.utils.xml.createElement("field");
            d.setAttribute("name", "VAR");
            d.setAttribute("variabletype", c);
            d.appendChild(Blockly.utils.xml.createTextNode(f));
            f = Blockly.utils.xml.createElement("block");
            f.setAttribute("type", b);
            f.appendChild(d);
            e.callback = Blockly.ContextMenu.callbackFactory(this, f);
            a.push(e)
        } else if ("variables_get_dynamic" == this.type || "variables_get_reporter_dynamic" == this.type) b = {
            text: Blockly.Msg.RENAME_VARIABLE,
            enabled: !0,
            callback: Blockly.Constants.Variables.RENAME_OPTION_CALLBACK_FACTORY(this)
        },
            f = this.getField("VAR").getText(), e = {
                text: Blockly.Msg.DELETE_VARIABLE.replace("%1", f),
                enabled: !0,
                callback: Blockly.Constants.Variables.DELETE_OPTION_CALLBACK_FACTORY(this)
            }, a.unshift(b), a.unshift(e)
    },
    onchange: function (a) {
        a = this.getFieldValue("VAR");
        a = Blockly.Variables.getVariable(this.workspace, a);
        "variables_get_dynamic" == this.type ? this.outputConnection.setCheck(a.type) : this.getInput("VALUE").connection.setCheck(a.type)
    }
};
Blockly.Constants.VariablesDynamic.RENAME_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        Blockly.Variables.renameVariable(b, c)
    }
};
Blockly.Constants.VariablesDynamic.DELETE_OPTION_CALLBACK_FACTORY = function (a) {
    return function () {
        var b = a.workspace,
            c = a.getField("VAR").getVariable();
        b.deleteVariableById(c.getId());
        b.refreshToolboxSelection()
    }
};
Blockly.Extensions.registerMixin("contextMenu_variableDynamicSetterGetter", Blockly.Constants.VariablesDynamic.CUSTOM_CONTEXT_MENU_VARIABLE_GETTER_SETTER_MIXIN);


Blockly.Blocks['variables_declare'] = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootVariables} variable_declare`);
        this.setColour(COLOUR_VAR_BLOCK);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["int", "INT"], ["char", "CHAR"]]), "TYPE")
            .appendField(new Blockly.FieldTextInput("a"), "VAR")
            .appendField(";");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    },
    // onchange: function (event) {
    //     if (event && event.type == Blockly.Events.BLOCK_CREATE && event.blockId == this.id) {
    //         const workspace = this.workspace;
    //         const existingBlock = workspace.getAllBlocks().find(block => block.id != this.id && block.type == this.type);
    //         if (existingBlock) {
    //             window.alert("Block already exists in workspace!");
    //             workspace.getBlockById(this.id).dispose();
    //         }
    //     }
    // }
};

Blockly.Blocks['variables_assignment'] = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootVariables} var_assignment`);
        this.setColour(COLOUR_VAR_BLOCK);
        this.appendValueInput('A')
            .setCheck(["Variable", "variables_array_get_name", "variables_array_declare_2", "variables_get"])
            .appendField('');
        this.appendValueInput('B')
            .setCheck(null)
            .appendField('=');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.appendDummyInput().appendField(';');
    },
    onchange : function () {

    }
};

// Blockly.Blocks['variables_get_ver2'] = {
//     init: function () {
//         const list_var = JSON.parse(localStorage.getItem('list_var')) || [];
//         const listSelect = list_var.map((item) => {
//             return [item, item];
//         });
//         console.log({ list_var, listSelect });
//         this.setColour(COLOUR_VAR_BLOCK);
//         this.appendDummyInput()
//             .appendField(new Blockly.FieldDropdown([["Select", "SELECT"], ...listSelect]), "TYPE");
//         this.setOutput(true, null);
//         this.setTooltip("");
//         this.setHelpUrl("");
//     },
// };
