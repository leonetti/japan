jQuery.noConflict(),function(n){n(document).ready(function(t){var e;e=window.Japan.Activities=window.Japan.Activities||{},(e=function(t){this.cfg=_.extend({selectors:{activities_wrapper:".activities--wrapper",grid_wrapper:".activities--wrapper .grid",grid_item:".activities--wrapper .grid--item",content_wrapper:".activities--content--wrapper",content_item:".activities--content--wrapper .content--show",content_close:".activities--content--wrapper .close--content"}}),this.getDOMRefs(),this.bindHandlers(),this.checkUserName()}).prototype.getDOMRefs=function(){this.$dom=this.$dom||{},_.forOwn(this.cfg.selectors,function(t,e){this.$dom[e]=n(t),this.$dom[e].length||console.log("Login Developer Warning: Selected element not found")}.bind(this))},e.prototype.buildTemplates=function(){this.templates=this.templates||{},_.forOwn(this.cfg.templates,function(t,e){var i=n(t);i.length?this.templates[e]=_.template(i.html()):window.Japan.Error.handlerShowError({message:"Activities: Template Can't be build."})}.bind(this))},e.prototype.bindHandlers=function(){this.$dom.grid_item.on("click",this.handlerGridClick.bind(this)),this.$dom.content_close.on("click",this.handlerCloseContent.bind(this))},e.prototype.handlerGridClick=function(t){var e=n(t.target).closest(".grid--item"),i=e.find(".loader").addClass("active"),o=e.data("ref");setTimeout(function(){this.$dom.activities_wrapper.fadeOut("slow")}.bind(this),500),setTimeout(function(){i.removeClass("active"),n(this.$dom.content_item[o]).fadeIn("slow")}.bind(this),1e3)},e.prototype.handlerCloseContent=function(t){this.$dom.content_item.fadeOut("slow"),this.$dom.activities_wrapper.fadeIn("slow")},e.prototype.checkUserName=function(){var t=JSON.parse(localStorage.getItem("user"));if(!t.name){n("#settings--modal .form--show--button,#settings--modal .user--logout").hide();var e=n('[data-update-text="name"]').closest(".input--wrapper");e.show(),e.prev(".update--label").show(),n(".form--back").show().attr("disabled",!0),n(".update--submit").css("display","block"),n("#settings--modal").modal({fadeDuration:500,fadeDelay:.5,escapeClose:!1,clickClose:!1,showClose:!1}),n("[data-update-submit]").on("click",function(t){n(".form--back").attr("disabled",!1)})}t&&(n("[data-user-name]").text(t.name),n("[data-user-email]").html(t.email+' <i class="fas fa-cog"></i>'))},new e})}(jQuery);