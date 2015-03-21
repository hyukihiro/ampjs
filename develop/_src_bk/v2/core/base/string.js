(function (root, AMP) {

  // 'use strict';


  /*======================================================================
    文字列を扱います
  ======================================================================*/


  /*----------------------------------------------------------------------
    @method
  ----------------------------------------------------------------------*/

  /**
   * id生成(文字列にナンバーを追加)して返します
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String}
   */
  AMP.createId = (function () {
    var count = 0;

    return function (str) {
      str = str ? str : 'cid';
      return str + (count += 1);
    };
  }());


  /**
   * ランダムな4桁のコードを返す
   *
   * @static
   * @method digit
   * @return {String}
   */
  AMP.digit = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  /**
   * 空白文字を削除して返す
   *
   * @method replaceSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  AMP.replaceSpace = function (str) {
    return str.replace(/\s+/g, '');
  };


  /**
   * UUIDの生成して返す
   *
   * @static
   * @method uuid
   * @return {String}
   */
  AMP.uuid = function () {
    var d = AMP.digit;
    return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
  };


  /**
   * xmlを文字列に変換して返す
   *
   * @static
   * @method xmlToString
   * @param  {XML Node} xmlNodeデータ
   * @return {String}
   */
  AMP.xmlToString = function (xml) {
    if (AMP.hasXMLSerializer()) {
      return (new XMLSerializer()).serializeToString(xml);
    } else {
      try {
        return xmlNode.xml;
      } catch (error) {
        if (AMP.isDeveplop) {
          console.log(error);
        }
      }
    }
  };


}(window, AMP || {}));
