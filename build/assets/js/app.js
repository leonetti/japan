window.sr=ScrollReveal(),window.Japan=window.Japan||{},jQuery.noConflict(),function(i){window.$=window.jQuery(),i(".input--wrapper label, .input--wrapper label i").on("click",function(n){i(n.target).closest(".input--wrapper").find(".input--field").focus()}),i(document).ready(function(n){initApp()})}(jQuery),initApp=function(){firebase.auth().onAuthStateChanged(function(n){n?window.Japan.user={name:n.displayName,email:n.email}:"/"!==window.location.pathname&&(window.location="/")},function(n){console.log(n)})};