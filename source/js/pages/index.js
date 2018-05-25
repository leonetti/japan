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
            'google_login' : '.login--google [data-google-login]',
          }
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
            alert('Login: Selected element not found');
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
      };


      /**
        * Event that handles the login process
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
                console.log('error: ', error.message);
              });
          })
          .catch(function(error) {
            console.log('error: ', error.message);
          });
      };


      // Initializes Login
      new Login();
    })(window.Japan.Login = window.Japan.Login || {});
  })(window.jQuery, window._);
})
