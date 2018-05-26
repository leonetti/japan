/**
 * Japan - Error
 *
 * Dependencies:
 * jQuery, lodash
 *
 * Japan.Error - Class
 *
 */

document.addEventListener('DOMContentLoaded', function(e) {

  jQuery.noConflict();

  (function ( $, _ ) {
    'use strict';


    // Japan.Error namespace
    (function(Error) {

      Error = function(options) {
        this.cfg = _.extend({
          selectors : {
            'error_wrapper'     : '.error--wrapper',
            'error_close'       : '.close--error',
            'error_text'        : '.error--text',
          }
        })
        this.getDOMRefs();
        this.bindHandlers();
      };

      /**
        * Event that closes the current error shown
        *
        * @returns {Null}
      */
      Error.prototype.handlerCloseError = function() {
        this.$dom.error_wrapper.hide('slow');
      };


      /**
        * Shows Error
        * @param message {STRING} the message we want to display
        * @param success {BOOL} if success we want to display in green
        *
        * @returns {Null}
      */
      Error.prototype.handlerShowError = function(message, success) {
        this.$dom.error_text.removeClass('success--text');
        this.$dom.error_text.text(message);
        this.$dom.error_wrapper.show('slow');
        if(success) {
          this.$dom.error_text.addClass('success--text');
        }
      };



      /**
        * Binds events
        *
        * @returns {Null}
      */
      Error.prototype.bindHandlers = function() {
        this.$dom.error_close.on('click', this.handlerCloseError.bind(this));
      }


      /**
        * Get/update this.$dom with configured jQuery references
        *
        * @returns {Null}
      */
      Error.prototype.getDOMRefs = function() {
        this.$dom = this.$dom || {};
        _.forOwn(this.cfg.selectors, function(selector, name) {
          this.$dom[name] = $(selector);

          // Display an error if we didn't match an element
          if (!this.$dom[name].length) {
            alert('Error: Selected element not found');
          }
        }.bind(this));
      };


      // Initializes Error
      window.Japan.Error = new Error();
    })(window.Japan.Error = window.Japan.Error || {});
  })(window.jQuery, window._);
})
