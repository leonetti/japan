
// JavaScript
window.sr = ScrollReveal();

window.Japan = window.Japan || {};


jQuery.noConflict();
(function($) {
  window.$ = window.jQuery();
  $('.input--wrapper label, .input--wrapper label i').on('click', function(e) {
    $(e.target).closest('.input--wrapper').find('.input--field').focus();
  });

  $('.textarea--wrapper label, .textarea--wrapper label i').on('click', function(e) {
    $(e.target).closest('.textarea--wrapper').find('.input--field').focus();
  });

  $(document).ready(function(e) {
    initApp();
  })
})(jQuery);


initApp = function() {
  var app = firebase.app();

  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      window.localStorage.removeItem('user');
      if(window.location.pathname !== '/') {
        window.location = '/'
      }
    } else {
      var user = {
        name : user.displayName,
        email : user.email,
      }

      window.localStorage.setItem('user', JSON.stringify(user));
    }
  }, function(error) {
    console.log(error);
  });
};



