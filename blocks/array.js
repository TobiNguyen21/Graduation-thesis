const rootArray = "[blocks][array]";
const COLOUR_ARRAY_BLOCK = 10;

Blockly.Blocks.lists = {};
Blockly.Constants.Lists = {};
Blockly.Constants.Lists.HUE = 260;

Blockly.Blocks['lists_create_empty_v2'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("{");
        this.appendValueInput("ITEM0")
            .setCheck(["Number", "Character"])
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setOutput(true, "Array");
        this.setStyle("list_blocks");
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(['lists_create_empty_v2_append_input']));
        this.itemCount_ = 1;
        this.appendDummyInput('CLOSE').appendField('}');
    },
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('items', this.itemCount_);
        return container;
    },
    domToMutation: function (xmlElement) {
        this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
        this.updateShape_();
    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('lists_create_empty_v2_append_container');
        containerBlock.initSvg();
        var connection = containerBlock.getInput('STACK').connection;
        for (var i = 0; i < this.itemCount_; i++) {
            var itemBlock = workspace.newBlock('lists_create_empty_v2_append_input');
            itemBlock.initSvg();
            connection.connect(itemBlock.previousConnection);
            connection = itemBlock.nextConnection;
        }
        return containerBlock;
    },
    compose: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var connections = [];
        while (itemBlock) {
            connections.push(itemBlock.valueConnection_);
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
        this.itemCount_ = connections.length;
        this.updateShape_();
        for (var i = 0; i < this.itemCount_; i++) {
            if (connections[i]) {
                this.getInput('ITEM' + i).connection.connect(connections[i]);
            }
        }
        // Move the "]" field to the end
        if (this.getInput('CLOSE')) {
            this.removeInput('CLOSE');
        }
        this.appendDummyInput('CLOSE')
            .appendField("}");
    },
    saveConnections: function (containerBlock) {
        var itemBlock = containerBlock.getInputTargetBlock('STACK');
        var i = 0;
        while (itemBlock) {
            var input = this.getInput('ITEM' + i);
            itemBlock.valueConnection_ = input && input.connection.targetConnection;
            i++;
            itemBlock = itemBlock.nextConnection &&
                itemBlock.nextConnection.targetBlock();
        }
    },
    updateShape_: function () {
        // Add or remove Value Inputs based on current itemCount_
        for (var i = 0; i < this.itemCount_; i++) {
            if (!this.getInput('ITEM' + i)) {
                this.appendValueInput('ITEM' + i)
                    .setCheck(["Number", "Character"])
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(" ");
            }
        }
        while (this.getInput('ITEM' + i)) {
            this.removeInput('ITEM' + i);
            i++;
        }
        // Move the "]" field to the end
        if (this.getInput('CLOSE')) {
            this.removeInput('CLOSE');
        }
        this.appendDummyInput('CLOSE')
            .appendField("}");
    }
};

Blockly.Blocks['lists_create_empty_v2_append_container'] = {
    init: function () {
        this.setStyle('list_blocks');
        this.appendDummyInput()
            .appendField("add items");
        this.appendStatementInput('STACK');
        this.setTooltip('');
        this.contextMenu = false;
    }
};

Blockly.Blocks['lists_create_empty_v2_append_input'] = {
    init: function () {
        this.setStyle('list_blocks');
        this.appendDummyInput()
            .appendField("item");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
        this.contextMenu = false;
    }
};
Blockly.Blocks['lists_getValueAtIndex'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getArrayOptions), "ARRAY")
            .appendField("[");
        this.appendValueInput('INDEX').setCheck(['Number']);
        this.appendDummyInput().appendField("]");
        this.setOutput(true, null);
        this.setStyle('list_blocks');
        this.setTooltip("");
        this.setHelpUrl("");
    },
    getArrayOptions: function () {
        const workspace = Blockly.getMainWorkspace();
        const arrayBlocks = workspace.getAllBlocks().filter(block => block.type === 'variables_array_declare' || block.type === 'variables_array_initial');
        const options = arrayBlocks.map(block => [block.getFieldValue('VAR'), block.getFieldValue('VAR')]);
        return [["--Select array name--", "--select--"], ...options];
    }
};
