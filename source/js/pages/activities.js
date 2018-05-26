


jQuery.noConflict();
(function($) {


  $(document).ready(function(e) {
    var user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ', user);
    if(!user.name) {
      $('#settings--modal .form--show--button,#settings--modal .user--logout').hide();
      var $input = $('[data-update-text="name"]').closest('.input--wrapper');
      $input.show();
      $input.prev('.update--label').show();
      $('.form--back').show().attr('disabled', true);
      $('.update--submit').css('display', 'block');
      $('#settings--modal').modal({
          fadeDuration: 500,
          fadeDelay: 0.50,
          escapeClose: false,
          clickClose: false,
          showClose: false
      });
      $('[data-update-submit]').on('click', function(e) {
        $('.form--back').attr('disabled', false);
      });
    }
    if(user) {
      $('[data-user-name]').text(user.name);
      $('[data-user-email]').html(user.email + ' <i class="fas fa-cog"></i>');
    }
  })
})(jQuery);


// e.preventDefault();
// this.$dom.register_modal_wrapper.modal({
//   fadeDuration: 500,
//   fadeDelay: 0.50
// });

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
