Blockly.cake = new Blockly.Generator("cake");
Blockly.cake.C_VARIABLE_TYPES = [
  ["float", "float"],
  ["int", "int"],
  ["unsigned int", "unsigned int"],
  ["short", "short"],
  ["unsigned short", "unsigned short"],
  ["bool", "bool"]
];
Blockly.cake.C_GLOBAL_VARS = [];
Blockly.cake.addReservedWords(",alignas,alignof,and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,char16_t,char32_t,class,compl,const,constexpr,const_cast,continue,decltype,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,long double,long long,mutable,namespace,new,noexcept,not,not_eq,nullptr,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_assert,static_cast,struct,switch,template,this,thread_local,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq,posix,game,api,PI,PI2,PI3,PI4,DEG2RAD,RAD2DEG,ZRMS,ZR2D,ZR3D,ALLIANCE");
Blockly.cake.ORDER_ATOMIC = 0;
Blockly.cake.ORDER_MEMBER = 2;
Blockly.cake.ORDER_FUNCTION_CALL = 2;
Blockly.cake.ORDER_INCREMENT = 3;
Blockly.cake.ORDER_DECREMENT = 3;
Blockly.cake.ORDER_LOGICAL_NOT = 3;
Blockly.cake.ORDER_BITWISE_NOT = 3;
Blockly.cake.ORDER_UNARY_PLUS = 3;
Blockly.cake.ORDER_UNARY_NEGATION = 3;
Blockly.cake.ORDER_MULTIPLICATION = 5;
Blockly.cake.ORDER_DIVISION = 5;
Blockly.cake.ORDER_MODULUS = 5;
Blockly.cake.ORDER_ADDITION = 6;
Blockly.cake.ORDER_SUBTRACTION = 6;
Blockly.cake.ORDER_BITWISE_SHIFT = 7;
Blockly.cake.ORDER_RELATIONAL = 8;
Blockly.cake.ORDER_EQUALITY = 9;
Blockly.cake.ORDER_BITWISE_AND = 10;
Blockly.cake.ORDER_BITWISE_XOR = 11;
Blockly.cake.ORDER_BITWISE_OR = 12;
Blockly.cake.ORDER_LOGICAL_AND = 13;
Blockly.cake.ORDER_LOGICAL_OR = 14;
Blockly.cake.ORDER_CONDITIONAL = 15;
Blockly.cake.ORDER_ASSIGNMENT = 15;
Blockly.cake.ORDER_COMMA = 17;
Blockly.cake.ORDER_NONE = 99;
Blockly.cake.INFINITE_LOOP_TRAP = null;
Blockly.cake.init = function () {
  Blockly.cake.definitions_ = Object.create(null);
  Blockly.cake.times_ = Object.create(null);
  Blockly.cake.functionNames_ = Object.create(null);
  if (Blockly.Variables) {
    Blockly.cake.variableDB_ ? Blockly.cake.variableDB_.reset() : Blockly.cake.variableDB_ = new Blockly.Names(Blockly.cake.RESERVED_WORDS_);
    var a = [],
      b = Blockly.Variables.allVariables();
    Blockly.Structure.allStructure();
    for (var c = 0; c < b.length; c++) "global" == b[c][3] && (a[c] = b[c][0] + b[c][1] + " " + Blockly.cake.variableDB_.getName(b[c][2],
      Blockly.Variables.NAME_TYPE) + ";");
    Blockly.cake.definitions_.variables = a.join("\n")
  }
};
Blockly.cake.finish = function (a) {
  a && (a = this.prefixLines(a, Blockly.cake.INDENT));
  a = "\n" + a;
  var b = [],
    c = [],
    d = [],
    e = [],
    g;
  for (g in Blockly.cake.definitions_) {
    var h = Blockly.cake.definitions_[g];
    g.match("include") ? b.push(h) : g.match("Func_declare") ? c.push(h) : g.match("define") ? d.push(h) : e.push(h)
  }
  b = b.join("\n") + "\n\n" + c.join("\n") + "\n\n" + d.join("\n");
  e = e.join("\n");
  return b.replace(/\n\n+/g, "\n\n").replace(/\n*$/, "\n") + a + e.replace(/\n\n+/g, "\n\n")
};
Blockly.cake.finishFull = function (a) {
  var b = [],
    c;
  for (c in Blockly.cake.definitions_) b.push(Blockly.cake.definitions_[c]);
  a = b.join("\n\n") + "\n\nvoid setPos(float x, float y, float z) {\n\tfloat pos[3];\n\tpos[0] = x; pos[1] = y; pos[2] = z;\n\tapi.setPositionTarget(pos);\n}\n\n" + a; - 1 === a.indexOf("//Begin page init\nvoid init() {\n") && (a = "void init() {}\n" + a);
  return a
};
Blockly.cake.scrubNakedValue = function (a) {
  return a + ";\n"
};
Blockly.cake.quote_ = function (a) {
  a = a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\?/g, "\\?");
  return a = a.replace(/\\\\n/g, "\\n")
};
Blockly.cake.scrub_ = function (a, b) {
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