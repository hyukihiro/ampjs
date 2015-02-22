(function(root, amp){

  // 'use strict';


  /*======================================================================
    文字列を扱います
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
  amp.createId = (function(){
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
  amp.digit = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  /**
   * <h4>空白文字を削除して返す</h4>
   *
   * @method replaceSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  amp.replaceSpace = function(str){
    return str.replace(/\s+/g, '');
  };


  /**
   * <h4>UUIDの生成して返す</h4>
   *
   * @static
   * @method uuid
   * @return {String}
   */
  amp.uuid = function(){
    var d = amp.digit;
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
  amp.xmlToString = function(xml){
    if(amp.hasXMLSerializer()){
      return (new XMLSerializer()).serializeToString(xml);
    } else {
      try {
        return xmlNode.xml;
      } catch(error){
        if(amp.isDeveplop){
          console.log(error);
        }
      }
    }
  };



}(window, amp || {}));