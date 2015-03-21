module AMP {

  /*======================================================================
    文字列を扱います
  ======================================================================*/


  /**
   * id生成(文字列にナンバーを追加)して返します
   *
   * @static
   * @method createId
   * @param {String} str id名 初期値: 'cid' 省略可
   * @return {String}
   */
  export var createId = (function () {
    var count = 0;
    return function (str: string): string {
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
  export var digit = function (): string {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };


  /**
   * 空白文字を削除して返す
   *
   * @method replaceSpace
   * @param  {String} str 対象の文字列
   * @return {String}
   */
  export var replaceSpace = function (str: string): string {
    return str.replace(/\s+/g, '');
  };


  /**
   * UUIDの生成して返す
   *
   * @static
   * @method uuid
   * @return {String}
   */
  export var uuid = function (): string {
    var d = (<any>AMP).digit;
    return (d() + d() + '-' + d() + '-' + d() + '-' + d() + '-' + d() + d() + d());
  };
}
