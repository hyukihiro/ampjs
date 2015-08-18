/// AMPjs Javascript Library
/// The MIT License (MIT)
/// author Yoshihito Fujiwara
/// source https://bitbucket.org/yoshihitofujiwara/ampjs
/// Copyright (c) 2014 Yoshihito Fujiwara

(function(root, AMP){

  // 'use strict';


  /*======================================================================
    文字列
  ======================================================================*/

  /**
   * <h4>文字列</h4>
   *
   * @class AMP.String
   */



  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>id生成します</h4>
   * <p>文字列にナンバーを追加して返します</p>
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String}
   */
  AMP.createId = (function(){
    var _count = 0;

    return function(str){
      str = str ? str : 'cid';
      return str + (_count += 1);
    };
  }());


  /**
   * <h4>ランダムな4桁のコードを返す</h4>
   *
   * @static
   * @method digit
   * @return {String}
   */
  AMP.digit = function(){
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  /**
   * <h4>json形式オブジェクトを文字列にして返す</h4>
   * FIXME: βver.
   *
   * @static
   * @method jsonToString
   * @param  {Object} obj オブジェクト
   * @return {String}
   */
  AMP.jsonToString = function(obj){
    var cache = [];
    return JSON.stringify(obj, function(key, value){
      if(typeof value === 'object' && value !== null){
        if(cache.indexOf(value) !== -1){
          return;
        }
        cache.push(value);
      }
      return value;
    }, '\t');
  };


  /**
   * <h4>空白文字の削除</h4>
   *
   * @static
   * @method removeSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  AMP.removeSpace = function(str){
    return str.replace(/\s+/g, '');
  };


  /**
   * <h4>文字列の全置換</h4>
   * <p>対象の文字列と、削除文字列がマッチしたものを全置換します</p>
   *
   * @static
   * @method repraceAll
   * @param  {String} str 置換対象の文字列
   * @param  {String} del 削除する文字列
   * @param  {String} add 追加する文字列
   * @return {String}
   */
  AMP.repraceAll = function(str, del, add){
    add = add ? add : '';
    return str.split(del).join(add);
  };


  /**
   * <h4>UUIDの生成して返す</h4>
   *
   * @static
   * @method uuid
   * @return {String}
   */
  AMP.uuid = function(){
    var d = AMP.digit;
    return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
  };


  /**
   * <h4>xmlを文字列に変換して返す</h4>
   *
   * @static
   * @method xmlToString
   * @param  {XML Node} xmlNodeデータ
   * @return {String}
   */
  AMP.xmlToString = function(xml){
    if(AMP.hasXMLSerializer()){
      return (new XMLSerializer()).serializeToString(xml);
    } else {
      try {
        return xmlNode.xml;
      } catch(error){
        if(AMP.isDeveplop){
          console.log(error);
        }
      }
    }
  };


}(window, AMP));
