/**
 * Usage:
 *
 * animate(document.querySelector('#animatedElement'), {
 *     styles: {
 *         height: {
 *             start : 100
 *             end   : 300,
 *             units : 'px'
 *         }
 *     },
 *     easing: 'easeOutBack',
 *     duration: 600,
 *     callback: function () { console.log('Animation stopped') }
 * })
 */

var animate = (function (globals) {
    'use strict';

    var requestFrame = globals.requestAnimationFrame ||
        globals.mozRequestAnimationFrame ||
        globals.webkitRequestAnimationFrame ||
        globals.msRequestAnimationFrame ||
        (function (delay) {
            return function (callback) {
                setTimeout(function () {
                    callback((new Date).getTime());
                }, delay);
            };
        }(1000 / 60));

    /* Formulae by Robert Penner, http://robertpenner.com/easing/ */
    var easings = {
        easeInQuad: function (t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    };

    function setStyle(el, prop, value, units) {
        if (prop in el.style) {
            el.style[prop] = value + (units || 'px');
        } else if (prop in el) {
			// e.g. el.scrollTop
            el[prop] = value;
        }
    }

    function animate(el, params) {
        var ease = easings[params.easing],
            startDate = (new Date).getTime(),
            state = {};

        var frame = function (date) {
            var progress = date - startDate;

            var next = progress < params.duration &&
                (!('condition' in params) || params.condition(state));

            var prop, style, value;
            for (prop in params.styles) {
                if (params.styles.hasOwnProperty(prop)) {
                    style = params.styles[prop];
                    if (next) {
                        value = ease(
                            progress,
                            style.start,
                            style.end - style.start,
                            params.duration
                        );
                    } else {
                        value = style.end;
                    }
                    value = ~~value;
                    state[prop] = value;
                    setStyle(el, prop, value, style.units);
                }
            }

            if (next) {
                requestFrame(frame);
            } else {
                params.callback && params.callback();
            }
        };

        /* Launch animation. */
        frame(startDate);
    }

    return animate;
}(window));
