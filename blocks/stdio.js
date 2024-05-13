const rootStdio = "[blocks][stdio]";

Blockly.Blocks.text_print = {
  init: function () {
    if (LOG_NAME_BLOCK) console.log(`${rootStdio} text_print`);
    this.jsonInit({
      message0: Blockly.Msg.TEXT_PRINT_TITLE,
      args0: [{
        type: "input_value",
        name: "TEXT"
      }, {
        type: "field_dropdown",
        name: "TYPE",
        options: [["%s", "%s"], ["%d", "%d"], ["%c", "%c"]]
      }],
      previousStatement: null,
      nextStatement: null,
      style: "text_blocks",
      tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
      helpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
    })
  },
  onchange: function () {
    let connectedBlock = null;
    const inputConnection = this.getInput('TEXT').connection;

    if (inputConnection.targetConnection) {

      connectedBlock = inputConnection.targetConnection.sourceBlock_;
      // %d: math_number, single_character_input, text, variables_get

      if (connectedBlock.type === 'text') {
        this.getField('TYPE').setValue('%s');
      }

      if (connectedBlock.type === 'math_number') {
        this.getField('TYPE').setValue('%d');
      }

      if (connectedBlock.type === 'single_character_input') {
        this.getField('TYPE').setValue('%c')
      }

      if (connectedBlock.type === 'variables_get') {
        const memory = JSON.parse(localStorage.getItem('memory'));
        const variableName = connectedBlock.getField("VAR").getVariable().name;
        if (memory[variableName]['type'] === 'INT')
          this.getField('TYPE').setValue('%d');
        if (memory[variableName]['type'] === 'CHAR')
          this.getField('TYPE').setValue('%c');
      }

      if (connectedBlock.type === "lists_getValueAtIndex") {
        const memory = JSON.parse(localStorage.getItem('memory'));
        const arrayName = connectedBlock.getField("ARRAY").value_;
        if (memory[arrayName]?.type === 'INT')
          this.getField('TYPE').setValue('%d');
        if (memory[arrayName]?.type === 'CHAR')
          this.getField('TYPE').setValue('%c');
      }
    }
  }
};

