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


var AMP;
(function (AMP) {
    /*======================================================================
      配列処理
    ======================================================================*/
    /**
     * each処理を行います
     *
     * @method each
     * @param  {Object}   obj      イテレーションを行うオブジェクト
     * @param  {Function} callback イテレーション毎のコールバック関数
     * @return {Object} 第一引数に渡されたオブジェクト
     */
    AMP.each = function (obj, callback /*: void */) {
        var isContinue, i;
        if (AMP.isArray(obj)) {
            var l = obj.length;
            i = 0;
            for (; i < l; i += 1) {
                isContinue = callback.call(obj[i], obj[i], i);
                if (isContinue === false) {
                    break;
                }
            }
        }
        else {
            for (i in obj) {
                isContinue = callback.call(obj[i], obj[i], i);
                if (isContinue === false) {
                    break;
                }
            }
        }
        return obj;
    };
})(AMP || (AMP = {}));
