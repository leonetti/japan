


jQuery.noConflict();
(function($) {
  $(document).ready(function() {
    var user = firebase.auth().currentUser;
    console.log('firebase: ', firebase.app());
  })
})(jQuery);
