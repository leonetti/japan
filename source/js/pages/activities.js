


jQuery.noConflict();
(function($) {


  $(document).ready(function(e) {

    (function(Activities) {

      Activities = function(options) {
        this.cfg = _.extend({
          selectors : {
            'activities_wrapper'     : '.activities--wrapper',
            'grid_wrapper'           : '.activities--wrapper .grid',
            'grid_item'              : '.activities--wrapper .grid--item',
            'content_wrapper'        : '.activities--content--wrapper',
            'content_item'           : '.activities--content--wrapper .content--show',
            'content_close'          : '.activities--content--wrapper .close--content',
            'add_item'               : '[data-add-item]',
          },
        })

        this.getDOMRefs();
        this.bindHandlers();
        this.checkUserName();
      };


      /**
        * Get/update this.$dom with configured jQuery references
        *
        * @returns {Null}
      */
      Activities.prototype.getDOMRefs = function() {
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
        * Build/update this.templates with configured template selectors
        *
        * @returns {Object}
      */
      Activities.prototype.buildTemplates = function() {
        this.templates = this.templates || {};
        _.forOwn(this.cfg.templates, function(selector, name) {
          var $el = $(selector);

          if ($el.length) {
            this.templates[name] = _.template($el.html());
          } else {
            window.Japan.Error.handlerShowError({message: 'Activities: Template Can\'t be build.'});
          }
        }.bind(this));
      };



      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Activities.prototype.bindHandlers = function() {
        this.$dom.grid_item.on('click', this.handlerGridClick.bind(this));
        this.$dom.content_close.on('click', this.handlerCloseContent.bind(this));
        this.$dom.add_item.on('click', this.handlerAddUserActivity.bind(this));
      };



      /**
        * Handles animations and content changes when grid item is clicked
        *
        * @returns {Null}
      */
      Activities.prototype.handlerGridClick = function(e) {
        var $el = $(e.target).closest('.grid--item');
        var $loader = $el.find('.loader').addClass('active');
        var ref = $el.data('ref');
        setTimeout(function() {
          this.$dom.activities_wrapper.fadeOut('slow');
        }.bind(this), 500);
        setTimeout(function() {
          $loader.removeClass('active');
          $(this.$dom.content_item[ref]).fadeIn('slow');
        }.bind(this), 1000);
      };



      /**
        * Handles animations and content changes when closing content
        *
        * @returns {Null}
      */
      Activities.prototype.handlerCloseContent = function(e) {
        this.$dom.content_item.fadeOut('slow');
        this.$dom.activities_wrapper.fadeIn('slow');
      };



      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Activities.prototype.handlerAddUserActivity = function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.Japan.Error.handlerShowError('Coming Soon: Add Activities to Your Own List!', true);
      };



      /**
        * If User registers with email we need to set display name
        *
        * @returns {Null}
      */
      Activities.prototype.checkUserName = function() {
        var user = JSON.parse(localStorage.getItem('user'));
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
        // Add data to navigation
        if(user) {
          $('[data-user-name]').text(user.name);
          $('[data-user-email]').html(user.email + ' <i class="fas fa-cog"></i>');
        }
      }




      // Initializes Login
      new Activities();
    })(window.Japan.Activities = window.Japan.Activities || {});

  })
})(jQuery);