Blockly.Blocks.text_prompt_ext = {
  init: function () {
    if (LOG_NAME_BLOCK) console.log(`${rootStdio} text_prompt_ext`);
    var a = [
      [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setStyle("text_blocks");
    var b = this;
    a = new Blockly.FieldDropdown(a, function (c) {
      b.updateType_(c)
    });
    this.appendValueInput("TEXT").appendField(a, "TYPE");
    this.setOutput(!0, "String");
    this.setTooltip(function () {
      return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
    })
  },
  updateType_: function (a) {
    this.outputConnection.setCheck("NUMBER" == a ? "Number" : "String")
  },
  mutationToDom: function () {
    var a = Blockly.utils.xml.createElement("mutation");
    a.setAttribute("type", this.getFieldValue("TYPE"));
    return a
  },
  domToMutation: function (a) {
    this.updateType_(a.getAttribute("type"))
  }
};

Blockly.Blocks.text_prompt = {
  init: function () {
    this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
    var a = [
      [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]
    ],
      b = this;
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setStyle("text_blocks");
    a = new Blockly.FieldDropdown(a, function (c) {
      b.updateType_(c)
    });
    this.appendDummyInput().appendField(a, "TYPE").appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
    this.setOutput(!0, "String");
    this.setTooltip(function () {
      return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
    })
  },
  updateType_: Blockly.Blocks.text_prompt_ext.updateType_,
  mutationToDom: Blockly.Blocks.text_prompt_ext.mutationToDom,
  domToMutation: Blockly.Blocks.text_prompt_ext.domToMutation
};

Blockly.Blocks.text_scanf = {
  init: function () {
    this.jsonInit({
      message0: `scanf ( \"%2\", & %1 );`,
      args0: [{
        type: "input_value",
        name: "TEXT"
      }, {
        type: "field_dropdown",
        name: "TYPE",
        options: [["%s", "%s"], ["%d", "%d"], ["%c", "%c"]]
      }],
      previousStatement: null,
      nextStatement: null,
      style: "text_blocks",
    })
  },
  onchange: function () {
    let connectedBlock = null;
    const inputConnection = this.getInput('TEXT').connection;

    if (inputConnection.targetConnection) {
      connectedBlock = inputConnection.targetConnection.sourceBlock_;

      if (connectedBlock.type === 'variables_get') {
        const memory = JSON.parse(localStorage.getItem('memory'));
        const variableName = connectedBlock.getField("VAR").getVariable().name;

        if (memory[variableName]['type'] === 'INT')
          this.getField('TYPE').setValue('%d');
        if (memory[variableName]['type'] === 'CHAR')
          this.getField('TYPE').setValue('%c');

        memory[variableName]['value'] = Blockly.Msg.PENDING_VALUE;
        localStorage.setItem('memory', JSON.stringify(memory));
      } else if (connectedBlock.type === 'lists_getValueAtIndex') {
        const memory = JSON.parse(localStorage.getItem('memory'));
        const arrayName = connectedBlock.getField("ARRAY").value_;
        const index = +(Blockly.JavaScript.valueToCode(connectedBlock, 'INDEX', Blockly.JavaScript.ORDER_NONE)) || 0;
  
        if (arrayName !== Blockly.Msg.SELECT_VALUE) {
          if (memory[arrayName]?.type === 'INT')
            this.getField('TYPE').setValue('%d');
          if (memory[arrayName]?.type === 'CHAR')
            this.getField('TYPE').setValue('%c');

          const arr = memory[arrayName]?.value ? (memory[arrayName].value) : null;
          if (arr[index] === undefined) {
            window.alert("Variable not assigned 1");
            connectedBlock.dispose();
            return '';
          }
          arr[index] = Blockly.Msg.PENDING_VALUE;
          memory[arrayName].value = arr;
          localStorage.setItem('memory', JSON.stringify(memory));
        }
      }
      else {
        window.alert("input must be a variable.");
        connectedBlock.dispose();
      }
    }
  }
};

Blockly.Blocks['single_character_input'] = {
  init: function () {
    this.setColour(230);
    this.appendDummyInput()
      .appendField(this.newQuote_(!0))
      .appendField(new Blockly.FieldTextInput("a", this.validateInput), "CHAR")
      .appendField(this.newQuote_(!1));
    this.setOutput(true, "Character");
  },
  newQuote_: function (a) {
    return new Blockly.FieldImage(a == this.RTL ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAkCAYAAACNBsqdAAAACXBIWXMAAAsTAAALEwEAmpwYAAABt0lEQVRIibXUsWsUQRiG8eeLMYlnpRIVlIgQESySIoUonCBqpaJFCgURwULwT7CwsEglWNhbCVZaWAUObCystBCUgIgWQa4ydhIVHovsyeXYWTNzlxeWhfmG3367szOwTYlUQT0AHAMmgN/VtQp0I+JP9pPUGfWp6XTV++pMDnqmAazL4lbQuUy0l8tN6JT6shD+os6m4HYh2suTQXOsup/c2ioks6AeroPXh4TngIU6eBS5qY5vB9wCdg7CP0YAHwX2DsJvRwCv03dEjAFExEdgaUh4EnATXOUh0BkCXmPjoNoMR8QacAm4VQi3gB3/vLoZagtoA+eAI9Xwr+p+IwG/By5GxGpRW+rdxLZeUQ/15mX9x9UGaCfKn4DvRTCwGziYqHUi4memtxH1RMMJN98/N7fjq4nxZeBzabez6rdEt+dL0Qn1WQJ9rk6WwtcSaFc9XopeaFiwO6Xo2Qa07BOoiw3oa3VfLthSlxrQN2pqkyTR0+qHkaHqtPqoAVTtqHty0Ov/AVUfmLlQ48B8Q/0rcDsiXuWgvY73q+9qunyc9eoJ/EofuKKeGgrsg6fUF+o9ddcozL8mXx4vauBlKQAAAABJRU5ErkJggg==" :
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAkCAYAAABixKGjAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrElEQVRIia3WMWsUQRyG8WcOYmw8kQjRBIIgCBoQLYJgEZA02qopRbCxEMRvYBWEpBHyCdKIjZA+GCwCMRYBG40gaHVqwIAoaPdY3AbP3M5udmZfWFjY2d/MDvPfGciMekJdVpfUTq43CF9Xv/ovV9pAJ9RnDmdNPZYD3y5BB3MvBe2qKzVwT73WFJ5UN2vgx+rxpvBZ9W0FuqVON0IL+Jy6UwE/UI+kwFM1I55tjBZw1/6yKktPvZgEF/iTCvhyDny1YirmcuCuuh6BF5LhAr8bgbfVUznwmPFCaV7SB/AbEfijOpVidgq4A9yKtHkH7CbjwDhwKdJmI4TwJwcHGIm0eZ8CAwQAdQZ4E2nzBXhZ3O//R3aAdWCr9qvU2YrCqUpPvWlk78zdUE8DL4Dn6tG28f3MA3di+B7wLbODR+pkGf69BfwCcKYM7wCjmThA6ch/AJ9awMeH8BDCL2C1BfznEF7kFfnz/t/7g/hn4HUm3os+UWcSK1X7p7HqulHvJ8CH/+erDxvCzU5c6nl1sQZ+qp6MGeEQnYwCE/TX8Ehx/QY+hBD2Go24zfwFdQY82azgsTIAAAAASUVORK5CYII=",
      6, 12, '"')
  },
  validateInput: function (newValue) {
    return newValue.length <= 1 ? newValue : null;
  }
};
