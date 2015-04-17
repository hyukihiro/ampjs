var AMP = AMP || {};

(function(root){

  // 'use strict';


  /*======================================================================
    文字列
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * <h4>id生成</h4>
   * 文字列にナンバーを追加して返します
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String}
   */
  AMP.createId = (function(){
    var count = 0;

    return function(str){
      str = str ? str : 'cid';
      return str + (count += 1);
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
   * <h4>空白文字を削除して返す</h4>
   *
   * @method replaceSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  AMP.replaceSpace = function(str){
    return str.replace(/\s+/g, '');
  };


  /**
   * <h4>文字列の全置換</h4>
   *
   * @repraceAll
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



}(window));
