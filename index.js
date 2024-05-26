class Main {
  constructor() { }

  static async getToolbox() {
    try {
      const response = await fetch('./toolbox.xml');
      const xmlString = await response.text();

      return xmlString;
    } catch (error) {
      console.error('Error fetching toolbox XML:', error);
      return `<xml></xml>`;
    }
  }

  static localStorageHandler() {
    localStorage.clear();
    const xmlString = localStorage.getItem('xml') || this.getXmlExampleTemplate();
    localStorage.setItem('xml', xmlString);
    localStorage.setItem('memory', '{}');
  }

  static initApi(interpreter, globalObject) {
    // Add an API function for the alert() block, generated for "text_print" blocks.
    interpreter.setProperty(globalObject, 'alert',
      interpreter.createNativeFunction(text => {
        text = arguments.length ? text : '';
        this.outputArea.value += '\n' + text;
      }));

    // Add an API function for the prompt() block.
    let wrapper = text => {
      return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(globalObject, 'prompt',
      interpreter.createNativeFunction(wrapper));

    // Add an API function for highlighting blocks.
    wrapper = id => {
      id = String(id || '');
      return interpreter.createPrimitive(this.highlightBlock(id));
    };
    interpreter.setProperty(globalObject, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));
  }

  static highlightBlock(id) {
    this.demoWorkspace.highlightBlock(id);
    this.highlightPause = true;
  }

  static resetStepUi(clearOutput) {
    this.demoWorkspace.highlightBlock(null);
    this.highlightPause = false;
    this.runButton.disabled = '';

    if (clearOutput) {
      this.outputArea.value = '*********************************************\n => Console:\n*********************************************';
      this.outputJsArea.value = 'JavaScript output\n\n';
      this.outputCArea.value = 'C output\n\n';
    }
  }

  static resetInterpreter() {
    this.myInterpreter = null;
    if (this.runner) {
      clearTimeout(this.runner);
      this.runner = null;
    }
  }

  static generateCodeAndLoadIntoInterpreter() {
    // Generate JavaScript code and parse it.
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.addReservedWords('highlightBlock');
    this.latestCode = Blockly.JavaScript.workspaceToCode(this.demoWorkspace);
    this.resetStepUi(true);
  }

  static addButtonListener() {
    this.loadButton = document.querySelector('#loadButton');
    this.runButton = document.querySelector('#runButton');
    this.stepButton = document.querySelector('#stepButton');
    this.downloadCodeButton = document.querySelector('#downloadCodeButton');
    this.saveButton = document.querySelector('#saveButton');
    this.cleanOutputButton = document.querySelector('#cleanOutputButton');
    this.loadButton.addEventListener('click', this.loadBlock.bind(this));
    this.runButton.addEventListener('click', this.runCode.bind(this));
    this.stepButton.addEventListener('click', this.stepCode.bind(this));
    this.downloadCodeButton.addEventListener('click', this.downloadCodeHandler.bind(this));
    this.saveButton.addEventListener('click', this.saveBlock.bind(this));
    this.cleanOutputButton.addEventListener('click', this.cleanOutputHandler.bind(this));
  }

  static downloadCodeHandler(ev) {
    window.alert('download code');
  }

  static getXmlExampleTemplate() {
    return `<xml><block type="main_block" id="main_block" x="220" y="122"><statement name="STACK"><block type="text_print" id="vx%*0:J,;ckp}X-nZ529"><value name="TEXT"><block type="text" id="vM(aEDoJ#Cuk#9c/.PR6"><field name="TEXT">hello world</field></block></value></block></statement></block></xml>`
  }

  static runCode(ev) {
    if (!this.myInterpreter) {
      // First statement of this code.
      // Clear the program output.
      this.resetStepUi(true);
      this.runButton.disabled = 'disabled';

      // And then show generated code in an alert.
      // In a timeout to allow the outputArea.value to reset first.
      setTimeout(() => {
        this.outputJsArea.value += this.isOutputChecked ?
          this.latestCode.replace(/highlightBlock\(.+\);/gi, '').replace(/\n\s*\n/g, '\n') :
          this.latestCode;

        // Begin execution
        this.highlightPause = false;
        try {
          this.myInterpreter = new Interpreter(this.latestCode, this.initApi.bind(this));
          this.runner = () => {
            if (this.myInterpreter) {
              let hasMore = this.myInterpreter.run();
              if (hasMore) {
                // Execution is currently blocked by some async call.
                // Try again later.
                setTimeout(this.runner, 10);
              } else {
                // Program is complete.
                this.outputArea.value += '\n\n<< Program complete >>';
                this.resetInterpreter();
                this.resetStepUi(false);
              }
            }
          };
          this.runner();
        } catch (error) {
          console.error(error);
          this.outputArea.value += `\n\n<< Error code>>`;
          this.resetInterpreter();
          // this.resetStepUi(false);
          // return;
        }
      }, 1);
      return;
    }
  }

  static stepCode(ev) {
    if (!this.myInterpreter) {
      // First statement of this code.
      // Clear the program output.
      this.resetStepUi(true);
      this.myInterpreter = new Interpreter(this.latestCode, this.initApi.bind(this));

      // And then show generated code in an alert.
      // In a timeout to allow the outputArea.value to reset first.
      setTimeout(() => {
        this.outputJsArea.value += this.isOutputChecked ?
          this.latestCode.replace(/highlightBlock\(.+\);/gi, '').replace(/\n\s*\n/g, '\n') :
          this.latestCode;
        this.highlightPause = true;
        this.stepCode();
      }, 1);
      return;
    }
    this.highlightPause = false;
    do {
      try {
        this.hasMoreCode = this.myInterpreter.step();
      } finally {
        if (!this.hasMoreCode) {
          // Program complete, no more code to execute.
          this.outputArea.value += '\n\n<< Program complete >>';

          this.myInterpreter = null;
          this.resetStepUi(false);

          // Cool down, to discourage accidentally restarting the program.
          this.stepButton.disabled = 'disabled';
          setTimeout(() => {
            this.stepButton.disabled = '';
          }, 2000);

          return;
        }
      }
      // Keep executing until a highlight statement is reached,
      // or the code completes or errors.
    } while (this.hasMoreCode && !this.highlightPause);
  }

  static saveBlock(ev) {
    const xmlBlock = Blockly.Xml.workspaceToDom(this.demoWorkspace);
    const xmlBlockString = Blockly.Xml.domToText(xmlBlock);

    const blob = new Blob([xmlBlockString], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const programName = document.getElementById('program_name').value;
    a.download = `${programName}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }

  static loadBlock(ev) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml';

    input.addEventListener('change', function () {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          try {
            const xmlString = event.target.result;
            const xml = Blockly.Xml.textToDom(xmlString);
            this.demoWorkspace.clear();
            Blockly.Xml.domToWorkspace(xml, this.demoWorkspace);

            const fileName = file.name.replace(/\.[^.]+$/, "");
            document.getElementById('program_name').value = fileName;
          } catch (error) {
            alert("Error loading block. Please try again.");
            window.location.reload();
          }
        }.bind(this);
        reader.readAsText(file);
      }
    }.bind(this));
    input.click();
  }

  static getStringParamFromUrl(name, defaultValue) {
    let val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
  }

  static cleanOutputHandler(ev) {
    this.resetInterpreter();
    this.generateCodeAndLoadIntoInterpreter();
    const count = Blockly.mainWorkspace.getAllBlocks().length;
    if (count < 2 || window.confirm("Remove all blocks?")) {
      Blockly.mainWorkspace.clear();
      window.location.hash = '';
    }
  }

  static configKeyMsg() {
    for (let messageKey in MSG) {
      if (messageKey.indexOf('cat') == 0) {
        Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
      }
    }
  }

  static createMainBlock() {
    const mainBlock = this.demoWorkspace.newBlock('main_block');
    mainBlock.initSvg();
    mainBlock.render();
    mainBlock.moveBy(100, 100);
  }

  static async startWorkspace() {
    this.configKeyMsg();
    this.localStorageHandler();
    const toolboxText = await this.getToolbox();
    const toolboxXml = Blockly.Xml.textToDom(toolboxText);
    this.demoWorkspace = Blockly.inject('blocklyDiv', {
      media: './assets/',
      toolbox: toolboxXml,
      zoom:
      {
        controls: true,
        wheel: true
      }
    });
    // Create main block
    this.createMainBlock();

    Blockly.JavaScript.addReservedWords('exit');
    this.outputArea = document.getElementById('output');
    this.outputJsArea = document.getElementById('outputJS');
    this.outputCArea = document.getElementById('outputC');
    this.stepButton = document.getElementById('stepButton');
    this.runButton = document.getElementById('runButton');
    this.myInterpreter = null;
    this.runner = null;
    this.highlightPause = false;
    this.latestCode = '';
    this.isOutputChecked = true;
    this.addButtonListener();
    this.generateCodeAndLoadIntoInterpreter();
    this.demoWorkspace.addChangeListener(event => {
      if (!(event instanceof Blockly.Events.Ui)) {
        // Something changed. Parser needs to be reloaded.
        this.resetInterpreter();
        this.generateCodeAndLoadIntoInterpreter();
      }
      let code = Blockly.JavaScript.workspaceToCode(this.demoWorkspace);
      if (code !== '') {
        this.outputJsArea.value = '// JavaScript output\n\n';
        this.outputJsArea.value += this.isOutputChecked ?
          code.replace(/highlightBlock\(.+\);/gi, '').replace(/\n\s*\n/g, '\n') :
          code;

        this.outputCArea.value = '// C output\n\n';
        this.outputCArea.value += this.isOutputChecked ?
          code.replace(/highlightBlock\(.+\);/gi, '').replace(/\n\s*\n/g, '\n') :
          code;
      }

    });
    this.demoWorkspace.toolbox_.flyout_.autoClose = false; // Turn-off autoClose sub-toolBox
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await Main.startWorkspace();
});
