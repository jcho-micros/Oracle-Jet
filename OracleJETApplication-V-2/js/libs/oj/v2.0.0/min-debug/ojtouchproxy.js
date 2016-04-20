/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 jQuery UI Touch Punch 0.2.3

 Copyright 2011-2014, Dave Furfero
 Dual licensed under the MIT or GPL Version 2 licenses.
*/
define(["ojs/ojcore", "jquery"], function($oj$$76$$, $$$$70$$) {
  $oj$$76$$.$_TouchProxy$ = function $$oj$$76$$$$_TouchProxy$$($elem$$164$$) {
    this._init($elem$$164$$);
  };
  $oj$$76$$.$_TouchProxy$.prototype._init = function $$oj$$76$$$$_TouchProxy$$$_init$($elem$$165$$) {
    this.$_elem$ = $elem$$165$$;
    this.$_touchMoved$ = this.$_touchHandled$ = !1;
    this.$_touchStartHandler$ = $$$$70$$.proxy(this.$_touchStart$, this);
    this.$_touchEndHandler$ = $$$$70$$.proxy(this.$_touchEnd$, this);
    this.$_touchMoveHandler$ = $$$$70$$.proxy(this.$_touchMove$, this);
    this.$_elem$.on({touchstart:this.$_touchStartHandler$, touchend:this.$_touchEndHandler$, touchmove:this.$_touchMoveHandler$, touchcancel:this.$_touchEndHandler$});
  };
  $oj$$76$$.$_TouchProxy$.prototype._destroy = function $$oj$$76$$$$_TouchProxy$$$_destroy$() {
    this.$_elem$ && this.$_touchStartHandler$ && (this.$_elem$.off({touchstart:this.$_touchStartHandler$, touchmove:this.$_touchMoveHandler$, touchend:this.$_touchEndHandler$, touchcancel:this.$_touchEndHandler$}), this.$_touchMoveHandler$ = this.$_touchEndHandler$ = this.$_touchStartHandler$ = void 0);
  };
  $oj$$76$$.$_TouchProxy$.prototype.$_touchHandler$ = function $$oj$$76$$$$_TouchProxy$$$$_touchHandler$$($event$$654$$, $simulatedType$$) {
    if (!(1 < $event$$654$$.originalEvent.touches.length)) {
      "touchstart" != $event$$654$$.type && "touchend" != $event$$654$$.type && $event$$654$$.preventDefault();
      var $touch$$ = $event$$654$$.originalEvent.changedTouches[0], $simulatedEvent$$ = document.createEvent("MouseEvent");
      $simulatedEvent$$.initMouseEvent($simulatedType$$, !0, !0, window, 1, $touch$$.screenX, $touch$$.screenY, $touch$$.clientX, $touch$$.clientY, !1, !1, !1, !1, 0, null);
      $touch$$.target.dispatchEvent($simulatedEvent$$);
    }
  };
  $oj$$76$$.$_TouchProxy$.prototype.$_touchStart$ = function $$oj$$76$$$$_TouchProxy$$$$_touchStart$$($event$$655$$) {
    this.$_touchHandled$ || (this.$_touchHandled$ = !0, this.$_touchMoved$ = !1, this.$_touchHandler$($event$$655$$, "mouseover"), this.$_touchHandler$($event$$655$$, "mousemove"), this.$_touchHandler$($event$$655$$, "mousedown"));
  };
  $oj$$76$$.$_TouchProxy$.prototype.$_touchMove$ = function $$oj$$76$$$$_TouchProxy$$$$_touchMove$$($event$$656$$) {
    this.$_touchHandled$ && (this.$_touchMoved$ = !0, this.$_touchHandler$($event$$656$$, "mousemove"));
  };
  $oj$$76$$.$_TouchProxy$.prototype.$_touchEnd$ = function $$oj$$76$$$$_TouchProxy$$$$_touchEnd$$($event$$657$$) {
    this.$_touchHandled$ && (this.$_touchHandler$($event$$657$$, "mouseup"), this.$_touchHandler$($event$$657$$, "mouseout"), this.$_touchMoved$ || "touchend" != $event$$657$$.type || this.$_touchHandler$($event$$657$$, "click"), this.$_touchHandled$ = !1);
  };
  $oj$$76$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$ = "_ojTouchProxy";
  $oj$$76$$.$_TouchProxy$.$addTouchListeners$ = function $$oj$$76$$$$_TouchProxy$$$addTouchListeners$$($elem$$166_jelem$$9$$) {
    $elem$$166_jelem$$9$$ = $$$$70$$($elem$$166_jelem$$9$$);
    var $proxy$$ = $elem$$166_jelem$$9$$.data($oj$$76$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$);
    $proxy$$ || ($proxy$$ = new $oj$$76$$.$_TouchProxy$($elem$$166_jelem$$9$$), $elem$$166_jelem$$9$$.data($oj$$76$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$, $proxy$$));
    return $proxy$$;
  };
  $oj$$76$$.$_TouchProxy$.$removeTouchListeners$ = function $$oj$$76$$$$_TouchProxy$$$removeTouchListeners$$($elem$$167_jelem$$10$$) {
    $elem$$167_jelem$$10$$ = $$$$70$$($elem$$167_jelem$$10$$);
    var $proxy$$1$$ = $elem$$167_jelem$$10$$.data($oj$$76$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$);
    $proxy$$1$$ && ($proxy$$1$$._destroy(), $elem$$167_jelem$$10$$.removeData($oj$$76$$.$_TouchProxy$.$_TOUCH_PROXY_KEY$));
  };
});
