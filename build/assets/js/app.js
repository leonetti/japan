window.sr=ScrollReveal(),window.Japan=window.Japan||{},jQuery.noConflict(),function(n){window.$=window.jQuery(),n(".input--wrapper label, .input--wrapper label i").on("click",function(e){n(e.target).closest(".input--wrapper").find(".input--field").focus()}),n(".textarea--wrapper label, .textarea--wrapper label i").on("click",function(e){n(e.target).closest(".textarea--wrapper").find(".input--field").focus()}),n(document).ready(function(e){initApp()})}(jQuery),initApp=function(){firebase.app();firebase.auth().onAuthStateChanged(function(e){if(e){e={name:e.displayName,email:e.email};window.localStorage.setItem("user",JSON.stringify(e))}else window.localStorage.removeItem("user"),"/"!==window.location.pathname&&(window.location="/")},function(e){console.log(e)})};