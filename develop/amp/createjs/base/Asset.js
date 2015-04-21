(function(root, createjs){

  // 'use strict';

  var Asset, p;



  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * <h4>Layeringを管理します</h4>
   *
   * @class XXX_Layer
   * @constructor
   * @return {Layer}
   */
  Asset = function(container){
    if(Asset.isDisplayObjectInherit(container)){
      this.container = container;
      // underscoreで一時的に対応
      // _.extend(this, container);
    } else {
      throw new TypeError(container + ' is not a Container');
    }
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
  Asset.VERSION = '1.0';


  /**
   * <h4>プロトタイプオブジェクト</h4>
   * Mediatorをエクスポートします
   * Mediatorクラスを参照してください
   *
   * @property p
   * @type {Object}
   */
  p = Asset.prototype;



  /*--------------------------------------------------------------------------
    @method
  --------------------------------------------------------------------------*/



  /**
   * <h4>指定したnemeプロパティを持つオブジェクトを検索して配列で返します</h4>
   *
   * @static
   * @public
   * @method findName
   * @param  {String} name 検索nemeプロパティ値
   * @param  {Stage|Container} children Stage,Container子要素
   * @return {Array}
   */
  p.findName = Asset.findName = function(name, children){
    children = children || this.container.children;
    name = name.replace(/^\./, '');

    var elms = [],
    i = 0,
    l = children.length;

    for(; i < l; i += 1){
      if(children[i].name === name){
        elms.push(children[i]);
      }
      if(children[i].children){
        var result = Asset.findName(name, children[i].children);
        if(result[0]){
          // 配列連結
          Array.prototype.push.apply(elms, result);
        }
      }
    }

    return elms;
  };


  /**
   * <h4>指定id名のオブジェクトを返す</h4>
   *
   * @static
   * @public
   * @method findId
   * @param  {String} id 検索id名
   * @param  {Stage|Container} children Stage,Container子要素
   * @return {Object}
   */
  p.findId = Asset.findId = function(id, children){
    children = children || this.container.children;
    id = id.replace(/^#/, '');

    var elm,
    i = 0,
    l = children.length;

    for(; i < l; i += 1){
      if(children[i].id === id){
        elm = children[i];
      } else if(children[i].children){
        elm = Asset.findId(id, children[i].children);
      }

      if(elm){
        break;
      }
    }

    return elm;
  };


  /**
   * <h4>指定したタイプオブジェクトを検索して配列で返します</h4>
   *
   * findObject description]
   * @param  {String} type     検索オブジェクトタイプ名
   * @param  {Stage|Container} children Stage,Container子要素
   * @return {Array}
   */
  p.findObject = Asset.findObject = function(type, children){
    children = children || this.container.children;

    var elms = [],
    i = 0,
    l = children.length;

    for(; i < l; i += 1){
      if(Asset.isType(type, children[i])){
        elms.push(children[i]);
      }
      if(children[i].children){
        var result = Asset.findObject(type, children[i].children);
        if(result[0]){
          // 配列連結
          Array.prototype.push.apply(elms, result);
        }
      }
    }

    return elms;
  };


  /**
   * <h4>オブジェクトが指定した型かチェックします</h4>
   *
   * @static
   * @public
   * @method isType
   * @param  {String}  type タイプ名
   * @param  {Object}  object  判定する対象オブジェクト
   * @return {Boolean}
   */
  Asset.isType = function(type, object){
    return object.toString().toLowerCase().indexOf('[' + type + ' ') === 0;
  };


  /**
   * <h4>DisplayObjectを継承しているかチェックします</h4>
   *
   * @static
   * @method isDisplayInherit
   * @param  {Object}  instance 評価するインスタンスオブジェクト
   * @return {Boolean}
   */
  Asset.isDisplayObjectInherit = function(instance){
    var isInherit = false,
    type;

    if(instance && amp.isFunction(instance.toString)){
      type = instance.toString();
      if(type.indexOf('[Bitmap ') === 0 ||
        type.indexOf('[Container ') === 0 ||
        type.indexOf('[DisplayObject ') === 0 ||
        type.indexOf('[MovieClip ') === 0 ||
        type.indexOf('[Rectangle ') === 0 ||
        type.indexOf('[Shape ') === 0 ||
        type.indexOf('[Sprite ') === 0 ||
        type.indexOf('[Stage ') === 0 ||
        type.indexOf('[Text ') === 0){
        isInherit = true;
      }
    }

    return isInherit;
  };


  p.size = function(){
    var bounds = this.container.getBounds();

    if(!bounds){

    }
    console.log(this.container);
    return;
    return {
      width: bounds.width,
      height: bounds.height
    };
  };


  /**
   * <h4>each処理</h4>
   *
   * @method each
   * @param  {Function} callback 繰り返し毎に関数が呼び出されます
   * @return {Array}
   */
  p.each = function(callback){
    var i = 0,
    l = this.container.children.length,
    value;

    for(; i < l; i += 1){
      value = callback.call( this.container.children[i], i, this.container.children[i]);
      if(value === false){
        break;
      }
    }

    return this.container.children;
  };




/*--------------------------------------------------------------------------
  未定
--------------------------------------------------------------------------*/

/*
  // select
  p.eq = function(){};
  // p.find = function(){};
  p.first = function(){};
  p.last = function(){};


  // prop
  p.prop = function(){};
  p.hasProp = function(){};

  p.offset = function(){}; // local or global
  p.size = function(){};

  // util
  p.each = function(){};







  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  // root.amp = root.amp || {};
  // root.amp.createjs = root.amp.createjs || {};
  // root.amp.createjs.Asset = Asset;


}(window, createjs));
