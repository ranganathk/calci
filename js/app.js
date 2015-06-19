var preview = "";

Calci = {
  constants: {
    ac: "AC",
    del: "DEL",
    eql: "EQL",
    plus: "PLUS",
    minus: "MINUS",
    division: "DIVISION",
    multiply: "MULTIPLY",
    dot: "DOT",
    square: "SQUARE",
    sqRoot: "SQUARE-ROOT",
    inverse: "INVERSE",
    exponent: "EXPONENT",
    cubeRoot: "CUBE-ROOT",
    sin: "SIN",
    cos: "COS",
    tan: "TAN",
    eulerNo: "EULER-NO",
    ln: "LN",
    log: "LOG",
    pi: "PI",
    modulo: "MODULO",
    factorial: "FACTORIAL",
    openingBrace: "OPENING-BRACE",
    closingBrace: "CLOSING-BRACE"
  },

  lastKeyWasOperation: false,
  lastKeyWasDot: false,

  clearDisplay: function() {
    preview = "";
    $('#preview').html(preview);
    $('#result').html("0");    
  },

  deleteCharFromPreview: function() {
    preview = preview.slice(0, preview.length-1);
    $('#preview').html(preview);
  },

  calculateResult: function() {
    var result = eval($('#preview').html()) + '';
    $('#result').html(result);
    $('#preview').html(result);
  },

  permutation: function(number) {
    var nFact = 1;
    for (var i = 1; i <= number; i++) {
      nFact *= i;
    }
    $('#result').html(nFact);
    $('#preview').html(nFact);
  },

  handleInput: function(val) {
    if(!isNaN(val)) {
      preview += val;
      $('#preview').html(preview);
    } else if (val == Calci.constants.ac) {
      Calci.clearDisplay();
    } else if (val == Calci.constants.del) {
      Calci.deleteCharFromPreview();
    } else if (val == Calci.constants.factorial) {
      var previous = preview;
      Calci.permutation(previous);
    } else if (val == Calci.constants.inverse) {
      previous = preview;
      result = 1/previous
      $('#preview').html(result);
      $('#result').html(result);
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

$(document).ready(function() {
  Calci.watchKeyClick();
  Calci.watchKeyPress();
});