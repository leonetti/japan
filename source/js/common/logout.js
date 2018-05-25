/**
 * Japan - Logout
 *
 * Dependencies:
 * jQuery, lodash
 *
 * Japan.Logout - Class
 *
 */

document.addEventListener('DOMContentLoaded', function(e) {

  jQuery.noConflict();

  (function ( $, _ ) {
    'use strict';


    // Japan.Logout namespace
    (function(Logout) {

      Logout = function(options) {
        this.cfg = _.extend({
          selectors : {
            'logout' : '#logout [data-logout]',
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
      Logout.prototype.getDOMRefs = function() {
        this.$dom = this.$dom || {};
        _.forOwn(this.cfg.selectors, function(selector, name) {
          this.$dom[name] = $(selector);

          // Display an error if we didn't match an element
          if (!this.$dom[name].length) {
            alert('Logout: Selected element not found');
          }
        }.bind(this));
      };


      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Logout.prototype.bindHandlers = function() {
        this.$dom.logout.on('click', this.handlerLogout.bind(this));
      };


      /**
        * Get/update this.$dom with configured jQuery references
        *
        * @returns {Null}
      */
      Logout.prototype.handlerLogout = function() {
        firebase.auth().signOut()
          .then(function(result) {
            window.location = '/';
          })
          .catch(function(error) {
            console.log('error: ', error);
          });
      }

      // Initializes Logout
      new Logout();
    })(window.Japan.Logout = window.Japan.Logout || {});
  })(window.jQuery, window._);
})
