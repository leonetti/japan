
// JavaScript
window.sr = ScrollReveal();

window.Japan = window.Japan || {};


jQuery.noConflict();
(function($) {
  window.$ = window.jQuery();
  $('.input--wrapper label, .input--wrapper label i').on('click', function(e) {
    $(e.target).closest('.input--wrapper').find('.input--field').focus();
  });

  $(document).ready(function(e) {
    initApp();
  })
})(jQuery);


initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      if(window.location.pathname !== '/') {
        window.location = '/'
      }
    } else {
      window.Japan.user = {
        name : user.displayName,
        email : user.email,
      }
    }
  }, function(error) {
    console.log(error);
  });
};



