Calci = {
  clearPreview: function() {
    $('#preview').html("");
  },
  handleKeyPress: function(key) {
    switch($(key).text()) {
    case "AC":
      Calci.clearPreview();
      break;
    case "DEL":
      console.log($(key).text());
      break;
    case "=":
      console.log($(key).text());
      break;
    default:
      $('#preview').html(
        $('#preview').html() + $(key).text()
      );
    }
  }
};

$(document).ready(function() {
  $('.key').click(function(event){
    Calci.handleKeyPress(this);
  });
});