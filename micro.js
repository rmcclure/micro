/**
 * µ.js version 1.0
 * Copyright ©2015 Ross McClure
 * Released under MIT license.
 * http://undefined.net/micro
 */
 
/*global μ:true,µ:true*/
/*jshint expr:true,strict:false*/
/*! µ.js v1.0 ©2015 undefined.net/micro */
!function (document, List, proto, matches) {

    proto = document.documentElement;
    matches = (proto.matches || proto.webkitMatchesSelector ||
            proto.msMatchesSelector || proto.mozMatchesSelector ||
            proto.oMatchesSelector);

    μ = µ = function (value, context) {
        if ('function' === typeof value) {
            if (/c/.test(document.readyState)) {
                return value();
            }
            return document.addEventListener('DOMContentLoaded', value, false);
        }
        return new List(('string' === typeof value) ?
            (context || document).querySelectorAll(value) :
            (value.addEventListener) ? arguments : value);
    };

    proto = µ.prototype = List.prototype = Object.create(Array.prototype);

    proto.on = function (eventName, handler, match) {
        if ('string' === typeof match) {
            return this.on(eventName, function (e) {
                if (matches.call(e.target, match)) {
                    handler.call(e.target, e);
                }
            });
        }
        this.forEach(function (node) {
            node.addEventListener(eventName, handler, false);
        });
        return handler;
    };

    proto.off = function (eventName, handler) {
        this.forEach(function (node) {
            node.removeEventListener(eventName, handler, false);
        });
    };

    µ.match = matches.call;

}(document, function (nodeList) { this.push.apply(this, nodeList); });
