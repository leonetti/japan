


jQuery.noConflict();
(function($) {
  $(document).ready(function() {
    var user = firebase.auth().currentUser;
    console.log('firebase: ', firebase.app());
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
