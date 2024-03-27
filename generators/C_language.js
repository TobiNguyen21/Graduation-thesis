Blockly.c_language = new Blockly.Generator("c_language");
Blockly.c_language.C_VARIABLE_TYPES = [
  ["float", "float"],
  ["int", "int"],
  ["unsigned int", "unsigned int"],
  ["short", "short"],
  ["unsigned short", "unsigned short"],
  ["bool", "bool"]
];
Blockly.c_language.C_GLOBAL_VARS = [];
Blockly.c_language.addReservedWords(",alignas,alignof,and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,char16_t,char32_t,class,compl,const,constexpr,const_cast,continue,decltype,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,long double,long long,mutable,namespace,new,noexcept,not,not_eq,nullptr,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_assert,static_cast,struct,switch,template,this,thread_local,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq,posix,game,api,PI,PI2,PI3,PI4,DEG2RAD,RAD2DEG,ZRMS,ZR2D,ZR3D,ALLIANCE");
Blockly.c_language.ORDER_ATOMIC = 0;
Blockly.c_language.ORDER_MEMBER = 2;
Blockly.c_language.ORDER_FUNCTION_CALL = 2;
Blockly.c_language.ORDER_INCREMENT = 3;
Blockly.c_language.ORDER_DECREMENT = 3;
Blockly.c_language.ORDER_LOGICAL_NOT = 3;
Blockly.c_language.ORDER_BITWISE_NOT = 3;
Blockly.c_language.ORDER_UNARY_PLUS = 3;
Blockly.c_language.ORDER_UNARY_NEGATION = 3;
Blockly.c_language.ORDER_MULTIPLICATION = 5;
Blockly.c_language.ORDER_DIVISION = 5;
Blockly.c_language.ORDER_MODULUS = 5;
Blockly.c_language.ORDER_ADDITION = 6;
Blockly.c_language.ORDER_SUBTRACTION = 6;
Blockly.c_language.ORDER_BITWISE_SHIFT = 7;
Blockly.c_language.ORDER_RELATIONAL = 8;
Blockly.c_language.ORDER_EQUALITY = 9;
Blockly.c_language.ORDER_BITWISE_AND = 10;
Blockly.c_language.ORDER_BITWISE_XOR = 11;
Blockly.c_language.ORDER_BITWISE_OR = 12;
Blockly.c_language.ORDER_LOGICAL_AND = 13;
Blockly.c_language.ORDER_LOGICAL_OR = 14;
Blockly.c_language.ORDER_CONDITIONAL = 15;
Blockly.c_language.ORDER_ASSIGNMENT = 15;
Blockly.c_language.ORDER_COMMA = 17;
Blockly.c_language.ORDER_NONE = 99;
Blockly.c_language.INFINITE_LOOP_TRAP = null;
Blockly.c_language.init = function () {
  Blockly.c_language.definitions_ = Object.create(null);
  Blockly.c_language.times_ = Object.create(null);
  Blockly.c_language.functionNames_ = Object.create(null);
  if (Blockly.Variables) {
    Blockly.c_language.variableDB_ ? Blockly.c_language.variableDB_.reset() : Blockly.c_language.variableDB_ = new Blockly.Names(Blockly.c_language.RESERVED_WORDS_);
    var a = [],
      b = Blockly.Variables.allVariables();
    Blockly.Structure.allStructure();
    for (var c = 0; c < b.length; c++) "global" == b[c][3] && (a[c] = b[c][0] + b[c][1] + " " + Blockly.c_language.variableDB_.getName(b[c][2],
      Blockly.Variables.NAME_TYPE) + ";");
    Blockly.c_language.definitions_.variables = a.join("\n")
  }
};
Blockly.c_language.finish = function (a) {
  a && (a = this.prefixLines(a, Blockly.c_language.INDENT));
  a = "\n" + a;
  var b = [],
    c = [],
    d = [],
    e = [],
    g;
  for (g in Blockly.c_language.definitions_) {
    var h = Blockly.c_language.definitions_[g];
    g.match("include") ? b.push(h) : g.match("Func_declare") ? c.push(h) : g.match("define") ? d.push(h) : e.push(h)
  }
  b = b.join("\n") + "\n\n" + c.join("\n") + "\n\n" + d.join("\n");
  e = e.join("\n");
  return b.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") + a + e.replace(/\n\n+/g, "\n\n")
};
Blockly.c_language.finishFull = function (a) {
  var b = [],
    c;
  for (c in Blockly.c_language.definitions_) b.push(Blockly.c_language.definitions_[c]);
  a = b.join("\n\n") + "\n\nvoid setPos(float x, float y, float z) {\n\tfloat pos[3];\n\tpos[0] = x; pos[1] = y; pos[2] = z;\n\tapi.setPositionTarget(pos);\n}\n\n" + a; - 1 === a.indexOf("//Begin page init\nvoid init() {\n") && (a = "void init() {}\n" + a);
  return a
};
Blockly.c_language.scrubNakedValue = function (a) {
  return a + ";\n"
};
Blockly.c_language.quote_ = function (a) {
  a = a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\?/g, "\\?");
  return a = a.replace(/\\\\n/g, "\\n")
};
Blockly.c_language.scrub_ = function (a, b) {
  if (null === b) return "";
  var c = "";
  if (!a.outputConnection || !a.outputConnection.targetConnection) {
    var d = a.getCommentText();
    d && (c += this.prefixLines(d, "// ") + "\n");
    for (var e = 0; e < a.inputList.length; e++) a.inputList[e].type == Blockly.INPUT_VALUE && (d = a.inputList[e].connection.targetBlock()) && (d = this.allNestedComments(d)) && (c += this.prefixLines(d, "// "))
  }
  e = a.nextConnection && a.nextConnection.targetBlock();
  e = this.blockToCode(e);
  return c + b + e
};