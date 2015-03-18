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
      基本ユーティリティ
    ======================================================================*/
    /**
     * 関数名を返す
     *
     * @method getFunctionName
     * @param  {Function} fn 名前を取得したい関数
     * @return {String}
     */
    AMP.getFunctionName = function (fn) {
        if ('name' in fn) {
            return fn.name;
        }
        else {
            return ('' + fn).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
        }
    };
    /**
     * ミックスイン
     *
     * @method mixin
     * @param {Boolean} isDeep ディープコピーするか 初期値: false 省略可
     * @param {Object} arguments 拡張するオブジェクト
     * @return {Object} 拡張したオブジェクトを返します
     */
    AMP.mixin = function (isDeep) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var baseObj, obj, copy, clone, data, key, isArray;
        isDeep = AMP.isBoolean(isDeep) && isDeep;
        baseObj = args[0];
        var i = 1, l = args.length;
        for (; i < l; i += 1) {
            obj = args[i];
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    data = baseObj[key];
                    copy = obj[key];
                    // マージデータが同じなら次のループへ
                    if (baseObj === copy) {
                        continue;
                    }
                    isArray = AMP.isArray(copy);
                    if (isDeep && copy && AMP.isObject(copy) || isArray) {
                        if (isArray) {
                            clone = data && AMP.isArray(data) ? data : [];
                        }
                        else {
                            clone = data && AMP.isObject(data) ? data : {};
                        }
                        // ネスト構造を再帰処理
                        baseObj[key] = AMP.mixin(isDeep, clone, copy);
                    }
                    else if (!AMP.isUndefined(copy)) {
                        baseObj[key] = copy;
                    }
                }
            }
        }
        return baseObj;
    };
    /**
     * 画面のピクセル比を返す
     *
     * @static
     * @method pixelRatio
     * @return {Number}
     */
    AMP.pixelRatio = function () {
        return window.devicePixelRatio || 1;
    };
    /**
     * 画像のプリロード
     *
     * @static
     * @method preload
     * @param {String} src 画像パス
     * @return {Image} 生成した、イメージオブジェクト
     */
    AMP.preload = function (src) {
        var img = new Image();
        img.src = src;
        return img;
    };
    /**
     * requestAnimationFrameをエクスポートしています
     * 対応していないブラウザは、setTimeoutでフォールバックします
     *
     * @method requestAnimationFrame
     * @param {Function} callback コールバック関数
     * @return {Number}
     */
    AMP.requestAnimationFrame = (function () {
        var requestAnimation = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        });
        // contextの処理追加予定
        return function (callback) {
            return requestAnimation(callback);
        };
    }());
    /**
     * cancelAnimationFrameをエクスポートしています
     * 対応していないブラウザは、clearTimeoutでフォールバックします
     *
     * @method cancelAnimationFrame
     * @param {Number} id タイマーNumber
     * @return {Number}
     */
    AMP.cancelAnimationFrame = (function () {
        var cancelAnimation = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
            window.clearTimeout(id);
        });
        return function (id) {
            return cancelAnimation(id);
        };
    }());
    /**
     * 現在の時間を返します
     * performance.nowメソッドをExportしています
     * performanceに対応していないブラウザはgetTimeを返します
     *
     * @static
     * @method now
     * @return {Number}
     */
    AMP.now = (function () {
        var p = window.performance, pNow = p && (p.now || p.mozNow || p.msNow || p.oNow || p.webkitNow);
        return function () {
            return (pNow && pNow.call(p)) || (new Date().getTime());
        };
    }());
})(AMP || (AMP = {}));
