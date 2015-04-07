var AMP = AMP || {};

(function(root){

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
    if(isLocalStorage){
      this.type     = 'localStorage';
      this._storage = localStorage;

    } else {
      this.type     = 'sessionStorage';
      this._storage = sessionStorage;
    }
  }

  // 基底クラスを継承
  AMP.inherits(Storage, AMP._AMP);

  // prototype
  var p = Storage.prototype;



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
  Storage.VERSION = '2.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @private
   * @property name
   * @type {String}
   */
  p.className = 'Storage';


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
    var self = this;

    if(self._storage){
      if(AMP.isObject(key)){
        AMP.each(key, function(item, index){
          self._storage.setItem(index, item);
        });
      } else {
        self._storage.setItem(key, val);
      }
    }

    return self;
  };


  /**
   * <h4>アイテム、ストレージデータの削除</h4>
   *
   * @method removeItem
   * @param  {String} key 削除するキー 省略時、ストレージデータを削除します ※可変長引数可
   * @return {Storage}
   */
  p.removeItem = function(key){
    var self = this;

    if(this._storage){
      if(AMP.isUndefined(key)){
        this._storage.clear();

      } else {
        AMP.each(AMP.argToAarguments, function(item){
          self._storage.removeItem(item);
        });
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
      if(AMP.isUndefined(key)){
        if(this._storage.length){
          return this._storage;
        }
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



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Storage = Storage;


}(window));
