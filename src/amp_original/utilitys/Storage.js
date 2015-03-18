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
    var Storage = (function () {
        /**
         * ストレージ管理
         *
         * @class Storage
         * @constructor
         * @param {Boolean} isLocalStorage ローカルストレージを使用するか？
         */
        function Storage(isLocalStorage) {
            if (isLocalStorage === void 0) { isLocalStorage = false; }
            /*--------------------------------------------------------------------------
              @property
            --------------------------------------------------------------------------*/
            /**
             * ストレージタイプ
             *
             * @default 'sessionStorage'
             * @property type
             * @type {String}
             */
            this.type = 'sessionStorage';
            /**
             * ストレージを保管
             *
             * @private
             * @property _storage
             * @type {Object}
             */
            this._storage = null;
            if (AMP.hasStorage()) {
                if (isLocalStorage) {
                    this.type = 'localStorage';
                    this._storage = localStorage;
                }
                else {
                    this.type = 'sessionStorage';
                    this._storage = sessionStorage;
                }
            }
        }
        /*--------------------------------------------------------------------------
          @method
        --------------------------------------------------------------------------*/
        /**
         * 値のセット
         *
         * @method setItem
         * @param {String | Object} key セットするキー オブジェクトを渡すと、一括で値をセットします
         * @param {Any} val セットする値
         * @return {Storage}
         */
        Storage.prototype.setItem = function (key, val) {
            var self = this;
            if (self._storage) {
                if (AMP.isObject(key)) {
                    AMP.each(key, function (item, index) {
                        self._storage.setItem(index, item);
                    });
                }
                else {
                    self._storage.setItem(key, val);
                }
            }
            return self;
        };
        /**
         * アイテム、ストレージデータの削除
         *
         * @method removeItem
         * @param  {String} key 削除するキー 省略時、ストレージデータを削除します ※可変長引数可
         * @return {Storage}
         */
        Storage.prototype.removeItem = function (key) {
            // removeItem (...key: string[]) {
            if (this._storage) {
                if (AMP.isUndefined(key)) {
                    this._storage.clear();
                }
                else {
                    AMP.each(key, function (item) {
                        this._storage.removeItem(item);
                    });
                }
            }
            return this;
        };
        /**
         * 長さをを返す
         *
         * @method getLength
         * @return {Number}
         */
        Storage.prototype.getLength = function () {
            return this._storage && this._storage.length;
        };
        /**
         * アイテムの取得
         *
         * @method getItem
         * @param  {String} key 取得するキー 省略時は、ストレージオブジェクトを返す
         * @return {Any}
         */
        Storage.prototype.getItem = function (key) {
            if (this._storage) {
                if (AMP.isUndefined(key)) {
                    if (this._storage.length) {
                        return this._storage;
                    }
                }
                else {
                    return this._storage.getItem(key);
                }
            }
        };
        /**
         * アイテムがあるか判定
         *
         * @method hasItem
         * @param  {String}  key 判定するキー
         * @return {Boolean}
         */
        Storage.prototype.hasItem = function (key) {
            if (this._storage) {
                return this._storage.getItem(key) !== null;
            }
            return false;
        };
        return Storage;
    })();
    AMP.Storage = Storage;
})(AMP || (AMP = {}));
