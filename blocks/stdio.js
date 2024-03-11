const rootStdio = "[blocks][stdio]";

Blockly.Blocks.stdio = {};

/**
 * [Toolbox][Variables] - Char block 
 */
Blockly.Blocks.library_stdio_text_char = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_text_char`);
        this.setHelpUrl(Blockly.Msg.TEXT_CHAR);
        this.setColour(90);
        this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "CHAR").appendField(this.newQuote_(!1));
        this.setOutput(!0, ["VAR_CHAR", "CHAR"]);
        this.setTooltip(Blockly.Msg.TEXT_CHAR_TOOLTIP)
    },
    newQuote_: function (a) {
        return new Blockly.FieldImage(a == this.RTL ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVRIibXUsWsUQRiG8eeLMYlnpRIVlIgQESySIoUonCBqpaJFCgURwULwT7CwsEglWNhbCVZaWAUObCystBCUgIgWQa4ydhIVHovsyeXYWTNzlxeWhfmG3367szOwTYlUQT0AHAMmgN/VtQp0I+JP9pPUGfWp6XTV++pMDnqmAazL4lbQuUy0l8tN6JT6shD+os6m4HYh2suTQXOsup/c2ioks6AeroPXh4TngIU6eBS5qY5vB9wCdg7CP0YAHwX2DsJvRwCv03dEjAFExEdgaUh4EnATXOUh0BkCXmPjoNoMR8QacAm4VQi3gB3/vLoZagtoA+eAI9Xwr+p+IwG/By5GxGpRW+rdxLZeUQ/15mX9x9UGaCfKn4DvRTCwGziYqHUi4memtxH1RMMJN98/N7fjq4nxZeBzabez6rdEt+dL0Qn1WQJ9rk6WwtcSaFc9XopeaFiwO6Xo2Qa07BOoiw3oa3VfLthSlxrQN2pqkyTR0+qHkaHqtPqoAVTtqHty0Ov/AVUfmLlQ48B8Q/0rcDsiXuWgvY73q+9qunyc9eoJ/EofuKKeGgrsg6fUF+o9ddcozL8mXx4vauBlKQAAAABJRU5ErkJggg==" :
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrElEQVRIia3WMWsUQRyG8WcOYmw8kQjRBIIgCBoQLYJgEZA02qopRbCxEMRvYBWEpBHyCdKIjZA+GCwCMRYBG40gaHVqwIAoaPdY3AbP3M5udmZfWFjY2d/MDvPfGciMekJdVpfUTq43CF9Xv/ovV9pAJ9RnDmdNPZYD3y5BB3MvBe2qKzVwT73WFJ5UN2vgx+rxpvBZ9W0FuqVON0IL+Jy6UwE/UI+kwFM1I55tjBZw1/6yKktPvZgEF/iTCvhyDny1YirmcuCuuh6BF5LhAr8bgbfVUznwmPFCaV7SB/AbEfijOpVidgq4A9yKtHkH7CbjwDhwKdJmI4TwJwcHGIm0eZ8CAwQAdQZ4E2nzBXhZ3O//R3aAdWCr9qvU2YrCqUpPvWlk78zdUE8DL4Dn6tG28f3MA3di+B7wLbODR+pkGf69BfwCcKYM7wCjmThA6ch/AJ9awMeH8BDCL2C1BfznEF7kFfnz/t/7g/hn4HUm3os+UWcSK1X7p7HqulHvJ8CH/+erDxvCzU5c6nl1sQZ+qp6MGeEQnYwCE/TX8Ehx/QY+hBD2Go24zfwFdQY82azgsTIAAAAASUVORK5CYII=",
            6, 12, '"')
    },
    onchange: function (a) {
        a = this.getFieldValue("CHAR");
        null != a && 1 < a.length ? a.startsWith("\\") ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.TEXT_CHAR_WARNING) : this.setWarningText(null)
    }
};

/**
 * [Toolbox][Output] - Print block 
 */
Blockly.Blocks.library_stdio_printf = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_printf`);
        this.setColour(280);
        this.appendValueInput("VAR0")
            .setCheck(null)
            .appendField(Blockly.Msg.STDIO_PRINTF_TITLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setMutator(new Blockly.Mutator(["library_stdio_printf_add"]));
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDIO_PRINTF;
        this.printAddCount_ = 0;
    },
    mutationToDom: function () {
        if (!this.printAddCount_) return null;
        var mutationElement = document.createElement("mutation");
        mutationElement.setAttribute("printadd", this.printAddCount_);
        return mutationElement;
    },
    domToMutation: function (mutationElement) {
        this.printAddCount_ = parseInt(mutationElement.getAttribute("printadd"), 10);
        for (var i = 1; i <= this.printAddCount_; i++) {
            this.appendValueInput("VAR" + i)
                .setCheck(null)
                .appendField("");
        }
    },
    decompose: function (workspace) {
        var printfBlock = Blockly.Block.obtain(workspace, "library_stdio_printf_printf");
        printfBlock.initSvg();
        var stackConnection = printfBlock.getInput("STACK").connection;
        for (var i = 1; i <= this.printAddCount_; i++) {
            var addBlock = Blockly.Block.obtain(workspace, "library_stdio_printf_add");
            addBlock.initSvg();
            stackConnection.connect(addBlock.previousConnection);
            stackConnection = addBlock.nextConnection;
        }
        return printfBlock;
    },
    compose: function (printfBlock) {
        for (var i = this.printAddCount_; i > 0; i--) {
            this.removeInput("VAR" + i);
        }
        this.printAddCount_ = 0;
        var inputTargetBlock = printfBlock.getInputTargetBlock("STACK");
        while (inputTargetBlock) {
            switch (inputTargetBlock.type) {
                case "library_stdio_printf_add":
                    this.printAddCount_++;
                    var valueInput = this.appendValueInput("VAR" + this.printAddCount_)
                        .setCheck(null)
                        .appendField("");
                    if (inputTargetBlock.valueConnection_) {
                        valueInput.connection.connect(inputTargetBlock.valueConnection_);
                    }
                    break;
                default:
                    throw "Unknown block type.";
            }
            inputTargetBlock = inputTargetBlock.nextConnection && inputTargetBlock.nextConnection.targetBlock();
        }
    },
    saveConnections: function (printfBlock) {
        var inputTargetBlock = printfBlock.getInputTargetBlock("STACK");
        var varCount = 1;
        while (inputTargetBlock) {
            switch (inputTargetBlock.type) {
                case "library_stdio_printf_add":
                    var varInput = this.getInput("VAR" + varCount);
                    inputTargetBlock.valueConnection_ = varInput && varInput.connection.targetConnection;
                    inputTargetBlock.statementConnection_ = varCount++;
                    break;
                default:
                    throw "Unknown block type.";
            }
            inputTargetBlock = inputTargetBlock.nextConnection && inputTargetBlock.nextConnection.targetBlock();
        }
    },
    onchange: Blockly.Blocks.requireInFunction,
};

