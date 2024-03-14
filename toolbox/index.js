
const categories = [
  {
    name: "Variables",
    blocks: [
      { type: "variables_declare", value: '<value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value>' },
      { type: "variables_get" },
      { type: "variables_set", value: '<value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value>' },
      { type: "library_stdio_text_char" },
      { type: "math_number" }
    ]
  },
  {
    name: "Pointer",
    blocks: [
      { type: "variables_pointer_declare", value: '<value name="VALUE"><block type="logic_null"></block></value>' },
      { type: "variables_pointer_get" },
      {
        type: "variables_pointer_set",
        value: '<value name="VAR"><block type="variables_pointer_get"></block></value>' +
          '<value name="VALUE">' +
          '<block type="variables_pointer_&">' +
          '<value name="VALUE"><block type="variables_get"></block></value>' +
          '</block>' +
          '</value>'
      },
      { type: "variables_pointer_&" },
      { type: "variables_pointer_*" }
    ]
  },
  {
    name: "Array",
    blocks: [
      { type: "variables_array_declare", value: '<value name="LENGTH_1"><block type="math_number"><field name="NUM">3</field></block></value>' },
      { type: "variables_array_initial" },
      { type: "variables_array_get", value: '<value name="LENGTH_1"><block type="math_number"><field name="NUM">0</field></block></value>' },
      {
        type: "variables_array_set",
        value: '<value name="LENGTH_1"><block type="math_number"><field name="NUM">0</field></block></value>' +
          '<value name="VALUE"><block type="math_number"><field name="NUM">1</field></block></value>'
      },
      { type: "variables_array_pointer" },
      {
        type: "variables_string_declare",
        value: '<value name="LENGTH_1"><block type="math_number"><field name="NUM">15</field></block></value>' +
          '<value name="VALUE"><block type="library_stdio_text"><field name="TEXT">hello! world!</field></block></value>'
      },
      { type: "library_stdio_text_char" },
      { type: "variables_string_null" }
    ]
  },
  {
    name: "Arithmetics",
    blocks: [
      { type: "math_number" },
      { type: "math_arithmetic" },
      { type: "math_modulo" },
      { type: "math_convert_type" },
      { type: "math_auto_convert_type" },
      { type: "math_increment_expression" },
      { type: "math_decrement_expression" },
      { type: "math_prev_inc_decrement" },
      { type: "math_post_inc_decrement" }
    ]
  },
  {
    name: "Output",
    blocks: [
      { type: "library_stdio_printf" },
      { type: "library_stdio_text" },
      { type: "library_stdio_newLine" },
      { type: "library_stdio_tab" },
      { type: "math_number" }
    ]
  },
  {
    name: "Input",
    blocks: [
      {
        type: "library_stdio_scanf",
        value: '<value name="VAR0"><block type="variables_get"></block></value>'
      }
    ]
  },
  {
    name: "Conditions",
    blocks: [
      { type: "controls_if" },
      { type: "controls_switch" },
      { type: "controls_switch_break" },
      { type: "logic_ternary" }
    ]
  },
  {
    name: "Loops",
    blocks: [
      { type: "controls_whileUntil" },
      { type: "controls_doWhile" },
      {
        type: "controls_for",
        value: '<value name="FROM"><block type="math_number"><field name="NUM">1</field></block></value>' +
          '<value name="TO"><block type="math_number"><field name="NUM">10</field></block></value>' +
          '<value name="BY"><block type="math_number"><field name="NUM">1</field></block></value>'
      },
      { type: "controls_flow_statements" }
    ]
  },
  {
    name: "Logic",
    blocks: [
      { type: "logic_compare" },
      { type: "logic_operation" },
      { type: "logic_negate" },
      { type: "logic_boolean" },
      { type: "logic_null" }
    ]
  },
  {
    name: "Functions",
    blocks: [
      { type: "procedures_defnoreturn" },
      { type: "procedures_defreturn" },
      { type: "procedures_return" }
    ]
  },
  {
    name: "Library",
    categories: [
      {
        name: "Stdlib",
        blocks: [
          { type: "library_stdlib_abs" },
          { type: "library_stdlib_convert" },
          {
            type: "library_stdlib_rand",
            value: '<value name="VAR"><block type="library_stdlib_rand_scope">' +
              '<value name="A"><block type="library_stdlib_number_forRandScope1"></block></value>' +
              '<value name="B"><block type="library_stdlib_number_forRandScope100"></block></value>' +
              '</block></value>'
          },
          {
            type: "library_stdlib_malloc",
            value: '<value name="VAR"><block type="library_stdlib_arithmetic_forMalloc">' +
              '<value name="A"><block type="library_stdlib_sizeof_forMalloc"></block></value>' +
              '<value name="B"><block type="library_stdlib_number_forMalloc"></block></value>' +
              '</block></value>'
          },
          {
            type: "library_stdlib_arithmetic_forMalloc",
            value: '<value name="A"><block type="library_stdlib_sizeof_forMalloc"></block></value>' +
              '<value name="B"><block type="library_stdlib_number_forMalloc"></block></value>'
          },
          { type: "library_stdlib_free" },
          { type: "library_stdlib_exit" }
        ]
      },
      {
        name: "String",
        blocks: [
          { type: "library_string_strlen" },
          { type: "library_string_strcat" },
          { type: "library_string_strcpy" },
          { type: "library_string_strcmp" }
        ]
      },
      {
        name: "Math",
        blocks: [
          { type: "library_math_abs" },
          { type: "library_math_trig" },
          { type: "library_math_logs" },
          { type: "library_math_pow" },
          { type: "library_math_exp" },
          { type: "library_math_sqrt" },
          { type: "library_math_round" },
          { type: "library_math_numcheck" },
          { type: "library_math_numcompare" }
        ]
      },
      {
        name: "Time",
        blocks: [
          { type: "library_time_current" },
          { type: "library_time_requiredTime" }
        ]
      }
    ]
  },
  {
    name: "Comment",
    blocks: [
      {
        type: "comment",
        value: '<value name="VAR0"><block type="library_stdio_text"></block></value>'
      },
      { type: "library_stdio_text" }
    ]
  }
];

const generateToolbox = () => {
  let toolboxXML = '<xml id="toolbox">';

  categories.forEach(category => {
    if (category.blocks) {
      toolboxXML += `<category name="${category.name}">`;

      category.blocks.forEach(block => {
        toolboxXML += `<block type="${block.type}">${block.value || ''}</block>`;
      });

      toolboxXML += '</category>';
    } else if (category.categories) {
      toolboxXML += `<category name="${category.name}">`;

      category.categories.forEach(subCategory => {
        toolboxXML += `<category name="${subCategory.name}">`;

        subCategory.blocks.forEach(block => {
          toolboxXML += `<block type="${block.type}">${block.value || ''}</block>`;
        });

        toolboxXML += '</category>';
      });

      toolboxXML += '</category>';
    }
  });

  toolboxXML += '</xml>';
  return toolboxXML;
};

const toolBox = generateToolbox();