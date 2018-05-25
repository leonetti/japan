
// JavaScript
window.sr = ScrollReveal();
window.$ = window.jQuery();

window.Japan = window.Japan || {};

window.jQuery('.input--wrapper label, .input--wrapper label i').on('click', function(e) {
  jQuery(e.target).closest('.input--wrapper').find('.input--field').focus();
});


