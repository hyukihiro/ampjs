/**
 * AMP JavaScript Library
 *
 * Author: Yoshihito Fujiwara
 * Source: https://bitbucket.org/cutupworks/ampjs
 *
 * @licence MIT Licence
 *
 * Copyright (c) 2015 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AMP;
(function (AMP) {
    var Ease = (function (_super) {
        __extends(Ease, _super);
        /**
         * Easeingを管理します
         *
         * @class Ease
         * @constructor
         */
        function Ease() {
            _super.call(this);
            /**
             * CSS3 easeing用ネームスペース
             *
             * @property css
             * @type {Object}
             */
            this.css = {
                /* 1 Sine
                -----------------------------------------------------------------*/
                /**
                 * @property css._1_SINE_IN
                 * @type {String}
                 */
                _1_SINE_IN: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
                /**
                 * @property css._1_SINE_IN
                 * @type {String}
                 */
                _1_SINE_OUT: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
                /**
                 * @property css._1_SINE_IN_OUT
                 * @type {String}
                 */
                _1_SINE_IN_OUT: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                /* 2 Quad
                -----------------------------------------------------------------*/
                /**
                 * @property css._2_QUAD_IN
                 * @type {String}
                 */
                _2_QUAD_IN: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
                /**
                 * @property css._2_QUAD_OUT
                 * @type {String}
                 */
                _2_QUAD_OUT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                /**
                 * @property css._2_QUAD_IN_OUT
                 * @type {String}
                 */
                _2_QUAD_IN_OUT: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
                /* 3 Cubic
                -----------------------------------------------------------------*/
                /**
                 * @property css._3_CUBIC_IN
                 * @type {String}
                 */
                _3_CUBIC_IN: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                /**
                 * @property css._3_CUBIC_OUT
                 * @type {String}
                 */
                _3_CUBIC_OUT: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
                /**
                 * @property css._3_CUBIC_IN_OUT
                 * @type {String}
                 */
                _3_CUBIC_IN_OUT: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
                /* 4 Quart
                -----------------------------------------------------------------*/
                /**
                 * @property css._4_QUART_IN
                 * @type {String}
                 */
                _4_QUART_IN: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
                /**
                 * @property css._4_QUART_OUT
                 * @type {String}
                 */
                _4_QUART_OUT: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                /**
                 * @property css._4_QUART_IN_OUT
                 * @type {String}
                 */
                _4_QUART_IN_OUT: 'cubic-bezier(0.77, 0, 0.175, 1)',
                /* 5 Quint
                -----------------------------------------------------------------*/
                /**
                 * @property css._5_QUINT_IN
                 * @type {String}
                 */
                _5_QUINT_IN: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
                /**
                 * @property css._5_QUINT_OUT
                 * @type {String}
                 */
                _5_QUINT_OUT: 'cubic-bezier(0.23, 1, 0.32, 1)',
                /**
                 * @property css._5_QUINT_IN_OUT
                 * @type {String}
                 */
                _5_QUINT_IN_OUT: 'cubic-bezier(0.86, 0, 0.07, 1)',
                /* 6 Expo
                -----------------------------------------------------------------*/
                /**
                 * @property css._6_EXPO_IN
                 * @type {String}
                 */
                _6_EXPO_IN: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                /**
                 * @property css._6_EXPO_OUT
                 * @type {String}
                 */
                _6_EXPO_OUT: 'cubic-bezier(0.19, 1, 0.22, 1)',
                /**
                 * @property css._6_EXPO_IN_OUT
                 * @type {String}
                 */
                _6_EXPO_IN_OUT: 'cubic-bezier(1, 0, 0, 1)',
                /* 7 Cric
                -----------------------------------------------------------------*/
                /**
                 * @property css._7_CIRC_IN
                 * @type {String}
                 */
                _7_CIRC_IN: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
                /**
                 * @property css._7_CIRC_OUT
                 * @type {String}
                 */
                _7_CIRC_OUT: 'cubic-bezier(0.075, 0.82, 0.165, 1);',
                /**
                 * @property css._7_CIRC_IN_OUT
                 * @type {String}
                 */
                _7_CIRC_IN_OUT: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
                /* 7 Back
                -----------------------------------------------------------------*/
                /**
                 * @property css._BACK_IN
                 * @type {String}
                 */
                _BACK_IN: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
                /**
                 * @property css._BACK_OUT
                 * @type {String}
                 */
                _BACK_OUT: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                /**
                 * @property css._BACK_IN_OUT
                 * @type {String}
                 */
                _BACK_IN_OUT: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                /* Elastic
                -----------------------------------------------------------------*/
                /**
                 * @property css._ELASTIC_IN
                 * @type {String}
                 */
                _ELASTIC_IN: null,
                /**
                 * @property css._ELASTIC_OUT
                 * @type {String}
                 */
                _ELASTIC_OUT: null,
                /**
                 * @property css._ELASTIC_IN_OUT
                 * @type {String}
                 */
                _ELASTIC_IN_OUT: null,
                /* Bounce
                -----------------------------------------------------------------*/
                /**
                 * @property css._BOUNCE_IN
                 * @type {String}
                 */
                _BOUNCE_IN: null,
                /**
                 * @property css._BOUNCE_OUT
                 * @type {String}
                 */
                _BOUNCE_OUT: null,
                /**
                 * @property css._BOUNCE_IN_OUT
                 * @type {String}
                 */
                _BOUNCE_IN_OUT: null
            };
        }
        return Ease;
    })(AMP.Amp);
    AMP.Ease = Ease;
    /**
     * Easeingを管理します
     *
     * @module ease
     */
    AMP.ease = new Ease();
})(AMP || (AMP = {}));
