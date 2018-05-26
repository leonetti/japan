document.addEventListener("DOMContentLoaded",function(e){jQuery.noConflict(),function(t,r){"use strict";var e;firebase.auth().onAuthStateChanged(function(e){e&&(window.location="/pages/activities.html")}),e=window.Japan.Login=window.Japan.Login||{},(e=function(e){this.cfg=r.extend({selectors:{google_login:".login--google--submit [data-google-login]",email_login:".login--email--submit [data-email-login]",login_email:".login--wrapper [data-login-email]",login_password:".login--wrapper [data-login-password]",error_text:".error--text",error_wrapper:".error--wrapper",error_close:".close--error",register_modal_wrapper:"#register",register_modal_buttons:".register--button,.mobile--register--button",register_email:"#register [data-register-email]",register_password:"#register [data-register-password]",register_p_confirm:"#register [data-register-password-confirm]",register_submit:"#register [data-register-submit]"}}),this.getDOMRefs(),this.bindHandlers()}).prototype.getDOMRefs=function(){this.$dom=this.$dom||{},r.forOwn(this.cfg.selectors,function(e,r){this.$dom[r]=t(e),this.$dom[r].length||console.log("Login Developer Warning: Selected element not found")}.bind(this))},e.prototype.bindHandlers=function(){this.$dom.google_login.on("click",this.handlerGoogleLogin.bind(this)),this.$dom.email_login.on("click",this.handlerEmailLogin.bind(this)),this.$dom.register_submit.on("click",this.handlerRegisterUser.bind(this)),this.$dom.register_modal_buttons.on("click",this.handlerRegisterModal.bind(this))},e.prototype.handlerGoogleLogin=function(){firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){var e=new firebase.auth.GoogleAuthProvider;firebase.auth().signInWithPopup(e).catch(function(e){window.Japan.Error.handlerShowError(e)}.bind(this))}.bind(this)).catch(function(e){window.Japan.Error.handlerShowError(e)}.bind(this))},e.prototype.handlerEmailLogin=function(e){e.preventDefault();var r=this.$dom.login_email.val(),t=this.$dom.login_password.val();firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){firebase.auth().signInWithEmailAndPassword(r,t).catch(function(e){window.Japan.Error.handlerShowError(e)}.bind(this))}.bind(this)).catch(function(e){window.Japan.Error.handlerShowError(e)}.bind(this))},e.prototype.handlerRegisterUser=function(e){e.preventDefault();var r=this.$dom.register_email.val().trim(),t=this.$dom.register_password.val(),i=this.$dom.register_p_confirm.val();r.length?i.length&&t.length?i!==t?window.Japan.Error.handlerShowError({message:"Passwords do not match. Please re-enter your password now."}):t.length<6||i.length<6?window.Japan.Error.handlerShowError({message:"Password must be at least 6 characters."}):firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){firebase.auth().createUserWithEmailAndPassword(r,t).catch(function(e){window.Japan.Error.handlerShowError(e)}.bind(this))}.bind(this)).catch(function(e){window.Japan.Error.handlerShowError(e)}.bind(this)):window.Japan.Error.handlerShowError({message:"Please enter and confirm your password."}):window.Japan.Error.handlerShowError({message:"Please enter your email address."})},e.prototype.handlerRegisterModal=function(e){e.preventDefault(),this.$dom.register_modal_wrapper.modal({fadeDuration:500,fadeDelay:.5})},new e}(window.jQuery,window._)});