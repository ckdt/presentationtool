// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/**
 * fullPage 2.5.7
 * https://github.com/alvarotrigo/fullPage.js
 * MIT licensed
 *
 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
 */
(function(b){b.fn.fullpage=function(c){function wa(a){a.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');"#fff"!=c.controlArrowColor&&(a.find(".fp-controlArrow.fp-next").css("border-color","transparent transparent transparent "+c.controlArrowColor),a.find(".fp-controlArrow.fp-prev").css("border-color","transparent "+c.controlArrowColor+" transparent transparent"));c.loopHorizontal||a.find(".fp-controlArrow.fp-prev").hide()}function xa(){b("body").append('<div id="fp-nav"><ul></ul></div>');
h=b("#fp-nav");h.css("color",c.navigationColor);h.addClass(c.navigationPosition);for(var a=0;a<b(".fp-section").length;a++){var d="";c.anchors.length&&(d=c.anchors[a]);var d='<li><a href="#'+d+'"><span></span></a>',e=c.navigationTooltips[a];void 0!==e&&""!=e&&(d+='<div class="fp-tooltip '+c.navigationPosition+'">'+e+"</div>");d+="</li>";h.find("ul").append(d)}}function V(){b(".fp-section").each(function(){var a=b(this).find(".fp-slide");a.length?a.each(function(){A(b(this))}):A(b(this))});b.isFunction(c.afterRender)&&
c.afterRender.call(this)}function W(){var a;if(!c.autoScrolling||c.scrollBar){var d=b(window).scrollTop(),e=0,g=Math.abs(d-b(".fp-section").first().offset().top);b(".fp-section").each(function(a){var c=Math.abs(d-b(this).offset().top);c<g&&(e=a,g=c)});a=b(".fp-section").eq(e)}if((!c.autoScrolling||c.scrollBar)&&!a.hasClass("active")){J=!0;var f=b(".fp-section.active"),ya=f.index(".fp-section")+1,k=K(a),B=a.data("anchor"),h=a.index(".fp-section")+1,t=a.find(".fp-slide.active");if(t.length)var l=t.data("anchor"),
m=t.index();a.addClass("active").siblings().removeClass("active");n&&(b.isFunction(c.onLeave)&&c.onLeave.call(f,ya,h,k),b.isFunction(c.afterLoad)&&c.afterLoad.call(a,B,h),L(B,h-1),c.anchors.length&&(p=B,M(m,l,B,h)));clearTimeout(X);X=setTimeout(function(){J=!1},100)}c.scrollBar&&(clearTimeout(Y),Y=setTimeout(function(){n&&(b(".fp-section.active").is(a)&&(v=!0),q(a),v=!1)},1E3))}function Z(a){return a.find(".fp-slides").length?a.find(".fp-slide.active").find(".fp-scrollable"):a.find(".fp-scrollable")}
function C(a,d){if(l[a]){var c,g;"down"==a?(c="bottom",g=b.fn.fullpage.moveSectionDown):(c="top",g=b.fn.fullpage.moveSectionUp);if(0<d.length)if(c="top"===c?!d.scrollTop():"bottom"===c?d.scrollTop()+1+d.innerHeight()>=d[0].scrollHeight:void 0,c)g();else return!0;else g()}}function za(a){var d=a.originalEvent;if(!aa(a.target)&&ba(d)){c.autoScrolling&&a.preventDefault();a=b(".fp-section.active");var e=Z(a);n&&!w&&(d=ca(d),u=d.y,D=d.x,a.find(".fp-slides").length&&Math.abs(E-D)>Math.abs(x-u)?Math.abs(E-
D)>b(window).width()/100*c.touchSensitivity&&(E>D?l.right&&b.fn.fullpage.moveSlideRight():l.left&&b.fn.fullpage.moveSlideLeft()):c.autoScrolling&&Math.abs(x-u)>b(window).height()/100*c.touchSensitivity&&(x>u?C("down",e):u>x&&C("up",e)))}}function aa(a,d){d=d||0;var e=b(a).parent();return d<c.normalScrollElementTouchThreshold&&e.is(c.normalScrollElements)?!0:d==c.normalScrollElementTouchThreshold?!1:aa(e,++d)}function ba(a){return"undefined"===typeof a.pointerType||"mouse"!=a.pointerType}function Aa(a){a=
a.originalEvent;c.scrollBar&&b("html,body").stop();ba(a)&&(a=ca(a),x=a.y,E=a.x)}function da(a,d){for(var b=0,c=a.slice(Math.max(a.length-d,1)),f=0;f<c.length;f++)b+=c[f];return Math.ceil(b/d)}function r(a){(new Date).getTime();if(c.autoScrolling){a=window.event||a;var d=a.wheelDelta||-a.deltaY||-a.detail,e=Math.max(-1,Math.min(1,d));149<y.length&&y.shift();y.push(Math.abs(d));c.scrollBar&&(a.preventDefault?a.preventDefault():a.returnValue=!1);a=b(".fp-section.active");a=Z(a);if(n){var d=da(y,10),
g=da(y,70);d>=g&&(0>e?C("down",a):C("up",a))}return!1}c.scrollBar&&b("html,body").stop()}function ea(a){var d=b(".fp-section.active").find(".fp-slides");if(d.length&&!w){var e=d.find(".fp-slide.active"),g=null,g="prev"===a?e.prev(".fp-slide"):e.next(".fp-slide");if(!g.length){if(!c.loopHorizontal)return;g="prev"===a?e.siblings(":last"):e.siblings(":first")}w=!0;z(d,g)}}function fa(){b(".fp-slide.active").each(function(){N(b(this))})}function q(a,d,e){var g=a.position();if("undefined"!==typeof g&&
(d={element:a,callback:d,isMovementUp:e,dest:g,dtop:g.top,yMovement:K(a),anchorLink:a.data("anchor"),sectionIndex:a.index(".fp-section"),activeSlide:a.find(".fp-slide.active"),activeSection:b(".fp-section.active"),leavingSection:b(".fp-section.active").index(".fp-section")+1,localIsResizing:v},!(d.activeSection.is(a)&&!v||c.scrollBar&&b(window).scrollTop()===d.dtop))){if(d.activeSlide.length)var f=d.activeSlide.data("anchor"),h=d.activeSlide.index();c.autoScrolling&&c.continuousVertical&&"undefined"!==
typeof d.isMovementUp&&(!d.isMovementUp&&"up"==d.yMovement||d.isMovementUp&&"down"==d.yMovement)&&(d.isMovementUp?b(".fp-section.active").before(d.activeSection.nextAll(".fp-section")):b(".fp-section.active").after(d.activeSection.prevAll(".fp-section").get().reverse()),m(b(".fp-section.active").position().top),fa(),d.wrapAroundElements=d.activeSection,d.dest=d.element.position(),d.dtop=d.dest.top,d.yMovement=K(d.element));a.addClass("active").siblings().removeClass("active");n=!1;M(h,f,d.anchorLink,
d.sectionIndex);b.isFunction(c.onLeave)&&!d.localIsResizing&&c.onLeave.call(d.activeSection,d.leavingSection,d.sectionIndex+1,d.yMovement);Ba(d);p=d.anchorLink;L(d.anchorLink,d.sectionIndex)}}function Ba(a){if(c.css3&&c.autoScrolling&&!c.scrollBar)ga("translate3d(0px, -"+a.dtop+"px, 0px)",!0),setTimeout(function(){ha(a)},c.scrollingSpeed);else{var d=Ca(a);b(d.element).animate(d.options,c.scrollingSpeed,c.easing).promise().done(function(){ha(a)})}}function Ca(a){var d={};c.autoScrolling&&!c.scrollBar?
(d.options={top:-a.dtop},d.element="."+ia):(d.options={scrollTop:a.dtop},d.element="html, body");return d}function Da(a){a.wrapAroundElements&&a.wrapAroundElements.length&&(a.isMovementUp?b(".fp-section:first").before(a.wrapAroundElements):b(".fp-section:last").after(a.wrapAroundElements),m(b(".fp-section.active").position().top),fa())}function ha(a){Da(a);b.isFunction(c.afterLoad)&&!a.localIsResizing&&c.afterLoad.call(a.element,a.anchorLink,a.sectionIndex+1);n=!0;setTimeout(function(){b.isFunction(a.callback)&&
a.callback.call(this)},600)}function ja(){if(!J){var a=window.location.hash.replace("#","").split("/"),d=a[0],a=a[1];if(d.length){var b="undefined"===typeof p,c="undefined"===typeof p&&"undefined"===typeof a&&!w;(d&&d!==p&&!b||c||!w&&O!=a)&&P(d,a)}}}function Ea(a){n&&(a.pageY<F?b.fn.fullpage.moveSectionUp():a.pageY>F&&b.fn.fullpage.moveSectionDown());F=a.pageY}function z(a,d){var e=d.position(),g=a.find(".fp-slidesContainer").parent(),f=d.index(),h=a.closest(".fp-section"),k=h.index(".fp-section"),
l=h.data("anchor"),m=h.find(".fp-slidesNav"),t=d.data("anchor"),n=v;if(c.onSlideLeave){var q=h.find(".fp-slide.active"),p=q.index(),r;r=p==f?"none":p>f?"left":"right";n||"none"===r||b.isFunction(c.onSlideLeave)&&c.onSlideLeave.call(q,l,k+1,p,r)}d.addClass("active").siblings().removeClass("active");"undefined"===typeof t&&(t=f);!c.loopHorizontal&&c.controlArrows&&(h.find(".fp-controlArrow.fp-prev").toggle(0!=f),h.find(".fp-controlArrow.fp-next").toggle(!d.is(":last-child")));h.hasClass("active")&&
M(f,t,l,k);var u=function(){n||b.isFunction(c.afterSlideLoad)&&c.afterSlideLoad.call(d,l,k+1,t,f);w=!1};c.css3?(e="translate3d(-"+e.left+"px, 0px, 0px)",ka(a.find(".fp-slidesContainer"),0<c.scrollingSpeed).css(la(e)),setTimeout(function(){u()},c.scrollingSpeed,c.easing)):g.animate({scrollLeft:e.left},c.scrollingSpeed,c.easing,function(){u()});m.find(".active").removeClass("active");m.find("li").eq(f).find("a").addClass("active")}function ma(){na();if(G){var a=b(document.activeElement);a.is("textarea")||
a.is("input")||a.is("select")||(a=b(window).height(),Math.abs(a-Q)>20*Math.max(Q,a)/100&&(b.fn.fullpage.reBuild(!0),Q=a))}else clearTimeout(oa),oa=setTimeout(function(){b.fn.fullpage.reBuild(!0)},500)}function na(){if(c.responsive){var a=f.hasClass("fp-responsive");b(window).width()<c.responsive?a||(b.fn.fullpage.setAutoScrolling(!1,"internal"),b("#fp-nav").hide(),f.addClass("fp-responsive")):a&&(b.fn.fullpage.setAutoScrolling(R.autoScrolling,"internal"),b("#fp-nav").show(),f.removeClass("fp-responsive"))}}
function ka(a){var d="all "+c.scrollingSpeed+"ms "+c.easingcss3;a.removeClass("fp-notransition");return a.css({"-webkit-transition":d,transition:d})}function S(a){return a.addClass("fp-notransition")}function Fa(a,d){if(825>a||900>d){var c=Math.min(100*a/825,100*d/900).toFixed(2);b("body").css("font-size",c+"%")}else b("body").css("font-size","100%")}function L(a,d){c.menu&&(b(c.menu).find(".active").removeClass("active"),b(c.menu).find('[data-menuanchor="'+a+'"]').addClass("active"));c.navigation&&
(b("#fp-nav").find(".active").removeClass("active"),a?b("#fp-nav").find('a[href="#'+a+'"]').addClass("active"):b("#fp-nav").find("li").eq(d).find("a").addClass("active"))}function K(a){var d=b(".fp-section.active").index(".fp-section");a=a.index(".fp-section");return d==a?"none":d>a?"up":"down"}function A(a){a.css("overflow","hidden");var d=a.closest(".fp-section"),b=a.find(".fp-scrollable"),g;b.length?g=b.get(0).scrollHeight:(g=a.get(0).scrollHeight,c.verticalCentered&&(g=a.find(".fp-tableCell").get(0).scrollHeight));
d=k-parseInt(d.css("padding-bottom"))-parseInt(d.css("padding-top"));g>d?b.length?b.css("height",d+"px").parent().css("height",d+"px"):(c.verticalCentered?a.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />'):a.wrapInner('<div class="fp-scrollable" />'),a.find(".fp-scrollable").slimScroll({allowPageScroll:!0,height:d+"px",size:"10px",alwaysVisible:!0})):pa(a);a.css("overflow","")}function pa(a){a.find(".fp-scrollable").children().first().unwrap().unwrap();a.find(".slimScrollBar").remove();
a.find(".slimScrollRail").remove()}function qa(a){a.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:'+ra(a)+'px;" />')}function ra(a){var b=k;if(c.paddingTop||c.paddingBottom)b=a,b.hasClass("fp-section")||(b=a.closest(".fp-section")),a=parseInt(b.css("padding-top"))+parseInt(b.css("padding-bottom")),b=k-a;return b}function ga(a,b){b?ka(f):S(f);f.css(la(a));setTimeout(function(){f.removeClass("fp-notransition")},10)}function P(a,d){var c;"undefined"===typeof d&&(d=0);c=isNaN(a)?
b('[data-anchor="'+a+'"]'):b(".fp-section").eq(a-1);a===p||c.hasClass("active")?sa(c,d):q(c,function(){sa(c,d)})}function sa(a,b){if("undefined"!=typeof b){var c=a.find(".fp-slides"),g=c.find('[data-anchor="'+b+'"]');g.length||(g=c.find(".fp-slide").eq(b));g.length&&z(c,g)}}function Ga(a,b){a.append('<div class="fp-slidesNav"><ul></ul></div>');var e=a.find(".fp-slidesNav");e.addClass(c.slidesNavPosition);for(var g=0;g<b;g++)e.find("ul").append('<li><a href="#"><span></span></a></li>');e.css("margin-left",
"-"+e.width()/2+"px");e.find("li").first().find("a").addClass("active")}function M(a,b,e,g){var f="";c.anchors.length?(a?("undefined"!==typeof e&&(f=e),"undefined"===typeof b&&(b=a),O=b,ta(f+"/"+b)):("undefined"!==typeof a&&(O=b),ta(e)),H(location.hash)):"undefined"!==typeof a?H(g+"-"+a):H(String(g))}function ta(a){if(c.recordHistory)location.hash=a;else if(G||T)history.replaceState(void 0,void 0,"#"+a);else{var b=window.location.href.split("#")[0];window.location.replace(b+"#"+a)}}function H(a){a=
a.replace("/","-").replace("#","");b("body")[0].className=b("body")[0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g,"");b("body").addClass("fp-viewing-"+a)}function Ha(){var a=document.createElement("p"),b,c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(a,null);for(var g in c)void 0!==a.style[g]&&(a.style[g]="translate3d(1px,1px,1px)",b=window.getComputedStyle(a).getPropertyValue(c[g]));
document.body.removeChild(a);return void 0!==b&&0<b.length&&"none"!==b}function Ia(){if(G||T){var a=ua();b(document).off("touchstart "+a.down).on("touchstart "+a.down,Aa);b(document).off("touchmove "+a.move).on("touchmove "+a.move,za)}}function Ja(){if(G||T){var a=ua();b(document).off("touchstart "+a.down);b(document).off("touchmove "+a.move)}}function ua(){return window.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function ca(a){var b=[];b.y="undefined"!==
typeof a.pageY&&(a.pageY||a.pageX)?a.pageY:a.touches[0].pageY;b.x="undefined"!==typeof a.pageX&&(a.pageY||a.pageX)?a.pageX:a.touches[0].pageX;return b}function N(a){b.fn.fullpage.setScrollingSpeed(0,"internal");z(a.closest(".fp-slides"),a);b.fn.fullpage.setScrollingSpeed(R.scrollingSpeed,"internal")}function m(a){c.scrollBar?f.scrollTop(a):c.css3?ga("translate3d(0px, -"+a+"px, 0px)",!1):f.css("top",-a)}function la(a){return{"-webkit-transform":a,"-moz-transform":a,"-ms-transform":a,transform:a}}function Ka(){m(0);
b("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove();b(".fp-section").css({height:"","background-color":"",padding:""});b(".fp-slide").css({width:""});f.css({height:"",position:"","-ms-touch-action":"","touch-action":""});b(".fp-section, .fp-slide").each(function(){pa(b(this));b(this).removeClass("fp-table active")});S(f);S(f.find(".fp-easing"));f.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function(){b(this).replaceWith(this.childNodes)});b("html, body").scrollTop(0)}function U(a,
b,e){c[a]=b;"internal"!==e&&(R[a]=b)}function I(a,b){console&&console[a]&&console[a]("fullPage: "+b)}c=b.extend({menu:!1,anchors:[],navigation:!1,navigationPosition:"right",navigationColor:"#000",navigationTooltips:[],slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:null,scrollOverflow:!1,touchSensitivity:5,normalScrollElementTouchThreshold:5,
keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,resize:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,sectionSelector:".section",slideSelector:".slide",afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null},c);(function(){c.continuousVertical&&(c.loopTop||c.loopBottom)&&(c.continuousVertical=!1,I("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
c.continuousVertical&&c.scrollBar&&(c.continuousVertical=!1,I("warn","Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));b.each(c.anchors,function(a,c){(b("#"+c).length||b('[name="'+c+'"]').length)&&I("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")})})();b.extend(b.easing,{easeInOutCubic:function(a,b,c,g,f){return 1>(b/=f/2)?g/2*b*b*b+c:g/2*((b-=2)*b*b+2)+c}});b.extend(b.easing,{easeInQuart:function(a,
b,c,g,f){return g*(b/=f)*b*b*b+c}});b.fn.fullpage.setAutoScrolling=function(a,d){U("autoScrolling",a,d);var e=b(".fp-section.active");c.autoScrolling&&!c.scrollBar?(b("html, body").css({overflow:"hidden",height:"100%"}),b.fn.fullpage.setRecordHistory(c.recordHistory,"internal"),f.css({"-ms-touch-action":"none","touch-action":"none"}),e.length&&m(e.position().top)):(b("html, body").css({overflow:"visible",height:"initial"}),b.fn.fullpage.setRecordHistory(!1,"internal"),f.css({"-ms-touch-action":"",
"touch-action":""}),m(0),b("html, body").scrollTop(e.position().top))};b.fn.fullpage.setRecordHistory=function(a,b){U("recordHistory",a,b)};b.fn.fullpage.setScrollingSpeed=function(a,b){U("scrollingSpeed",a,b)};b.fn.fullpage.setMouseWheelScrolling=function(a){a?document.addEventListener?(document.addEventListener("mousewheel",r,!1),document.addEventListener("wheel",r,!1)):document.attachEvent("onmousewheel",r):document.addEventListener?(document.removeEventListener("mousewheel",r,!1),document.removeEventListener("wheel",
r,!1)):document.detachEvent("onmousewheel",r)};b.fn.fullpage.setAllowScrolling=function(a,c){"undefined"!=typeof c?(c=c.replace(" ","").split(","),b.each(c,function(c,d){switch(d){case "up":l.up=a;break;case "down":l.down=a;break;case "left":l.left=a;break;case "right":l.right=a;break;case "all":b.fn.fullpage.setAllowScrolling(a)}})):a?(b.fn.fullpage.setMouseWheelScrolling(!0),Ia()):(b.fn.fullpage.setMouseWheelScrolling(!1),Ja())};b.fn.fullpage.setKeyboardScrolling=function(a){c.keyboardScrolling=
a};b.fn.fullpage.moveSectionUp=function(){var a=b(".fp-section.active").prev(".fp-section");a.length||!c.loopTop&&!c.continuousVertical||(a=b(".fp-section").last());a.length&&q(a,null,!0)};b.fn.fullpage.moveSectionDown=function(){var a=b(".fp-section.active").next(".fp-section");a.length||!c.loopBottom&&!c.continuousVertical||(a=b(".fp-section").first());a.length&&q(a,null,!1)};b.fn.fullpage.moveTo=function(a,c){var e="",e=isNaN(a)?b('[data-anchor="'+a+'"]'):b(".fp-section").eq(a-1);"undefined"!==
typeof c?P(a,c):0<e.length&&q(e)};b.fn.fullpage.moveSlideRight=function(){ea("next")};b.fn.fullpage.moveSlideLeft=function(){ea("prev")};b.fn.fullpage.reBuild=function(a){if(!f.hasClass("fp-destroyed")){v=!0;var d=b(window).width();k=b(window).height();c.resize&&Fa(k,d);b(".fp-section").each(function(){var a=b(this).find(".fp-slides"),d=b(this).find(".fp-slide");c.verticalCentered&&b(this).find(".fp-tableCell").css("height",ra(b(this))+"px");b(this).css("height",k+"px");c.scrollOverflow&&(d.length?
d.each(function(){A(b(this))}):A(b(this)));d.length&&z(a,a.find(".fp-slide.active"))});d=b(".fp-section.active");d.index(".fp-section")&&q(d);v=!1;b.isFunction(c.afterResize)&&a&&c.afterResize.call(f);b.isFunction(c.afterReBuild)&&!a&&c.afterReBuild.call(f)}};var w=!1,G=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),T="ontouchstart"in window||0<navigator.msMaxTouchPoints||navigator.maxTouchPoints,f=b(this),k=
b(window).height(),v=!1,p,O,n=!0,y=[],h,ia="fullpage-wrapper",l={up:!0,down:!0,left:!0,right:!0},R=b.extend(!0,{},c);b.fn.fullpage.setAllowScrolling(!0);c.css3&&(c.css3=Ha());b(this).length?(f.css({height:"100%",position:"relative"}),f.addClass(ia)):I("error","Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();");b(c.sectionSelector).each(function(){b(this).addClass("fp-section")});b(c.slideSelector).each(function(){b(this).addClass("fp-slide")});
c.navigation&&xa();b(".fp-section").each(function(a){var d=b(this),e=b(this).find(".fp-slide"),g=e.length;a||0!==b(".fp-section.active").length||b(this).addClass("active");b(this).css("height",k+"px");(c.paddingTop||c.paddingBottom)&&b(this).css("padding",c.paddingTop+" 0 "+c.paddingBottom+" 0");"undefined"!==typeof c.sectionsColor[a]&&b(this).css("background-color",c.sectionsColor[a]);"undefined"!==typeof c.anchors[a]&&b(this).attr("data-anchor",c.anchors[a]);if(1<g){a=100*g;var f=100/g;e.wrapAll('<div class="fp-slidesContainer" />');
e.parent().wrap('<div class="fp-slides" />');b(this).find(".fp-slidesContainer").css("width",a+"%");c.controlArrows&&wa(b(this));c.slidesNavigation&&Ga(b(this),g);e.each(function(a){b(this).css("width",f+"%");c.verticalCentered&&qa(b(this))});d=d.find(".fp-slide.active");d.length?N(d):e.eq(0).addClass("active")}else c.verticalCentered&&qa(b(this))}).promise().done(function(){b.fn.fullpage.setAutoScrolling(c.autoScrolling,"internal");var a=b(".fp-section.active").find(".fp-slide.active");a.length&&
(0!==b(".fp-section.active").index(".fp-section")||0===b(".fp-section.active").index(".fp-section")&&0!==a.index())&&N(a);c.fixedElements&&c.css3&&b(c.fixedElements).appendTo("body");c.navigation&&(h.css("margin-top","-"+h.height()/2+"px"),h.find("li").eq(b(".fp-section.active").index(".fp-section")).find("a").addClass("active"));c.menu&&c.css3&&b(c.menu).closest(".fullpage-wrapper").length&&b(c.menu).appendTo("body");c.scrollOverflow?("complete"===document.readyState&&V(),b(window).on("load",V)):
b.isFunction(c.afterRender)&&c.afterRender.call(f);na();a=window.location.hash.replace("#","").split("/")[0];if(a.length){var d=b('[data-anchor="'+a+'"]');!c.animateAnchor&&d.length&&(c.autoScrolling?m(d.position().top):(m(0),H(a),b("html, body").scrollTop(d.position().top)),L(a,null),b.isFunction(c.afterLoad)&&c.afterLoad.call(d,a,d.index(".fp-section")+1),d.addClass("active").siblings().removeClass("active"))}b(window).on("load",function(){var a=window.location.hash.replace("#","").split("/"),b=
a[0],a=a[1];b&&P(b,a)})});var X,Y,J=!1;b(window).on("scroll",W);var x=0,E=0,u=0,D=0;b(window).on("hashchange",ja);b(window).keydown(function(a){clearTimeout(va);va=setTimeout(function(){var d=a.shiftKey,e=b(document.activeElement);if(!e.is("textarea")&&!e.is("input")&&!e.is("select")&&c.keyboardScrolling&&c.autoScrolling)switch(40!=a.which&&38!=a.which&&32!=a.which||a.preventDefault(),a.which){case 38:case 33:b.fn.fullpage.moveSectionUp();break;case 32:if(d){b.fn.fullpage.moveSectionUp();break}case 40:case 34:b.fn.fullpage.moveSectionDown();
break;case 36:b.fn.fullpage.moveTo(1);break;case 35:b.fn.fullpage.moveTo(b(".fp-section").length);break;case 37:b.fn.fullpage.moveSlideLeft();break;case 39:b.fn.fullpage.moveSlideRight()}},150)});var va;f.mousedown(function(a){2==a.which&&(F=a.pageY,f.on("mousemove",Ea))});f.mouseup(function(a){2==a.which&&f.off("mousemove")});var F=0;b(document).on("click touchstart","#fp-nav a",function(a){a.preventDefault();a=b(this).parent().index();q(b(".fp-section").eq(a))});b(document).on("click touchstart",
".fp-slidesNav a",function(a){a.preventDefault();a=b(this).closest(".fp-section").find(".fp-slides");var c=a.find(".fp-slide").eq(b(this).closest("li").index());z(a,c)});c.normalScrollElements&&(b(document).on("mouseenter",c.normalScrollElements,function(){b.fn.fullpage.setMouseWheelScrolling(!1)}),b(document).on("mouseleave",c.normalScrollElements,function(){b.fn.fullpage.setMouseWheelScrolling(!0)}));b(".fp-section").on("click touchstart",".fp-controlArrow",function(){b(this).hasClass("fp-prev")?
b.fn.fullpage.moveSlideLeft():b.fn.fullpage.moveSlideRight()});b(window).resize(ma);var Q=k,oa;b.fn.fullpage.destroy=function(a){b.fn.fullpage.setAutoScrolling(!1,"internal");b.fn.fullpage.setAllowScrolling(!1);b.fn.fullpage.setKeyboardScrolling(!1);f.addClass("fp-destroyed");b(window).off("scroll",W).off("hashchange",ja).off("resize",ma);b(document).off("click","#fp-nav a").off("mouseenter","#fp-nav li").off("mouseleave","#fp-nav li").off("click",".fp-slidesNav a").off("mouseover",c.normalScrollElements).off("mouseout",
c.normalScrollElements);b(".fp-section").off("click",".fp-controlArrow");a&&Ka()}}})(jQuery);

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype,r=this,o=r.EventEmitter;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return r.EventEmitter=o,e},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){function t(t){var n=e.event;return n.target=n.target||n.srcElement||t,n}var n=document.documentElement,i=function(){};n.addEventListener?i=function(e,t,n){e.addEventListener(t,n,!1)}:n.attachEvent&&(i=function(e,n,i){e[n+i]=i.handleEvent?function(){var n=t(e);i.handleEvent.call(i,n)}:function(){var n=t(e);i.call(e,n)},e.attachEvent("on"+n,e[n+i])});var r=function(){};n.removeEventListener?r=function(e,t,n){e.removeEventListener(t,n,!1)}:n.detachEvent&&(r=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var o={bind:i,unbind:r};"function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o}(this),function(e,t){"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){return t(e,n,i)}):"object"==typeof exports?module.exports=t(e,require("wolfy87-eventemitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie)}(window,function(e,t,n){function i(e,t){for(var n in t)e[n]=t[n];return e}function r(e){return"[object Array]"===d.call(e)}function o(e){var t=[];if(r(e))t=e;else if("number"==typeof e.length)for(var n=0,i=e.length;i>n;n++)t.push(e[n]);else t.push(e);return t}function s(e,t,n){if(!(this instanceof s))return new s(e,t);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=o(e),this.options=i({},this.options),"function"==typeof t?n=t:i(this.options,t),n&&this.on("always",n),this.getImages(),a&&(this.jqDeferred=new a.Deferred);var r=this;setTimeout(function(){r.check()})}function f(e){this.img=e}function c(e){this.src=e,v[e]=this}var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;s.prototype=new t,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);var i=n.nodeType;if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"),o=0,s=r.length;s>o;o++){var f=r[o];this.addImage(f)}}},s.prototype.addImage=function(e){var t=new f(e);this.images.push(t)},s.prototype.check=function(){function e(e,r){return t.options.debug&&h&&u.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},s.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e)})},s.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},a&&(a.fn.imagesLoaded=function(e,t){var n=new s(this,e,t);return n.jqDeferred.promise(a(this))}),f.prototype=new t,f.prototype.check=function(){var e=v[this.img.src]||new c(this.img.src);if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this;e.on("confirm",function(e,n){return t.confirm(e.isLoaded,n),!0}),e.check()},f.prototype.confirm=function(e,t){this.isLoaded=e,this.emit("confirm",this,t)};var v={};return c.prototype=new t,c.prototype.check=function(){if(!this.isChecked){var e=new Image;n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0}},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(e){this.confirm(!0,"onload"),this.unbindProxyEvents(e)},c.prototype.onerror=function(e){this.confirm(!1,"onerror"),this.unbindProxyEvents(e)},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.unbindProxyEvents=function(e){n.unbind(e.target,"load",this),n.unbind(e.target,"error",this)},s});
