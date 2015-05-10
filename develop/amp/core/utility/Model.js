var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>モデル管理</h4>
   *
   * @class AMP.Modal
   * @extends AMP.Events
   * @constructor
   * @param {Object} props プロパティ
   */
  function Modal(props){

    /**
     * <h4>プロパティ</h4>
     *
     * @private
     * @property _props
     * @type {Object}
     */
    this._props = AMP.mixin({}, props);
  }

  // AMP.Eventsクラスを継承
  AMP.inherits(Modal, AMP.Events);

  // prototype
  var p = Modal.prototype;



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
  Modal.VERSION = '1.0.0';


  /**
   * <h4>クラス名</h4>
   *
   * @property className
   * @type {String}
   */
  p.className = 'Modal';


  /**
   * <h4>モデルのプロパティが変更時、に発行されるイベントタイプ</h4>
   *
   * @static
   * @property eventType
   * @default change
   * @type {String}
   */
  Modal.eventType = 'change';



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>プロパティの取得</h4>
   *
   * @method　get
   * @param  {String} key 取得したいキー
   * @return {Any}
   */
  p.get = function(key){
    if(AMP.isUndefined(this._props[key])){
      return this._props;
    } else {
      return this._props[key];
    }
  };


  /**
   * [set description]
   */
  p.set = function(key, val, isSilent){
    var isCahnge = false;

    if(AMP.isObject(key)){
      isSilent = val;
      isCahnge = true;
      AMP.mixin(true, this._props, key);

    } else if(this._props[key] !== val){
      isCahnge = true;
      this._props[key] = val;
    }

    if(isCahnge){
      this._controller(isSilent);
    }

    return this;
  };


  /**
   *　<h4>プロパティクリア</h4>
   *
   * @method clear
   * @return {Model}
   */
  p.clear = function(isSilent){
    if(!AMP.isPlainObject(this._props)){
      this._controller(isSilent);
      this._props = {};
    }
    return this;
  };


  /**
   *　<h4>値があるか判定します</h4>
   * undefined, Nullは、falseを返します
   *
   * @method has
   * @return {Boolean}
   */
  p.has = function(key){
    return (!AMP.isUndefined(this._props[key]) && !AMP.isNull(this._props[key]));
  };


  /**
   * <h4>プロパティーのeach処理</h4>
   *
   * @method each
   * @param  {Function} callback each毎に処理する関数
   * @return {Model}
   */
  p.each = function(callback){
    AMP.each(this._props, callback);
    return this;
  };


  /**
   * <h4>イベントコントローラー</h4>
   *
   * @private
   * @method _controller
   * @return {Void}
   */
  p._controller = function(isSilent){
    if(!isSilent){
      this.trigger(Modal.eventType);
    }
  };



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  AMP.Modal = Modal;


}(window));