/**
 * [Toolbox][Output] - Print block in print block 
 */
Blockly.Blocks.library_stdio_printf_printf = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_printf_printf`);
        this.setColour(280);
        this.appendDummyInput().appendField(Blockly.Msg.STDIO_PRINTF_TITLE);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
        this.contextMenu = !1
    }
};

/**
 * [Toolbox][Output] - Add block in print block 
 */
Blockly.Blocks.library_stdio_printf_add = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_printf_add`);
        this.setColour(280);
        this.appendDummyInput().appendField(Blockly.Msg.STDIP_PRINTF_MUTATOR_PRINTFADD_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.TEXT_PRINT_TOOLTIP);
        this.contextMenu = !1
    }
};

/**
 * [Toolbox][Output] - Text block 
 */
Blockly.Blocks.library_stdio_text = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_text`);
        this.setColour(90);
        this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDIO_TEXT
    },
    newQuote_: function (a) {
        return new Blockly.FieldImage(a == this.RTL ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==" :
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC", 12, 12, '"')
    },
    onchange: function () {
        Blockly.Blocks.requireInFunction();
        this.getFieldValue("TEXT") && (1 == this.getFieldValue("TEXT").length ? this.changeOutput("CHAR") : this.changeOutput("STR"))
    }
};

/**
 * [Toolbox][Output] - NewLine block 
 */
Blockly.Blocks.library_stdio_newLine = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_newLine`);
        this.setColour(90);
        this.interpolateMsg(Blockly.Msg.STDIO_NEWLINE_TITLE, Blockly.ALIGN_RIGHT);
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.STDIO_NEWLINE_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDIO_NEWLINE
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Output] - Tab block 
 */
