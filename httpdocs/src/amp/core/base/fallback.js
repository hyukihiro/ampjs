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


(function (root) {
    // 'use strict';
    /*======================================================================
      ブラウザ対応していない機能をフォールバックします
    ======================================================================*/
    /*----------------------------------------------------------------------
      @method
    ----------------------------------------------------------------------*/
    /**
     * forEach
     * 配列の各要素に対して、指定された処理を実行します
     * Array.forEach未実装のブラウザに、フォールバックして処理を追加しています
     *
     * @static
     * @method Array.forEach
     * @type {Void}
     */
    Array.prototype.forEach = Array.prototype.forEach || function (callback, context) {
        if (this === null) {
            throw new TypeError('this is null or not defined');
        }
        var i = 0, l = this.length;
        for (; i < l; i += 1) {
            callback.call(context || null, this[i], i, this);
        }
    };
    /**
     * 連想配列の要素数取得
     * Object.keys未実装のブラウザに、フォールバックして処理を追加しています
     *
     * @method Object.keys
     * @param  {Object} obj
     * @return {Void}
     */
    Object.keys = Object.keys || function (obj) {
        if (AMP.isObject(obj)) {
            var size = 0, prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop) && prop !== 'length') {
                    size += 1;
                }
            }
            obj.length = size;
        }
    };
}(window));
