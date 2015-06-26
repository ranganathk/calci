

var Calci = {
  constants: {
    ac: "ac",
    del: "del",
    eql: "eql",
    plus: "plus",
    minus: "minus",
    division: "division",
    multiply: "multiply",
    dot: "dot",
    square: "square",
    sqrt: "sqrt",
    inverse: "inverse",
    exponent: "exponent",
    cubeRoot: "cube-root",
    sin: "sin",
    cos: "cos",
    tan: "tan",
    exp: "exp",
    ln: "ln",
    log: "log",
    pi: "pi",
    modulo: "modulo",
    factorial: "factorial",
    answer: "answer",
    openingBrace: "opening-brace",
    closingBrace: "closing-brace"
  },

  clearDisplay: function() {
    Calci.variables.preview = "";
    $('#preview').html(Calci.variables.preview);
    $('#result').html(Calci.variables.preview +"0");    
  },

  deleteCharFromPreview: function() {
    Calci.variables.preview = Calci.variables.preview.slice(0, Calci.variables.preview.length-1);
    $('#preview').html(Calci.variables.preview);
  },

  calculateResult: function() {

    Calci.variables.newVar = (Calci.variables.preview).replace(/sin|cos|tan|exp|Pi|sqrt|ln|log/g, function myFunction1(x){if (x.toLowerCase() == Calci.constants.pi) {return "Math." + x.toUpperCase();} else if (x == Calci.constants.ln) {return "Math.log";} else if (x == Calci.constants.log) {return "Math.log10";} else {return "Math." + x;}});
    var regexBox = Calci.variables.newVar.match(/-?\d+\.?\d*\^-?\d+\.?\d*\/?\d*/);

    if (regexBox != null) {
      var baseAndPower = regexBox[0].split("^");
      Calci.variables.toEval = Calci.variables.newVar.replace(regexBox[0], "Math.pow(" + baseAndPower[0] + "," + baseAndPower[1] + ")");
    } else {
      Calci.variables.toEval = Calci.variables.newVar;
    }
    
    Calci.variables.result = eval(Calci.variables.toEval);
    
    $('#result').html(Calci.variables.result);
    $('#preview').html(Calci.variables.result);
    Calci.variables.ans = Calci.variables.result;
    Calci.variables.preview = "";
  },

  permutation: function(number) {
    var nFact = 1;
    for (var i = 1; i <= number; i++) {
      nFact *= i;
    }
    $('#result').html(nFact);
    $('#preview').html(nFact);
  },

  inverse: function(number) {
    var inverseNum = 1/number;
    $('#preview').html(inverseNum);
    $('#result').html(inverseNum);
  },

  handleOperators: function (operator) {
    if (operator == Calci.constants.plus) {
      Calci.variables.preview += "+";
    } else if (operator == Calci.constants.minus) {
      Calci.variables.preview += "-";
    } else if (operator == Calci.constants.division) {
      Calci.variables.preview += "/";
    } else if (operator == Calci.constants.multiply) {
      Calci.variables.preview += "*";
    } else {
      Calci.variables.preview += "%";
    }
    $('#preview').html(Calci.variables.preview);
  },

  handleBraces: function(brace) {
    if (brace == Calci.constants.openingBrace) {
      Calci.variables.preview += "(";
    } else {
      Calci.variables.preview += ")";
    }
    $('#preview').html(Calci.variables.preview);
  },

  handleFunctions: function(func) {
    if (func == Calci.constants.pi) {
      Calci.variables.preview += "Pi";
    } else if (func == Calci.constants.square) {
      Calci.variables.preview += "^2";
    } else if (func == Calci.constants.cubeRoot) {
      Calci.variables.preview += "^1/3";
    } else if (func == Calci.constants.exponent) {
      Calci.variables.preview += "^";
    } else {
      Calci.variables.preview += func + "(";
    }
    $('#preview').html(Calci.variables.preview);
  },

  handleInput: function(val) {
    if(!isNaN(val)) {
      Calci.variables.preview += val;
      $('#preview').html(Calci.variables.preview);
    } else if (val == Calci.constants.ac) {
      Calci.clearDisplay();
    } else if (val == Calci.constants.del) {
      Calci.deleteCharFromPreview();
    } else if (val == Calci.constants.factorial) {
      Calci.permutation(parseInt(Calci.variables.preview));
    } else if (val == Calci.constants.inverse) {
      Calci.inverse(parseInt(Calci.variables.preview));
    } else if (Calci.variables.arrayOfOperators.indexOf(val) != -1) {
      Calci.handleOperators(val);
    } else if (val == Calci.constants.eql) {
      Calci.calculateResult();
    } else if (val == Calci.variables.dot) {
      //Do something
    } else if (val == Calci.constants.openingBrace || val == Calci.constants.closingBrace) {
      Calci.handleBraces(val);
    } else if (val == Calci.constants.answer){
      // answer is the constant that is checked against the key code, while ans is the value of the last evaluate result
      Calci.variables.preview = Calci.variables.ans;
      $('#preview').html(Calci.variables.preview);
    } else if (val == Calci.constants.dot){
      // do something
    } else {
      Calci.handleFunctions(val);
    }

  },
  
  watchKeyClick: function() {
    $('.key').click(function(event){
      Calci.handleInput($(this).data("code"));
    });
  },

  handleInputFunctionWrapper: function(val) {
    return function() {
      Calci.handleInput(val);
      var eleId;
      switch(val) {
      case '+':
        eleId = '#key-' + Calci.constants.plus;
        break;
      case '.':
        eleId = '#key-' + Calci.constants.dot;
        break;
      case '-':
        eleId = '#key-' + Calci.constants.minus;
        break;
      case '/':
        eleId = '#key-' + Calci.constants.division;
        break;
      case '*':
        eleId = '#key-' + Calci.constants.multiply;
        break;
      case '=':
        eleId = '#key-' + Calci.constants.eql;
        break;
      default:
        eleId = '#key-' + val;
      }
      $(eleId).addClass('active');
      setTimeout(function(){ $(eleId).removeClass('active'); }, 200);
    }
  },

  watchKeyPress: function() {
    var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
    for(var i = 0; i < keys.length; i++) {
      $(document).bind('keyup', keys[i], Calci.handleInputFunctionWrapper(keys[i]));
    }
    $(document).bind('keyup', "esc", Calci.handleInputFunctionWrapper("AC"));
    $(document).bind('keyup', "backspace", Calci.handleInputFunctionWrapper("DEL"));
    $(document).bind('keyup', "return", Calci.handleInputFunctionWrapper("="));
  }
};

Calci.variables = {
  toEval: "",
  newVar: "",
  preview: "",
  result: "",
  ans: "",
  arrayOfFunctions: [Calci.constants.square, Calci.constants.sqrt, Calci.constants.exponent, Calci.constants.cubeRoot, Calci.constants.sin, Calci.constants.cos, Calci.constants.tan, Calci.constants.exp, Calci.constants.ln, Calci.constants.log10, Calci.constants.pi],
  arrayOfOperators: [Calci.constants.plus, Calci.constants.minus, Calci.constants.division, Calci.constants.multiply, Calci.constants.modulo]
}

$(document).ready(function() {
  Calci.watchKeyClick();
  Calci.watchKeyPress();
});



//var b = a.match(/([-+]?[0-9]*\.?[0-9]+)\^([-+]?[0-9]*\.?[0-9]+)\/?([0-9]*\.?[0-9]+)?/gi, function myFunction2(x){var c = x.split("^"); return c});