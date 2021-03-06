/**
 * Japan - Navigation
 *
 * Dependencies:
 * jQuery, lodash
 *
 * Japan.Navigation - Class
 *
 */

document.addEventListener('DOMContentLoaded', function(e) {

  jQuery.noConflict();

  (function ( $, _ ) {
    'use strict';


    // Japan.Navigation namespace
    (function(Navigation) {

      var db = firebase.firestore();
      var activitiesRef = db.collection('activities');
      var storageRef = firebase.storage();

      Navigation = function(options) {
        this.cfg = _.extend({
          selectors : {
            'logout'                     : '.navigation--wrapper [data-logout]',
            'logout_confirm'             : '#settings--modal [data-logout-confirm]',
            'settings_modal'             : '#settings--modal',
            'user_form_button'           : '#settings--modal [data-update-button]',
            'user_submit'                : '#settings--modal [data-update-submit]',
            'form_back'                  : '#settings--modal .form--back',
            'user_inputs'                : '#settings--modal .input--wrapper',
            'user_labels'                : '#settings--modal .update--label',
            'user_password_confirm'      : '#settings--modal [data-password-confirm-wrapper]',
            'show_activity_modal'        : '.navigation--wrapper [data-activity-modal]',
            'activity_modal'             : '#activity--modal',
            'activity_submit'            : '#activity--modal [data-activity-submit]',
            'activity_title'             : '#activity--modal [data-activity="title"]',
            'activity_subtitle'          : '#activity--modal [data-activity="subtitle"]',
            'activity_description'       : '#activity--modal [data-activity="description"]',
            'activity_price'             : '#activity--modal [data-activity="price"]',
            'activity_file'              : '#activity--modal [data-activity="file"]',
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
      Navigation.prototype.getDOMRefs = function() {
        this.$dom = this.$dom || {};
        _.forOwn(this.cfg.selectors, function(selector, name) {
          this.$dom[name] = $(selector);

          // Display an error if we didn't match an element
          if (!this.$dom[name].length) {
            alert('Navigation: Selected element not found');
          }
        }.bind(this));
      };


      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Navigation.prototype.bindHandlers = function() {
        this.$dom.logout.on('click', this.handlerShowLogout.bind(this));
        this.$dom.logout_confirm.on('click', this.handlerLogout.bind(this));
        this.$dom.user_form_button.on('click', this.handlerShowSubForm.bind(this));
        this.$dom.form_back.on('click', this.handlerFormGoBack.bind(this));
        this.$dom.user_submit.on('click', this.handlerUpdateUser.bind(this));
        this.$dom.show_activity_modal.on('click', this.handlerShowActivityModal.bind(this));
        this.$dom.activity_submit.on('click', this.handlerAddActivity.bind(this));
      };


      /**
        * Adds Activity to DB
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerAddActivity = function(e) {
        e.preventDefault();
        var title = this.$dom.activity_title.val().trim();
        var subtitle = this.$dom.activity_subtitle.val().trim();
        var description = this.$dom.activity_description.val().trim();
        var price = parseFloat(this.$dom.activity_price.val());
        var file = document.querySelector('input[type=file]').files[0];
        var data = {
          title: title,
          sub_title: subtitle,
          description: description,
          price: price,
          users: [],
        }
        console.log('file: ', file);
        if(!title) {
          window.Japan.Error.handlerShowError('Please enter a valid title.');
        } else if(!subtitle) {
          window.Japan.Error.handlerShowError('Please enter a valid subtitle. i.e: Shopping Center.');
        } else if(!description) {
          window.Japan.Error.handlerShowError('Please enter a description.');
        } else if(isNaN(price)) {
          window.Japan.Error.handlerShowError('Please enter a valid price, if free enter 0.');
        } else if(!file) {
          window.Japan.Error.handlerShowError('Please upload a picture.');
        } else {
          activitiesRef.doc().set(data)
            .then(function() {
              storageRef.ref('/' + title + '/').put(file)
                .then(function(snapshot) {
                  if(!_.isEmpty(window.Japan.Activities)) {
                    window.Japan.Activities.emptyActivities();
                    window.Japan.Activities.getActivities();
                    window.Japan.Error.handlerShowError('Activity Added!', true);
                  }
                }.bind(this))
                .catch(function(error) {
                  window.Japan.Error.handlerShowError('Can\'t update activities. Refresh page.');
                }.bind(this));
            }.bind(this))
            .catch(function(error) {
              window.Japan.Error.handlerShowError('Can\'t update activities. Refresh page.');
            }.bind(this));
          this.hideUserModal();
        }
      }


      /**
        * Shows Activity Modal
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerShowActivityModal = function(e) {
        e.preventDefault();
        this.$dom.activity_modal.modal({
          fadeDuration: 500,
          fadeDelay: 0.50
        });
      }


      /**
        * Shows Logout Modal
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerShowLogout = function(e) {
        e.preventDefault();
        this.handlerResetUserSettings();
        this.$dom.settings_modal.modal({
          fadeDuration: 500,
          fadeDelay: 0.50
        });
      }


      /**
        * Logs a user out
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerLogout = function() {
        firebase.auth().signOut()
          .then(function(result) {
            window.location = '/';
          })
          .catch(function(error) {
            window.Japan.Error.handlerShowError(error);
          });
      }



      /**
        * Shows correct editable user form
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerShowSubForm = function(e) {
        var type = $(e.target).data('update-button');
        this.$dom.user_form_button.hide();
        var $label = $(e.target).next('.update--label');
        $label.fadeIn('slow');
        $label.next('.input--wrapper').fadeIn('slow');
        if(type === 'password') {
          this.$dom.user_password_confirm.fadeIn('slow');
        }
        this.$dom.user_submit.css('display', 'block');
        this.$dom.form_back.fadeIn('slow');
        this.$dom.logout_confirm.hide();
      }



      /**
        * Goes back to user settings form
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerFormGoBack = function(e) {
        this.handlerResetUserSettings();
      }


      /**
        * Goes back to user settings form
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerResetUserSettings = function(e) {
        this.$dom.user_form_button.show();
        this.$dom.user_inputs.hide();
        this.$dom.user_labels.hide();
        this.$dom.user_submit.hide();
        this.$dom.form_back.hide();
        this.$dom.logout_confirm.show();
      }



      /**
        * Updates User Password
        * @param $wrappers {OBJECT} - jQuery object of wrappers
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerUpdatePassword = function($wrappers, user) {
        var passwordInputs = $wrappers.find('.input--field');
        var password = passwordInputs[0].value;
        var pConfirm = passwordInputs[1].value;

        if(pConfirm !== password) {
          window.Japan.Error.handlerShowError('Passwords do not match. Please re-enter your password now.');
        } else if(password.length < 6 || pConfirm.length < 6) {
          window.Japan.Error.handlerShowError('Password must be at least 6 characters.');
        } else {
          user.updatePassword(password)
            .then(function() {
              window.Japan.Error.handlerShowError('Password updated', true);
              this.hideUserModal();
            }.bind(this))
            .catch(function(error) {
              window.Japan.Error.handlerShowError(error);
            });
        }
      }


      /**
        * Hides the User Settings modal
        *
        * @returns {Null}
      */
      Navigation.prototype.hideUserModal = function() {
        this.$dom.settings_modal.modal();
        $('.jquery-modal.blocker').hide();
        $('body').removeAttr('style');
      }


      /**
        * Updates User Email
        * @param user {OBJECT} - from firebase that contains user information
        * @param val {STRING} - the value we will be updating with
        * @param type {STRING} - the type of thing we will be updating (email/name/password)
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerUpdateEmail = function(user, val, type) {
        user.updateEmail(val).then(function() {
          // Update successful.
          window.Japan.Error.handlerShowError('Email updated', true);
          var user = JSON.parse(localStorage.getItem('user'));
          user[type] = val;
          window.localStorage.setItem('user', JSON.stringify(user));
          $('[data-user-' + type + ']').text(user[type]);
          this.hideUserModal();
        }.bind(this)).catch(function(error) {
          window.Japan.Error.handlerShowError(error);
        });
      }


      /**
        * Updates User Email
        * @param user {OBJECT} - from firebase that contains user information
        * @param val {STRING} - the value we will be updating with
        * @param type {STRING} - the type of thing we will be updating (email/name/password)
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerUpdateName = function(user, val, type) {
        user.updateProfile({
          displayName: val,
        }).then(function() {
          window.Japan.Error.handlerShowError('Name updated', true);
          var user = JSON.parse(localStorage.getItem('user'));
          user[type] = val;
          window.localStorage.setItem('user', JSON.stringify(user));
          $('[data-user-' + type + ']').text(user[type]);
          this.hideUserModal();

        }.bind(this)).catch(function(error) {
          window.Japan.Error.handlerShowError(error);
        });
      }


      /**
        * Updates the user in the database
        *
        * @returns {Null}
      */
      Navigation.prototype.handlerUpdateUser = function() {
        var $wrappers = $('#settings--modal .input--wrapper:visible');
        var user = firebase.auth().currentUser;
        var val;
        var type;

        // if showing two fields it's password update
        if($wrappers.length > 1) {
          this.handlerUpdatePassword($wrappers, user);
        } else {
          var $el = $wrappers.find('.input--field');
          val = $el.val().trim();
          type = $el.attr('data-update-text');

          if(val.length) {
            if(type === 'email') {
              this.handlerUpdateEmail(user, val, type);
            } else {
              this.handlerUpdateName(user, val, type);
            }
          }
        }
      }

      // Initializes Navigation
      window.Japan.Navigation = new Navigation();

    })(window.Japan.Navigation = window.Japan.Navigation || {});
  })(window.jQuery, window._);
})
