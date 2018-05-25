


jQuery.noConflict();
(function($) {


  $(document).ready(function(e) {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ', user);
    if(user) {
      $('[data-name]').text(user.name);
      $('[data-email]').text(user.email);
    }
  })
})(jQuery);

// var user = firebase.auth().currentUser;
// user.updateProfile({
//   displayName: name,
// })
// .then(function() {
//   this.cfg.registering = false;
//   window.location = '/pages/activities.html';
// }.bind(this))
// .catch(function(error) {
//   this.handlerShowError(error.message);
// }.bind(this));
