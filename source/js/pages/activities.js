


jQuery.noConflict();
(function($) {


  $(document).ready(function(e) {

    (function(Activities) {

      var db = firebase.firestore();
      var activitiesRef = db.collection('activities');
      var storageRef = firebase.storage();

      Activities = function(options) {
        this.cfg = _.extend({
          selectors : {
            'activities_wrapper'     : '.activities--wrapper',
            'grid_wrapper'           : '.activities--wrapper--grid',
            'grid'                   : '.activities--wrapper--grid .grid',
            'content_wrapper'        : '.activities--content--wrapper',
          },
          templates : {
            'activity_description'   : '[data-template="activity_description"]',
            'activity_button'        : '[data-template="activity_button"]',
          },
        })

        this.activities = [];

        this.getDOMRefs();
        this.bindHandlers();
        this.buildTemplates();
        this.checkUserName();
        this.getActivities();

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
            window.Japan.Error.handlerShowError('Activities: Template Can\'t be build.');
          }
        }.bind(this));
      };



      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Activities.prototype.bindHandlers = function() {
        this.$dom.grid.on('click', '.grid--item', this.handlerGridClick.bind(this));
        this.$dom.grid.on('click', '[data-add-item]', this.handlerAddUserActivity.bind(this, 'grid'));
        this.$dom.content_wrapper.on('click', '[data-add-item]', this.handlerAddUserActivity.bind(this, 'content'));
        this.$dom.content_wrapper.on('click', '.close--content', this.handlerCloseContent.bind(this));
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
          this.$dom.grid.fadeOut('slow');
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
        this.$dom.grid.fadeIn('slow');
      };



      /**
        * Binds event listeners
        *
        * @returns {Null}
      */
      Activities.prototype.handlerAddUserActivity = function(type, e) {
        e.preventDefault();
        e.stopPropagation();
        var id = type === 'grid' ? $(e.target).closest('.grid--item').attr('data-activity-id') : $(e.target).closest('.content--show').attr('data-activity-id');
        var currentUser = JSON.parse(localStorage.getItem('user'));
        var index = _.findIndex(this.activities, {id: id});
        var activity = this.activities[index];
        var users = activity.users;
        var userIndex = _.findIndex(users, currentUser);

        console.log('user index: ', userIndex);

        if(userIndex === -1) {
          users.push({
            email: currentUser.email,
            name: currentUser.name,
          })

          console.log('users: ', users);

          activitiesRef.doc(id).update({
            users : users,
          });
          window.Japan.Error.handlerShowError('Added Activity: ' + activity.title + ' to your list!', true);
          this.getActivities();
          this.$dom.grid.fadeIn('slow');
          this.$dom.content_item.fadeOut('slow');
        } else {
          window.Japan.Error.handlerShowError('Activity: ' + activity.title + ' already is in your list!', true);
        }

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


      /**
        * If User registers with email we need to set display name
        *
        * @returns {Null}
      */
      Activities.prototype.getActivities = function() {
        this.activities = [];
        var promises = [];
        var all_url = [];

        activitiesRef.get()
          .then(function(snapshot){
            promises.push(snapshot.docs.map(function(doc) {
              this.activities.push(_.extend(doc.data(), {id : doc.id}));
            }.bind(this)));

            _.each(this.activities, function(val, key) {
              var title = val.title;
              if(storageRef.ref(title)) {
                promises.push(storageRef.ref(title).getDownloadURL().then(function(url) {
                  var item = {};
                  item[title] = url;
                  all_url.push(item)
                }.bind(this)));
              }
            }.bind(this));


            Promise.all(promises).then(function() {

              _.each(all_url, function(url) {
                var key = Object.keys(url)[0];
                var index = _.findIndex(this.activities, {title: key});
                var activity = this.activities.splice(index,1)[0];
                console.log('activity: ', activity);
                activity.image = url[key];
                this.activities.push(activity);
              }.bind(this));

              this.activities = _.orderBy(this.activities, 'title');

              this.$dom.grid.html(this.templates.activity_button({
                activities: this.activities
              }));

              this.$dom.content_wrapper.html(this.templates.activity_description({
                activities: this.activities
              }));

              this.$dom.content_item = $('.activities--content--wrapper .content--show');
            }.bind(this));



          }.bind(this))
          .catch(function(error) {
            window.Japan.Error.handlerShowError('Error getting activities: ' + error);
          }.bind(this));
      }


      /**
        * Empty Activities List
        *
        * @returns {Null}
      */
      Activities.prototype.emptyActivities = function() {
        this.$dom.grid.empty();
      }




      // Initializes Login
      window.Japan.Activities = new Activities();

    })(window.Japan.Activities = window.Japan.Activities || {});

  })
})(jQuery);

