module AMP {

  export class Storage {


    /**
     * ストレージ管理
     *
     * @class Storage
     * @constructor
     * @param {Boolean} isLocalStorage ローカルストレージを使用するか？
     */
    constructor (isLocalStorage: boolean = false) {
      if((<any>AMP).hasStorage()){
        if(isLocalStorage){
          this.type     = 'localStorage';
          this._storage = localStorage;

        } else {
          this.type     = 'sessionStorage';
          this._storage = sessionStorage;
        }
      }
    }


    /*--------------------------------------------------------------------------
      @property
    --------------------------------------------------------------------------*/

    /**
     * ストレージタイプ
     *
     * @default 'sessionStorage'
     * @property type
     * @type {String}
     */
    type: string = 'sessionStorage';


    /**
     * ストレージを保管
     *
     * @private
     * @property _storage
     * @type {Object}
     */
    private _storage: any = null;



    /*--------------------------------------------------------------------------
      @method
    --------------------------------------------------------------------------*/

    /**
     * 値のセット
     *
     * @method setItem
     * @param {String | Object} key セットするキー オブジェクトを渡すと、一括で値をセットします
     * @param {Any} val セットする値
     * @return {Storage}
     */
    setItem (key: any, val?: any) {
      var self = this;

      if(self._storage){
        if((<any>AMP).isObject(key)){
          (<any>AMP).each(key, function(item, index){
            self._storage.setItem(index, item);
          });
        } else {
          self._storage.setItem(key, val);
        }
      }

      return self;
    }


    /**
     * アイテム、ストレージデータの削除
     *
     * @method removeItem
     * @param  {String} key 削除するキー 省略時、ストレージデータを削除します ※可変長引数可
     * @return {Storage}
     */
    removeItem (key?: string) {
    // removeItem (...key: string[]) {
      if(this._storage){
        if((<any>AMP).isUndefined(key)){
          this._storage.clear();

        } else {
          (<any>AMP).each(key, function(item){
            this._storage.removeItem(item);
          });
        }
      }

      return this;
    }


    /**
     * 長さをを返す
     *
     * @method getLength
     * @return {Number}
     */
    getLength (): number {
      return this._storage && this._storage.length;
    }


    /**
     * アイテムの取得
     *
     * @method getItem
     * @param  {String} key 取得するキー 省略時は、ストレージオブジェクトを返す
     * @return {Any}
     */
    getItem (key: string): any {
      if(this._storage){
        if((<any>AMP).isUndefined(key)){
          if(this._storage.length){
            return this._storage;
          }
        } else {
          return this._storage.getItem(key);
        }
      }
    }


    /**
     * アイテムがあるか判定
     *
     * @method hasItem
     * @param  {String}  key 判定するキー
     * @return {Boolean}
     */
    hasItem (key: string): boolean {
      if(this._storage){
        return this._storage.getItem(key) !== null;
      }
      return false;
    }
  }
}
