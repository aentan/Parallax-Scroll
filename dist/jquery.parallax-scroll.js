/*
 *  Parallax-Scroll - v0.2.0
 *  jQuery plugin for background-attachment: scroll with friction, similar to the parallax scrolling effect on Spotify.
 *  http://parallax-scroll.aenism.com
 *
 *  Made by Aen Tan
 *  Under MIT License
 */
;(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals
        factory(root.jQuery);
    }
}(this, function ($) {
    "use strict";

    var ParallaxScroll,
        defaults = {
          friction: 0.5
        },
        $win = $(window),
        lastTickTime = 0;
    
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 5 - (currTime - lastTickTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTickTime = currTime + timeToCall;
      return id;
    };

    ParallaxScroll = function (background, options) {
      return {
        init: function () {
          this.$background = $(background);
          this.settings = $.extend({}, defaults, options);
          this._initStyles();
          this._bindEvents();
        },
        _initStyles: function () {
          this.$background.css({
            "background-attachment": "scroll"
          });
        },
        _visibleInViewport: function () {
          var vpHeight  = $win.height();
          var rec = this.$background.get(0).getBoundingClientRect();
          return (rec.top < vpHeight && rec.bottom > 0) || (rec.bottom <= vpHeight && rec.top > vpHeight);
      	},
        _bindEvents: function () {
          var self = this;
          $win.on("load scroll resize", function () {
            self._requestTick();
          });
        },
        _requestTick: function () {
          var self = this;
          if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(function () {
              self._updateBgPos();
            });
          }
        },
        _updateBgPos: function () {
          if (this._visibleInViewport()) {
            var winW = $win.width();
            var winH = $win.height();
            var imgW = this.$background.data("width");
            var imgH = this.$background.data("height");
            var imgA = imgW / imgH;
            var bgW = this.$background.width();
            var bgH = this.$background.height();
            var bgA = bgW / bgH;
            var revA = bgA < imgA;
            var bgScale = bgW / imgW;
            var bgScaledH = imgH * bgScale;
            var bgOffsetTop = this.$background.offset().top;
            var winScrollTop = $win.scrollTop();
            var bgScrollTop = winScrollTop - bgOffsetTop;
            var distToMove = winH + bgScaledH;
            var xf1 = bgScrollTop * (winH / distToMove);
            var xf2 = bgScrollTop / winH;
            var centerOffsetY = (winH - bgH) / 2;
            centerOffsetY = revA ? centerOffsetY * xf2 : centerOffsetY;
            var bgFriction = revA? this.settings.friction * (bgA * 2) : this.settings.friction * bgA;
            var bgSize = revA ? "auto " + winH + "px" : winW + "px auto";
            var bgPos = (xf1 * bgFriction) - centerOffsetY;
            this.$background.css({
              "background-size": bgSize,
              "background-position": "50% " + bgPos + "px"
            });
          }
          this.ticking = false;
        }
      };
    };

    ParallaxScroll.defaults = defaults;
    $.fn.parallaxScroll = function (options) {
      return this.each(function () {
        new ParallaxScroll(this, options).init();
      });
    };

    return ParallaxScroll;
}));