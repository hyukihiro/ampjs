(function(root, amp){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ストレージ管理</h4>
   *
   * @class Storage
   * @constructor
   * @param {Boolean} isLocalStorage ローカルストレージを使用するか？
   */
  function Storage(isLocalStorage){
    if(amp.hasStorage()){
      if(isLocalStorage){
        this.type     = 'localStorage';
        this._storage = localStorage;

      } else {
        this.type     = 'sessionStorage';
        this._storage = sessionStorage;
      }
    }
  }

  // prototype
  var p = Storage.prototype;



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>ストレージタイプ</h4>
   *
   * @default 'sessionStorage'
   * @property type
   * @type {String}
   */
  p.type = 'sessionStorage';


  /**
   * <h4>ストレージを保管</h4>
   *
   * @private
   * @property _storage
   * @type {Object}
   */
  p._storage = null;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>値のセット</h4>
   *
   * @method setItem
   * @param {String | Object} key セットするキー オブジェクトを渡すと、一括で値をセットします
   * @param {Any} val セットする値
   * @return {Storage}
   */
  p.setItem = function(key, val){
    if(this._storage){

      if(amp.isObject(key)){
        var k;
        for(k in key){
          this._storage.setItem(k, key[k]);
        }
      } else {
        this._storage.setItem(key, val);
      }
    }

    return this;
  };


  /**
   * <h4>アイテム、ストレージデータの削除</h4>
   *
   * @method removeItem
   * @param  {String} key 削除するキー 省略時、ストレージデータを削除します ※可変長引数可
   * @return {Storage}
   */
  p.removeItem = function(key){
    if(this._storage){
      if(key === undefined){
        this._storage.clear();
      } else {
        var i = 0, l = arguments.length;
        for(; i < l; i += 1){
          this._storage.removeItem(arguments[i]);
        }
      }
    }

    return this;
  };


  /**
   * <h4>レングスを返す</h4>
   *
   * @method getLength
   * @return {Number}
   */
  p.getLength = function(){
    return this._storage && this._storage.length;
  };


  /**
   * <h4>アイテムの取得</h4>
   *
   * @method getItem
   * @param  {String} key 取得するキー 省略時は、ストレージオブジェクトを返す
   * @return {Any}
   */
  p.getItem = function(key){
    if(this._storage){
      if(key === undefined){
        return this._storage.length ? this._storage : undefined;
      } else {
        return this._storage.getItem(key);
      }
    }
  };


  /**
   * <h4>アイテムがあるか判定</h4>
   *
   * @method hasItem
   * @param  {String}  key 判定するキー
   * @return {Boolean}
   */
  p.hasItem = function(key){
    if(this._storage){
      return this._storage.getItem(key) !== null;
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  amp.exportClass(Storage, '2.0');


}(window, amp || {}));