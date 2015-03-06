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


var AMP;
(function (AMP) {
    /*======================================================================
      文字列を扱います
    ======================================================================*/
    /**
     * id生成(文字列にナンバーを追加)して返します
     *
     * @static
     * @method createId
     * @param {String} str id名 初期値: 'cid' 省略可
     * @return {String}
     */
    AMP.createId = (function () {
        var count = 0;
        return function (str) {
            str = str ? str : 'cid';
            return str + (count += 1);
        };
    }());
    /**
     * ランダムな4桁のコードを返す
     *
     * @static
     * @method digit
     * @return {String}
     */
    AMP.digit = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    /**
     * 空白文字を削除して返す
     *
     * @method replaceSpace
     * @param  {String} str 対象の文字列
     * @return {String}
     */
    AMP.replaceSpace = function (str) {
        return str.replace(/\s+/g, '');
    };
    /**
     * UUIDの生成して返す
     *
     * @static
     * @method uuid
     * @return {String}
     */
    AMP.uuid = function () {
        var d = AMP.digit;
        return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
    };
})(AMP || (AMP = {}));
