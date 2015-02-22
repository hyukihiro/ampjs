(function(root){

  // 'use strict';

  var Storage, storage, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>ストレージ管理</h4>
   * Storageショートハンド
   *
   * @class amp.Storage
   * @constructor
   * @method storage
   * @param  {String} storageType ストレージタイプ 'sessionStorage', 'localStorage' 初期:'sessionStorage'
   * @return {Storage}
   */
  Storage = function(storageType){
    if(amp.hasStorage()){
      if(storageType === 'localStorage'){
        this.type     = 'localStorage';
        this._storage = localStorage;

      } else {
        this.type     = 'sessionStorage';
        this._storage = sessionStorage;
      }
    }
  };



  /*--------------------------------------------------------------------------
    @shorthand
  --------------------------------------------------------------------------*/

  /**
   * <h4>ストレージ管理</h4>
   * Storageショートハンド
   *
   * @static
   * @method storage
   * @param  {String} storageType ストレージタイプ 'sessionStorage', 'localStorage' 初期:'sessionStorage'
   * @return {Storage}
   */
  storage = function(storageType){
    return new Storage(storageType);
  };



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>バージョン情報</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  Storage.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   *
   * @property p
   * @type {Object}
   */
  p = Storage.prototype;


  /**
   * <h4>ストレージタイプ</h4>
   *
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


  /**
   * <h4>クラス名を返す</h4>
   *
   * @method toString
   * @return {String} クラス名を返す
   */
  p.toString = function(){
    return '[object Storage]';
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Storage = Storage;
  root.amp.storage = storage;


}(window));
