/**
 * Japan - Login
 *
 * Dependencies:
 * jQuery, lodash
 *
 * Japan.Login - Class
 *
 */

document.addEventListener('DOMContentLoaded', function(e) {

  jQuery.noConflict();

  (function ( $, _ ) {
    'use strict';

    /**
      * Check user state on Auth state change
      * If user exists redirect to activities home
      * If user does not exist do nothing
      *
      * @returns {Null}
    */
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        window.location = '/pages/activities.html';
      }
    });


    // Japan.Login namespace
    (function(Login) {

      Login = function(options) {
        this.cfg = _.extend({
          selectors : {
            'google_login'           : '.login--google--submit [data-google-login]',
            'email_login'            : '.login--email--submit [data-email-login]',
            'login_email'            : '.login--wrapper [data-login-email]',
            'login_password'         : '.login--wrapper [data-login-password]',
            'error_text'             : '.error--text',
            'error_wrapper'          : '.error--wrapper',
            'error_close'            : '.close--error',
            'register_modal_wrapper' : '#register',
            'register_modal_buttons' : '.register--button,.mobile--register--button',
            'register_email'         : '#register [data-register-email]',
            'register_password'      : '#register [data-register-password]',
            'register_p_confirm'     : '#register [data-register-password-confirm]',
            'register_submit'        : '#register [data-register-submit]',
          },
        })

        this.getDOMRefs();
        this.bindHandlers();
      };


      /**
        * Get/update this.$dom with configured jQuery references
        *
        * @returns {Null}
      */
      Login.prototype.getDOMRefs = function() {
        this.$dom = this.$dom || {};
        _.forOwn(this.cfg.selectors, function(selector, name) {
          this.$dom[name] = $(selector);

          // Display an error if we didn't match an element
          if (!this.$dom[name].length) {
            console.log('Login Developer Warning: Selected element not found');
          }
        }.bind(this));
      };


      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Login.prototype.bindHandlers = function() {
        this.$dom.google_login.on('click', this.handlerGoogleLogin.bind(this));
        this.$dom.email_login.on('click', this.handlerEmailLogin.bind(this));
        this.$dom.register_submit.on('click', this.handlerRegisterUser.bind(this));
        this.$dom.register_modal_buttons.on('click', this.handlerRegisterModal.bind(this));
      };


      /**
        * Event that handles the google login process
        * onAuthStateChange handles redirect if successful
        *
        * @returns {Null}
      */
      Login.prototype.handlerGoogleLogin = function() {
        // Local Persistence: state will be persisted even when the
        // browser window is closed or the activity is destroyed
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
              .catch(function(error) {
                window.Japan.Error.handlerShowError(error);
              }.bind(this));
          }.bind(this))
          .catch(function(error) {
            window.Japan.Error.handlerShowError(error);
          }.bind(this));
      };


      /**
        * Event that handles the email login process
        * onAuthStateChange handles redirect if successful
        *
        * @returns {Null}
      */
      Login.prototype.handlerEmailLogin = function(e) {
        e.preventDefault();
        var email = this.$dom.login_email.val();
        var password = this.$dom.login_password.val();

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(function() {
            firebase.auth().signInWithEmailAndPassword(email, password)
              .catch(function(error) {
                window.Japan.Error.handlerShowError(error);
              }.bind(this));
          }.bind(this))
          .catch(function(error) {
            window.Japan.Error.handlerShowError(error);
          }.bind(this));
      };


      /**
        * Event that handles the user registration process
        * onAuthStateChange handles redirect if successful
        *
        * @returns {Null}
      */
      Login.prototype.handlerRegisterUser = function(e) {
        e.preventDefault();
        // Local Persistence: state will be persisted even when the
        // browser window is closed or the activity is destroyed
        var email = this.$dom.register_email.val().trim();
        var password = this.$dom.register_password.val();
        var pConfirm = this.$dom.register_p_confirm.val();

        if(!email.length) {
          window.Japan.Error.handlerShowError({message: 'Please enter your email address.'});
        } else if(!pConfirm.length || !password.length) {
          window.Japan.Error.handlerShowError({message: 'Please enter and confirm your password.'})
        } else if(pConfirm !== password) {
          window.Japan.Error.handlerShowError({message:'Passwords do not match. Please re-enter your password now.'});
        } else if(password.length < 6 || pConfirm.length < 6) {
          window.Japan.Error.handlerShowError({message:'Password must be at least 6 characters.'});
        } else {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
              firebase.auth().createUserWithEmailAndPassword(email, password)
                .catch(function(error) {
                  window.Japan.Error.handlerShowError(error);
                }.bind(this));
            }.bind(this))
            .catch(function(error) {
              window.Japan.Error.handlerShowError(error);
            }.bind(this));
        }
      };


      /**
        * Opens the registration modal
        * with a fade duration, fadeDelay 0.5 means it will start when the
        * overlay is 50% in
        *
        * @returns {Null}
      */
      Login.prototype.handlerRegisterModal = function(e) {
        e.preventDefault();
        this.$dom.register_modal_wrapper.modal({
          fadeDuration: 500,
          fadeDelay: 0.50
        });
      }


      // Initializes Login
      window.Japan.Navigation = new Login();

    })(window.Japan.Login = window.Japan.Login || {});
  })(window.jQuery, window._);
})
