/**
 * AMP.JS JavaScript Library
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


(function (root) {
    //'use strict';
    /*======================================================================
     AMP基本設定
    ======================================================================*/
    // クラス基本設定
    var CLASS_NAME = 'Amp', VERSION = '3.0';
    /*--------------------------------------------------------------------------
     config
    --------------------------------------------------------------------------*/
    // consoleがなければ空の関数を返す
    if (!('console' in root)) {
        root.console = {
            log: function () {
            }
        };
    }
    /*--------------------------------------------------------------------------
     @constructor
    --------------------------------------------------------------------------*/
    /**
     * Amp
     *
     * @class Amp
     * @constructor
     **/
    function Amp(className) {
        if (typeof className === 'string') {
            this._name = className;
        }
    }
    /*----------------------------------------------------------------------
     @property
    ----------------------------------------------------------------------*/
    /**
     * バージョン情報
     *
     * @static
     * @property VERSION
     * @type {String}
     */
    Amp.VERSION = VERSION;
    /**
     * コンストラクタ名
     *
     * @private
     * @property name
     * @type {String}
     */
    Amp.prototype._name = CLASS_NAME;
    /*----------------------------------------------------------------------
     @method
    ----------------------------------------------------------------------*/
    /**
     * クラス名を返す
     *
     * @method toString
     * @return {String} クラス名を返す
     */
    Amp.prototype.toString = function () {
        return '[object ' + this._name + ']';
    };
    /*----------------------------------------------------------------------
     export
    ----------------------------------------------------------------------*/
    /**
     * AMP
     *
     * @module AMP
     **/
    root.AMP = new Amp(CLASS_NAME);
    root.AMP.Amp = Amp;
}(window));
