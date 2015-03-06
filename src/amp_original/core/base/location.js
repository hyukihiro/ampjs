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
      locationオブジェクトを扱います
    ======================================================================*/
    // params
    var url = window.location;
    /**
     * hashの取得し、#を省いた文字列を配列に格納して返す
     *
     * @static
     * @method getHash
     * @return {Array}
     */
    AMP.getHash = function () {
        if (url.hash.length) {
            return url.hash.split('#').slice(1);
        }
    };
    /**
     * リクエストパラメータの値を連想配列として取得
     *
     * @static
     * @method queryHashMap
     * @return {Object}
     */
    AMP.queryHashMap = function () {
        var map, array = [], param = url.search.slice(1).split('&');
        if (param[0] !== '') {
            var i = 0, l = param.length;
            map = {};
            for (; i < l; i += 1) {
                array = param[i].split('=');
                map[array[0]] = array[1] ? decodeURI(array[1]) : decodeURI(array[0]);
            }
        }
        return map;
    };
})(AMP || (AMP = {}));
