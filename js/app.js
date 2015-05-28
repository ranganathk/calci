Calci = {
  clearPreview: function() {
    $('#preview').html("");
  },
  deleteCharFromPreview: function() {
    var preview = $('#preview').html();
    $('#preview').html(preview.slice(0, preview.length-1));
  },
  handleKeyPress: function(key) {
    switch($(key).text()) {
    case "AC":
      Calci.clearPreview();
      break;
    case "DEL":
      Calci.deleteCharFromPreview();
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