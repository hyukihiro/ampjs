(function(root, createjs){

  // 'use strict';

  var Layer, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Layeringを管理します</h4>
   *
   * @class amp.Layer
   * @constructor
   * @return {Layer}
   */
  Layer = function(container){
    this.setLayerContainer(container);
  };



  /*--------------------------------------------------------------------------
    @property
  --------------------------------------------------------------------------*/

  /**
   * <h4>引数に渡られた型をチェック</h4>
   *
   * @method _isType
   * @param  {Object}  container オブジェクト(Container or Stageのインスタンス)
   * @return {Boolean}
   */
  Layer._isType = function(container){
    var isType = false,
    type;

    if(container){
      // 型チェック
      if(container.toString){
        type = container.toString();
        isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
      }

      if(!isType){
        new TypeError('Please select Stage or Container');
      }
    }

    return isType;
  };

  // prototype
  p = Layer.prototype;


  p.container = null;




  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/

  /**
   * <h4>引数に渡られた型をチェック</h4>
   *
   * @private
   * @static
   * @method _isType
   * @param  {Object}  container オブジェクト(Container or Stageのインスタンス)
   * @return {Boolean}
   */
  Layer._isType = function(container){
    var isType = false,
    type;

    if(container){
      // 型チェック
      if(container.toString){
        type = container.toString();
        isType = type.indexOf('[Container ') > -1 || type.indexOf('[Stage ') > -1;
      }

      if(!isType){
        new TypeError('Please select Stage or Container');
      }
    }

    return isType;
  };


  /**
   * [setContainer description]
   * @param {[type]} container [description]
   */
  p.setContainer = function(container){
    if(Layer._isType(container)){
      this.container = container;
    }
  };


  /**
   * [getLayer description]
   * @param  {[type]} selecter [description]
   * @return {[type]}          [description]
   */
  p.getLayer = function(selecter){
  };


  /**
   * [getindex description]
   * @return {[type]} [description]
   */
  p.getindex = function(){
  };


  /**
   * [getLength description]
   * @return {[type]} [description]
   */
  p.getLength = function(){
    return this.container.getNumChildren();
  };


  /**
   * [setLayer description]
   * @param {String} selecter id or name
   * @param {Number} index    インデックス番号
   * @return {Layer}
   */
  p.setLayer = function(selecter, index){
  };





  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.amp = root.amp || {};
  root.amp.Layer = Layer;


}(window, createjs));
