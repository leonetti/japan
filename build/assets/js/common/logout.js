document.addEventListener("DOMContentLoaded",function(o){jQuery.noConflict(),function(n,t){"use strict";var o;o=window.Japan.Logout=window.Japan.Logout||{},(o=function(o){this.cfg=t.extend({selectors:{logout:"#logout [data-logout]"}}),this.getDOMRefs(),this.bindHandlers()}).prototype.getDOMRefs=function(){this.$dom=this.$dom||{},t.forOwn(this.cfg.selectors,function(o,t){this.$dom[t]=n(o),this.$dom[t].length||alert("Logout: Selected element not found")}.bind(this))},o.prototype.bindHandlers=function(){this.$dom.logout.on("click",this.handlerLogout.bind(this))},o.prototype.handlerLogout=function(){firebase.auth().signOut().then(function(o){window.location="/"}).catch(function(o){console.log("error: ",o)})},new o}(window.jQuery,window._)});