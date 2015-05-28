Calci = {
  clear: function() {
    $('#preview').html("");
    $('#result').html("0");    
  },
  deleteCharFromPreview: function() {
    var preview = $('#preview').html();
    $('#preview').html(preview.slice(0, preview.length-1));
  },
  calculateResult: function() {
    $('#result').html(eval($('#preview').html()));
  },
  handleInput: function(val) {
    switch(val) {
    case "AC":
      Calci.clear();
      break;
    case "DEL":
      Calci.deleteCharFromPreview();
      break;
    case "=":
      Calci.calculateResult();
      break;
    default:
      $('#preview').html(
        $('#preview').html() + val
      );
    }
  },
  watchKeyClick: function() {
    $('.key').click(function(event){
      Calci.handleInput($(this).text());
    });
  },
  handleInputFunctionWrapper: function(val) {
    return function() {
      Calci.handleInput(val);
    }
  },
  watchKeyPress: function() {
    var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
    for(var i = 0; i < keys.length; i++) {
      $(document).bind('keyup', keys[i], Calci.handleInputFunctionWrapper(keys[i]));
    }
  }//,
  // watchKeyPress: function() {
  //   var keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/'];
  //   for(var i = 0; i < keys.length; i++) {
  //     $(document).bind('keyup', keys[i], function() {
  //       Calci.handleInput(keys[i]);
  //     });
  //   }
  // }
};

$(document).ready(function() {
  Calci.watchKeyClick();
  Calci.watchKeyPress();
});