Blockly.Blocks.library_stdio_tab = {
    init: function () {
        this.setColour(90);
        this.interpolateMsg(Blockly.Msg.STDIO_TAB_TITLE, Blockly.ALIGN_RIGHT);
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.STDIO_TAB_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDIO_TAB
    },
    onchange: Blockly.Blocks.requireInFunction
};

/**
 * [Toolbox][Input] - Scanf block 
 */
Blockly.Blocks.library_stdio_scanf = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_scanf`);
        this.setColour(280);
        this.appendValueInput("VAR0").setCheck("Variable VAR_INT VAR_UNINT VAR_FLOAT VAR_DOUBLE VAR_CHAR Array Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR Aster".split(" ")).appendField(Blockly.Msg.STDIO_SCANF_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setMutator(new Blockly.Mutator(["library_stdio_scanf_add"]));
        this.setTooltip(Blockly.Msg.STDIO_SCANF_TOOLTIP);
        this.tag = Blockly.Msg.TAG_STDIO_SCANF;
        this.scanAddCount_ = 0
    },
    mutationToDom: function () {
        if (!this.scanAddCount_) return null;
        var a = document.createElement("mutation");
        this.scanAddCount_ && a.setAttribute("scanadd", this.scanAddCount_);
        return a
    },
    domToMutation: function (a) {
        this.scanAddCount_ = parseInt(a.getAttribute("scanadd"), 10);
        for (a = 1; a <= this.scanAddCount_; a++) this.appendValueInput("VAR" + a).setCheck("Variable VAR_INT VAR_UNINT VAR_FLOAT VAR_DOUBLE VAR_CHAR Array Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR Aster".split(" ")).appendField("")
    },
    decompose: function (a) {
        var b = Blockly.Block.obtain(a, "library_stdio_scanf_scanf");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, e = 1; e <= this.scanAddCount_; e++) {
            var d = Blockly.Block.obtain(a, "library_stdio_scanf_add");
            d.initSvg();
            c.connect(d.previousConnection);
            c = d.nextConnection
        }
        return b
    },
    compose: function (a) {
        for (var b = this.scanAddCount_; 0 < b; b--) this.removeInput("VAR" + b);
        this.scanAddCount_ = 0;
        for (a = a.getInputTargetBlock("STACK"); a;) {
            switch (a.type) {
                case "library_stdio_scanf_add":
                    this.scanAddCount_++;
                    b = this.appendValueInput("VAR" + this.scanAddCount_).setCheck("Variable VAR_INT VAR_UNINT VAR_FLOAT VAR_DOUBLE VAR_CHAR Array Pointer PTR_INT PTR_UNINT PTR_FLOAT PTR_DOUBLE PTR_CHAR Aster".split(" ")).appendField("");
                    a.valueConnection_ && b.connection.connect(a.valueConnection_);
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    saveConnections: function (a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 1; a;) {
            switch (a.type) {
                case "library_stdio_scanf_add":
                    var c = this.getInput("VAR" +
                        b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = b++;
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    onchange: Blockly.Blocks.requireInFunction
};


/**
 * [Toolbox][Input] - Scanf block in scanf block
 */
Blockly.Blocks.library_stdio_scanf_scanf = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_scanf_scanf`);
        this.setColour(280);
        this.appendDummyInput().appendField(Blockly.Msg.STDIO_SCANF_TITLE);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.STDIO_SCANF_TOOLTIP);
        this.contextMenu = !1
    }
};


/**
 * [Toolbox][Input] - Add block in scanf block
 */
Blockly.Blocks.library_stdio_scanf_add = {
    init: function () {
        if (LOG_NAME_BLOCK) console.log(`${rootStdio} library_stdio_scanf_add`);
        this.setColour(280);
        this.appendDummyInput().appendField(Blockly.Msg.STDIP_SCANF_MUTATOR_SCANFADD_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.STDIO_SCANF_TOOLTIP);
        this.contextMenu = !1
    }
};