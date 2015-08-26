/*
 * Twn.js v0.9 beta
 *
 * Copyright (c) 2015 Yuichiroh Arai
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 */
/**
 * @module			Twn
 * @namespace		Twn
 */
var Twn;
(function (Twn) {
    var Command = (function () {
        /**
         * すべてのコマンドの基底クラスです。
         *
         * **直接使うことはありません。**
         *
         * @class			Command
         * @constructor
         */
        function Command() {
            var _this = this;
            // コマンドの実行が完了したらこれを呼び出してもらうようにする
            this._onComplete = function () {
                if (_this._callback)
                    _this._callback();
            };
        }
        // SPEEDを変更する静的メソッド
        Command.SET_SPEED = function (speed) {
            Command.SPEED = speed;
        };
        // ----------------------------------------------------------------------------------------------------
        // キャッシュ操作
        //
        /* 時期バージョン用
                // Twn.js が要素に格納しているキャッシュのルートオブジェクトを取得
                public static getCache(element:any):Object {
                    return (element.__twn || (element.__twn = {}));
                }
                // Twn.js が要素に格納しているキャッシュのルートオブジェクトを破棄
                public static clearCache(element:any):void {
                    delete element.__twn;
                }
        */
        // ----------------------------------------------------------------------------------------------------
        // コマンドメソッド
        //
        /**
         * コマンドのインスタンスを破棄します。
         * コマンドは直ちに停止され、再び開始はできなくなります。
         *
         * @method		destroy
         *
         * @return		{Command}		メソッドチェーン用のインスタンス
         */
        Command.prototype.destroy = function () {
            this.stop();
            delete this._callback;
            return this;
        };
        /**
         * コマンドを開始します。
         *
         * @method		play
         *
         * @return		{Command}		メソッドチェーン用のインスタンス
         */
        Command.prototype.play = function () {
            return this;
        };
        /**
         * コマンドを停止します。
         * 再び、最初から開始することもできます。
         *
         * @method		stop
         *
         * @return		{Command}		メソッドチェーン用のインスタンス
         */
        Command.prototype.stop = function () {
            return this;
        };
        /**
         * コマンドの開始を遅延させます。
         *
         * @method		delay
         *
         * @param		{number}		delay			遅延時間。デフォルトはミリ秒ではなく秒です。
         *
         * @return		{Command}			メソッドチェーン用のインスタンス
         */
        Command.prototype.delay = function (delay) {
            if (delay > 0) {
                return new Twn.List([
                    new Twn.Wait(delay),
                    this
                ], false);
            }
            else {
                return this;
            }
        };
        /**
         * 時間指定の値です。値が 1000 の場合は 秒単位、1の場合はミリ秒単位になります。
         *
         * @property	TIME_UNIT
         * @static
         * @type		number
         * @default	1000
         */
        Command.TIME_UNIT = 1000;
        /**
         * 時間指定の値を割る値です。値を増やすと速度が早くなり、減らすと速度が遅くなります。
         *
         * @property	SPEED
         * @static
         * @type		number
         * @default	1
         */
        Command.SPEED = 1;
        return Command;
    })();
    Twn.Command = Command;
    // ----------------------------------------------------------------------------------------------------
    // ショートカット
    //
    /**
     * @class		xxx
     * @namespace	- Twn
     */
    /**
     * 条件分岐によってコマンドを切り替えます。
     *
     * @example
     * ```
     * Twn.ifValue($("#box"),
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: 100 }),
     *     Twn.jq.wait(0.4)
     * ).play();
     * ```
     * @method		ifValue
     *
     * @param 		{Boolean}		condition				条件
     * @param		{Command}		trueCommand				条件がtrueの場合のコマンド
     * @param		{Command}		[falseCommand=null]		条件がfalseの場合のコマンド
     * @returns 	{Command}		条件分岐で選択されたコマンド
     */
    function ifValue(condition, trueCommand, falseCommand) {
        if (falseCommand === void 0) { falseCommand = null; }
        if (!(trueCommand instanceof Command))
            trueCommand = new Twn.Void();
        if (!(falseCommand instanceof Command))
            falseCommand = new Twn.Void();
        return (condition) ? trueCommand : falseCommand;
    }
    Twn.ifValue = ifValue;
})(Twn || (Twn = {}));
/// <reference path="../../dts/jquery.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="./Command.ts" />
/**
 * @module			Twn
 * @namespace		Twn
 */
var Twn;
(function (Twn) {
    var List = (function (_super) {
        __extends(List, _super);
        /**
         * 各コマンドを直列 / 並列で実行させるコマンドのクラスです。
         *
         * **コンストラクタを直接使うことはありません。**
         *
         * * **Twn.serial()**
         * * **Twn.parallel()**
         *
         * **を使ってください。**
         *
         * @class 				List
         * @extends			Command
         * @constructor
         *
         * @param	{Array}			commandList			コマンドが格納された配列
         * @param	{Boolean}		isParallel		並列かどうか。 true なら並列、 false なら直列
         */
        function List(commandList, isParallel) {
            var _this = this;
            _super.call(this);
            // コマンドの実行が完了したらこれを呼び出してもらうようにする
            this._onComplete = function () {
                var command;
                ++_this._count;
                if (!_this._isParallel) {
                    if (_this._count < _this._length) {
                        command = _this._list[_this._count];
                        command.play();
                    }
                    else {
                        if (_this._callback)
                            _this._callback();
                    }
                }
                else {
                    if (_this._count >= _this._length) {
                        if (_this._callback)
                            _this._callback();
                    }
                }
            };
            var i, len, command;
            len = (!commandList || commandList.length < 1) ? 0 : commandList.length;
            this._list = [];
            for (i = 0; i < len; i++) {
                command = commandList[i];
                if (command instanceof Twn.Command) {
                    command._callback = this._onComplete;
                    this._list.push(command);
                }
            }
            this._isParallel = isParallel;
            // コマンドが無ければ Void コマンドを生成
            if (this._list.length == 0) {
                command = new Twn.Void();
                command._callback = this._onComplete;
                this._list.push(command);
            }
            this._length = this._list.length;
        }
        /**
         * コマンドのインスタンスを破棄します。
         * コマンドは直ちに停止され、再び開始はできなくなります。
         *
         * @method		destroy
         *
         * @return		{List}		メソッドチェーン用のインスタンス
         */
        List.prototype.destroy = function () {
            var i;
            _super.prototype.destroy.call(this);
            for (i = 0; i < this._length; i++) {
                this._list[i].destroy();
            }
            delete this._list;
            delete this._isParallel;
            delete this._length;
            delete this._count;
            return this;
        };
        /**
         * コマンドを開始します。
         *
         * @example
         * ```
         * Twn.serial(
         *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: -100 }),
         *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: -100 }),
         *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: 100 }),
         *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: 100 })
         * ).play();
         * ```
         *
         * @method		play
         *
         * @return		{List}		メソッドチェーン用のインスタンス
         */
        List.prototype.play = function () {
            //super.play();
            var i, command;
            if (this._length == 0)
                return this;
            this._count = 0;
            for (i = 0; i < this._length; i++) {
                command = this._list[i];
                // 直列
                if (!this._isParallel) {
                    if (i == this._count) {
                        command.play();
                        break;
                    }
                }
                else {
                    command.play();
                }
            }
            return this;
        };
        /**
         * コマンドを停止します。
         * 再び、最初から開始することもできます。
         *
         *
         * @example
         * ```
         * var serial = Twn.Serial(
         * 		...
         * ).play();
         * ...
         * serial.stop();
         * ...
         * serial.play();
         * ```
         *
         * @method		stop
         *
         * @return		{List}		メソッドチェーン用のインスタンス
         */
        List.prototype.stop = function () {
            //super.stop();
            var i, command;
            if (this._length == 0)
                return this;
            for (i = 0; i < this._length; i++) {
                command = this._list[i];
                command.stop();
            }
            return this;
        };
        return List;
    })(Twn.Command);
    Twn.List = List;
    // ----------------------------------------------------------------------------------------------------
    // ショートカット
    //
    /**
     * @class		xxx
     * @namespace	- Twn
     */
    /**
     * **引数に渡したコマンドを直列で順番にするコマンド**を生成します。
     *
     * 1つのコマンドが完了するまで次のコマンドは開始されません。<br>
     * 最後のコマンドが完了すると、このコマンド自体の次のコマンドが実行されます。
     *
     * @example
     * ```
     * Twn.serial(
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: -100 }),
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: -100 }),
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: 100 }),
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: 100 })
     * ).play();
     * ```
     *
     * @method		serial
     *
     * @param		{Array}		...commandList		可変長引数で渡すコマンドの配列
     *
     * @return		{List}		メソッドチェーン用のインスタンス
     */
    function serial() {
        var commandList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            commandList[_i - 0] = arguments[_i];
        }
        return new List(commandList, false);
    }
    Twn.serial = serial;
    /**
     * **引数に渡したコマンドを並列で同時に実行するコマンド**を生成します。
     *
     * 全てのコマンドが完了すると、このコマンド自体の次のコマンドが実行されます。
     *
     * @example
     * ```
     * Twn.parallel(
     *     Twn.jq.tween($("#box1"), 0.4, "easeOutCubic", { left: 100, top: 100 }),
     *     Twn.jq.tween($("#box2"), 0.4, "easeOutCubic", { left: 100, top: 100 }).delay(0.1),
     *     Twn.jq.tween($("#box3"), 0.4, "easeOutCubic", { left: 100, top: 100 }).delay(0.2),
     *     Twn.jq.tween($("#box4"), 0.4, "easeOutCubic", { left: 100, top: 100 }).delay(0.3)
     * ).play();
     * ```
     *
     * @method		parallel
     *
     * @param		{Array}		...commandList		可変長引数で渡すコマンドの配列
     *
     * @return		{List}		メソッドチェーン用のインスタンス
     */
    function parallel() {
        var commandList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            commandList[_i - 0] = arguments[_i];
        }
        return new List(commandList, true);
    }
    Twn.parallel = parallel;
})(Twn || (Twn = {}));
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="./Command.ts" />
/**
 * @module			Twn
 * @namespace		Twn
 */
var Twn;
(function (Twn) {
    var Wait = (function (_super) {
        __extends(Wait, _super);
        /**
         * 待機するコマンドのクラスです。
         *
         * **コンストラクタを直接使うことはありません。**
         *
         * * **Twn.wait()**
         *
         * **を使ってください。**
         *
         * @class			Wait
         * @extends		Command
         * @constructor
         *
         * @param		{Number}	wait	待機時間。デフォルトはミリ秒ではなく秒です。
         */
        function Wait(wait) {
            var _this = this;
            _super.call(this);
            // コマンドの実行が完了したらこれを呼び出してもらうようにする
            this._onComplete = function () {
                delete _this._timer;
                if (_this._callback)
                    _this._callback();
            };
            this._wait = wait;
        }
        /**
         * コマンドのインスタンスを破棄します。
         * コマンドは直ちに停止され、再び開始はできなくなります。
         *
         * @method		destroy
         *
         * @return 	{Wait}		メソッドチェーン用のインスタンス
         */
        Wait.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            delete this._wait;
            delete this._timer;
            return this;
        };
        /**
         * コマンドを開始します。
         *
         * @method		play
         *
         * @return		{Wait}		メソッドチェーン用のインスタンス
         */
        Wait.prototype.play = function () {
            //super.play();
            this._timer = setTimeout(this._onComplete, this._wait * Twn.Command.TIME_UNIT / (Twn.Command.SPEED ? Twn.Command.SPEED : 0.01));
            return this;
        };
        /**
         * コマンドを停止します。
         * 再び、最初から開始することもできます。
         *
         * @method		stop
         *
         * @return		{Wait}		メソッドチェーン用のインスタンス
         */
        Wait.prototype.stop = function () {
            //super.stop();
            if (this._timer)
                clearTimeout(this._timer);
            delete this._timer;
            return this;
        };
        return Wait;
    })(Twn.Command);
    Twn.Wait = Wait;
    // ----------------------------------------------------------------------------------------------------
    // ショートカット
    //
    /**
     * @class		xxx
     * @namespace	- Twn
     */
    /**
     * **待機するコマンド**を生成します。
     *
     * Twn.serial の中で間隔を空けるために使います。<br>
     * 値が 0 以下の場合は何もしない Void コマンドが返ります。
     *
     * @example
     * ```
     * Twn.serial(
     *     ...
     *     Twn.wait(0.5),
     *     Twn.func(console.log, "Hello World!", console),
     *     ...
     * ).play()
     * ```
     *
     * @method		wait
     *
     * @param		{Number}		wait	待機時間。デフォルトはミリ秒ではなく秒です。
     *
     * @return		{Wait|Void}		メソッドチェーン用のインスタンス
     */
    function wait(wait) {
        if (wait > 0) {
            return new Wait(wait);
        }
        else {
            return new Twn.Void();
        }
    }
    Twn.wait = wait;
})(Twn || (Twn = {}));
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="./Command.ts" />
/**
 * @module			Twn
 * @namespace		Twn
 */
var Twn;
(function (Twn) {
    var Func = (function (_super) {
        __extends(Func, _super);
        /**
         * 関数を実行するコマンドのクラスです。
         *
         * **コンストラクタを直接使うことはありません。**
         *
         * * **Twn.func()**
         *
         * **を使ってください。**
         *
         * @class				Func
         * @extends			Command
         * @constructor
         *
         * @param	{Function}		func		実行させる関数
         * @param	{Array|Object}	args		関数に渡す引数の配列、あるいは1つの引数
         * @param	{Object}		thisObject	関数内で this に紐付けるオブジェクト
         * @param	{Boolean}		async		非同期処理にするかどうか
         */
        function Func(func, args, thisObject, async) {
            var _this = this;
            _super.call(this);
            // コマンドの実行が完了したらこれを呼び出してもらうようにする
            this._onComplete = function () {
                if (_this._callback && _this._isPlay)
                    _this._callback();
            };
            if (!(args instanceof Array))
                args = [args];
            this._func = func;
            this._args = args;
            if (async) {
                if (this._args && this._args.unshift) {
                    this._args.unshift(this._onComplete);
                }
                else {
                    this._args = [this._onComplete];
                }
            }
            this._thisObject = thisObject;
            this._async = async;
            this._isPlay = false;
        }
        /**
         * コマンドのインスタンスを破棄します。
         * コマンドは直ちに停止され、再び開始はできなくなります。
         *
         * @method		destroy
         *
         * @return		{Func}		メソッドチェーン用のインスタンス
         */
        Func.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            delete this._func;
            delete this._args;
            delete this._thisObject;
            delete this._async;
            return this;
        };
        /**
         * コマンドを開始します。
         *
         * @example
         * ```
         * Twn.func(console.log, "Hello World!", console).play();
         * ```
         *
         * @method		play
         *
         * @return		{Func}		メソッドチェーン用のインスタンス
         */
        Func.prototype.play = function () {
            //super.play();
            this._isPlay = true;
            if (this._func) {
                if (this._thisObject) {
                    this._func.apply(this._thisObject, this._args);
                }
                else {
                    this._func.apply(window, this._args);
                }
            }
            if (!this._async)
                this._onComplete();
            return this;
        };
        /**
         * コマンドを停止します。
         * 再び、最初から開始することもできます。
         *
         * @method		stop
         *
         * @return		{Func}		メソッドチェーン用のインスタンス
         */
        Func.prototype.stop = function () {
            //super.stop();
            this._isPlay = false;
            return this;
        };
        return Func;
    })(Twn.Command);
    Twn.Func = Func;
    // ----------------------------------------------------------------------------------------------------
    // ショートカット
    //
    /**
     * @class		xxx
     * @namespace	- Twn
     */
    /**
     * **関数を実行するコマンド**を生成します。
     *
     * @example
     * ```
     * Twn.func(console.log, "Hello World!", console).play();
     * Twn.func(console.log, ["Hello", "World", "!"], console).play();
     * ```
     *
     * @method		func
     *
     * @param		{Function}		func			実行させる関数
     * @param		{Array|Object}	[args]			関数に渡す引数の配列、あるいは1つの引数
     * @param		{Object}		[thisObject]	関数内で this に紐付けるオブジェクト
     *
     * @return		{Func}		メソッドチェーン用のインスタンス
     */
    function func(func, args, thisObject) {
        return new Func(func, args, thisObject, false);
    }
    Twn.func = func;
    /**
     * **関数を非同期で実行するコマンド**を生成します。
     * 実行される関数の第1引数にコールバックを渡すので、任意のタイミングで実行してください。
     *
     * @example
     * ```
     * Twn.funcAsync(async, "Hello World!").play(); // 1秒後に完了する
     * function async(callback, message) {
     *     // 1秒後にコールバックを実行する
     *     setTimeout(function() {
     *         console.log(message);
     *         callback();
     *     }, 1000)
     * }
     * ```
     *
     * @method		funcAsync
     *
     * @param		{Function}		func			実行させる関数
     * @param		{Array|Object}	[args]			関数に渡す引数の配列、あるいは1つの引数
     * @param		{Object}		[thisObject]	関数内で this に紐付けるオブジェクト
     *
     * @return		{Func}		メソッドチェーン用のインスタンス
     */
    function funcAsync(func, args, thisObject) {
        return new Func(func, args, thisObject, true);
    }
    Twn.funcAsync = funcAsync;
    /**
     * **console.log を実行するコマンド**を生成します。
     *
     * @example
     * ```
     * Twn.log("Hello World!").play();
     * Twn.log("Hello", "World", "!").play();
     * ```
     *
     * @method		log
     *
     * @param		{Array}	...args		console.log に可変長引数で渡すメッセージの配列
     *
     * @return		{Func}		メソッドチェーン用のインスタンス
     */
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return new Func(console.log, args, console, false);
    }
    Twn.log = log;
    /**
     * **Twn.js 全体のスピードを変更するコマンド**を生成します。
     *
     * @example
     * ```
     * Twn.serial(
     *     Twn.speed(4), // 4倍速
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { top: 100, left: 100, opacity: 1 }),
     *     Twn.speed(1), // 等速
     *     Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { top: 100, left: 100, opacity: 1 }),
     * ).play();
     * ```
     *
     * @method		speed
     *
     * @param		{Number}	speed		時間指定を割る値です。
     *
     * @return		{Func}		メソッドチェーン用のインスタンス
     */
    function speed(speed) {
        return new Func(Twn.Command.SET_SPEED, [speed], Twn.Command, false);
    }
    Twn.speed = speed;
})(Twn || (Twn = {}));
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="./Command.ts" />
/**
 * @module			Twn
 * @namespace		Twn
 */
var Twn;
(function (Twn) {
    var Void = (function (_super) {
        __extends(Void, _super);
        /**
         * 何も実行しないコマンドのクラスです。
         *
         * **直接使うことはありません。**
         *
         * @class				Void
         * @extends			Command
         * @constructor
         */
        function Void() {
            _super.call(this);
        }
        /**
         * コマンドのインスタンスを破棄します。
         * コマンドは直ちに停止され、再び開始はできなくなります。
         *
         * @method		destroy
         *
         * @return		{Void}		メソッドチェーン用のインスタンス
         */
        Void.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            return this;
        };
        /**
         * コマンドを開始します。
         *
         * @method		play
         *
         * @return		{Void}		メソッドチェーン用のインスタンス
         */
        Void.prototype.play = function () {
            //super.play();
            this._onComplete();
            return this;
        };
        return Void;
    })(Twn.Command);
    Twn.Void = Void;
})(Twn || (Twn = {}));
/// <reference path="../../dts/jquery.d.ts" />
/// <reference path="./Command.ts" />
/**
 * @module			Twn
 * @namespace		Twn
 */
var Twn;
(function (Twn) {
    var Loop = (function (_super) {
        __extends(Loop, _super);
        /**
         * コマンドをループで実行させるコマンドのクラスです。
         *
         * **コンストラクタを直接使うことはありません。**
         *
         * * **Twn.loop()**
         *
         * **を使ってください。**
         *
         * @class 				Loop
         * @extends			Command
         * @constructor
         *
         * @param	{Number}		loopNum			ループさせる回数です。0以下の場合は無限です。
         * @param	{Command}		command			ループさせるコマンド
         */
        function Loop(loopNum, command) {
            var _this = this;
            _super.call(this);
            // コマンドの実行が完了したらこれを呼び出してもらうようにする
            this._onComplete = function () {
                var command;
                ++_this._current;
                // ループ再実行
                if (_this._total == 0 || _this._current < _this._total) {
                    _this._command.play();
                }
                else {
                    if (_this._callback)
                        _this._callback();
                }
            };
            if (!(command instanceof Twn.Command))
                return;
            this._current = 0;
            this._total = (loopNum < 1) ? 0 : (loopNum | 0);
            command._callback = this._onComplete;
            this._command = command;
        }
        /**
         * コマンドのインスタンスを破棄します。
         * コマンドは直ちに停止され、再び開始はできなくなります。
         *
         * @method		destroy
         *
         * @return		{Loop}		メソッドチェーン用のインスタンス
         */
        Loop.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            delete this._command;
            delete this._total;
            delete this._current;
            return this;
        };
        /**
         * コマンドを開始します。
         *
         * @example
         * ```
         * Twn.loop(10,
         *     Twn.serial(
         *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: -100 }),
         *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: -100 }),
         *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: 100 }),
         *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: 100 })
         *     )
         * ).play();
         * ```
         *
         * @method		play
         *
         * @return		{Loop}		メソッドチェーン用のインスタンス
         */
        Loop.prototype.play = function () {
            //super.play();
            if (!this._command)
                return this;
            this._current = 0;
            this._command.play();
            return this;
        };
        /**
         * コマンドを停止します。
         * 再び、最初から開始することもできます。
         *
         *
         * @example
         * ```
         * var serial = Twn.Serial(
         * 		...
         * ).play();
         * ...
         * serial.stop();
         * ...
         * serial.play();
         * ```
         *
         * @method		stop
         *
         * @return		{Loop}		メソッドチェーン用のインスタンス
         */
        Loop.prototype.stop = function () {
            //super.stop();
            if (!this._command)
                return this;
            this._command.stop();
            return this;
        };
        return Loop;
    })(Twn.Command);
    Twn.Loop = Loop;
    // ----------------------------------------------------------------------------------------------------
    // ショートカット
    //
    /**
     * @class		xxx
     * @namespace	- Twn
     */
    /**
     * **コマンドをループで実行するコマンド**を生成します。
     *
     * ループ回数を0に設定すると無限ループになります。<br>
     *
     * @example
     * ```
     * Twn.loop(10,
     *     Twn.serial(
     *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: -100 }),
     *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: -100 }),
     *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: 100, top: 100 }),
     *         Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { left: -100, top: 100 })
     *     )
     * ).play();
     * ```
     *
     * @method		loop
     *
     * @param	{Number}		loopNum			ループさせる回数です。0以下の場合は無限です。
     * @param	{Command}		command			ループさせるコマンド
     *
     * @return		{Loop}		メソッドチェーン用のインスタンス
     */
    function loop(loopNum, command) {
        return new Loop(loopNum, command);
    }
    Twn.loop = loop;
})(Twn || (Twn = {}));
/// <reference path="../../../dts/jquery.d.ts" />
/// <reference path="../Command.ts" />
/**
 * @module			Twn.jq
 * @namespace		Twn.jq
 */
var Twn;
(function (Twn) {
    var jq;
    (function (jq) {
        var Tween = (function (_super) {
            __extends(Tween, _super);
            /**
             * jQuery の animate を実行するコマンドのクラスです。
             *
             * **コンストラクタを直接使うことはありません。**
             *
             * * **Twn.jq.tween()**
             *
             * **を使ってください。**
             *
             * @class				Tween
             * @extends			Command
             * @constructor
             *
             * @param		{JQuery}		query		animate を実行させる jQuery オブジェクト
             * @param		{Number}		duration	実行時間。デフォルトはミリ秒ではなく秒です。
             * @param		{String}		ease		イージング関数を表す文字列
             * @param		{Object}		props		animate に渡すCSSプロパティの入ったオブジェクト
             */
            function Tween(query, duration, ease, props) {
                _super.call(this);
                this._query = query;
                this._duration = duration;
                this._ease = ease;
                this._props = props;
            }
            /**
             * コマンドのインスタンスを破棄します。
             * コマンドは直ちに停止され、再び開始はできなくなります。
             *
             * @method		destroy
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this._query;
                delete this._duration;
                delete this._ease;
                delete this._props;
                return this;
            };
            /**
             * コマンドを開始します。
             *
             * @example
             * ```
             * Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { top: 100, left: 100, opacity: 1 }).play();
             * ```
             *
             * @method		play
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.play = function () {
                //super.play();
                this._query.animate(this._props, {
                    duration: this._duration * Twn.Command.TIME_UNIT / (Twn.Command.SPEED ? Twn.Command.SPEED : 0.01),
                    easing: this._ease,
                    queue: false,
                    complete: this._onComplete
                });
                return this;
            };
            /**
             * コマンドを停止します。
             * 再び、最初から開始することもできます。
             *
             * @example
             * ```
             * var tween = Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { top: 100, left: 100, opacity: 1 }).play();
             * ...
             * tween.stop();
             * ...
             * tween.play();
             * ```
             *
             * @method		stop
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.stop = function () {
                //super.stop();
                this._query.stop();
                return this;
            };
            return Tween;
        })(Twn.Command);
        jq.Tween = Tween;
        // ----------------------------------------------------------------------------------------------------
        // ショートカット
        //
        /**
         * @class		xxx
         * @namespace	- Twn.jq
         */
        /**
         * **jQuery の animate を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.jq.tween($("#box"), 0.4, "easeOutCubic", { top: 100, left: 100, opacity: 1 }).play();
         * ```
         *
         * @method		tween
         *
         * @param		{JQuery}		query		animate を実行させる jQuery オブジェクト
         * @param		{Number}		duration	実行時間。デフォルトはミリ秒ではなく秒です。
         * @param		{String}		ease		イージング関数を表す文字列
         * @param		{Object}		props		animate に渡すCSSプロパティの入ったオブジェクト
         *
         * @return	 	{Tween}		メソッドチェーン用のインスタンス
         */
        function tween(query, duration, ease, props) {
            return new Tween(query, duration, ease, props);
        }
        jq.tween = tween;
    })(jq = Twn.jq || (Twn.jq = {}));
})(Twn || (Twn = {}));
/// <reference path="../../../dts/jquery.d.ts" />
/// <reference path="../Command.ts" />
/**
 * @module			Twn.jq
 * @namespace		Twn.jq
 */
var Twn;
(function (Twn) {
    var jq;
    (function (jq) {
        var Prop = (function (_super) {
            __extends(Prop, _super);
            /**
             * jquery の css / attr / addClass / removeClass を実行するコマンドのクラスです。
             *
             * **コンストラクタを直接使うことはありません。**
             *
             * * **Twn.jq.css()**
             * * **Twn.jq.attr()**
             * * **Twn.jq.addClass()**
             * * **Twn.jq.removeClass()**
             *
             * **を使ってください。**
             *
             * @class				Prop
             * @extends			Command
             * @constructor
             *
             * @param		{JQuery}			query		jquery のメソッドを実行させる jQuery オブジェクト
             * @param		{Object|String}		props		jquery のメソッドに渡す諸々のデータ
             * @param		{String}			mode		jQuery のメソッドの種類を指定する文字列
             */
            function Prop(query, props, mode) {
                _super.call(this);
                this._query = query;
                this._props = props;
                this._mode = mode;
            }
            /**
             * コマンドのインスタンスを破棄します。
             * コマンドは直ちに停止され、再び開始はできなくなります。
             *
             * @method		destroy
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this._query;
                delete this._props;
                delete this._mode;
                return this;
            };
            /**
             * コマンドを開始します。
             *
             * @example
             * ```
             * Twn.jq.css($("#box"), { top: 0, left: 0, opacity: 0 }).play();
             * ```
             *
             * @method		play
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.play = function () {
                //super.play();
                switch (this._mode) {
                    case "css":
                        this._query.css(this._props);
                        break;
                    case "attr":
                        this._query.attr(this._props);
                        break;
                    case "addClass":
                        this._query.addClass(this._props);
                        break;
                    case "removeClass":
                        this._query.removeClass(this._props);
                        break;
                    default:
                }
                this._onComplete();
                return this;
            };
            return Prop;
        })(Twn.Command);
        jq.Prop = Prop;
        // ----------------------------------------------------------------------------------------------------
        // ショートカット
        //
        /**
         * @class		xxx
         * @namespace	- Twn.jq
         */
        /**
         * **jQuery の css を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.jq.css($("#box"), { top: 0, left: 0, opacity: 0 }).play();
         * ```
         * @method		css
         *
         * @param		{JQuery}		query		css を実行させる jQuery オブジェクト
         * @param		{Object}		props		css に渡すCSSプロパティの入ったオブジェクト
         *
         * @return	 	{Prop}		メソッドチェーン用のインスタンス
         */
        function css(query, props) {
            return new Prop(query, props, "css");
        }
        jq.css = css;
        /**
         * **jQuery の attr を実行するコマンド**を生成します。
         *
         *
         * @example
         * ```
         * Twn.jq.attr($("img#sample"), { src: "./images/sample.png" }).play();
         * ```
         *
         * @method		attr
         *
         * @param		{JQuery}		query		attr を実行させる jQuery オブジェクト
         * @param		{Object}		props		attr に渡す属性値の入ったオブジェクト
         *
         * @return	 	{Prop}		メソッドチェーン用のインスタンス
         */
        function attr(query, props) {
            return new Prop(query, props, "attr");
        }
        jq.attr = attr;
        /**
         * **jQuery の addClass を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.jq.addClass($("#box"), "hover").play();
         * ```
         *
         * @method		addClass
         *
         * @param		{JQuery}		query		addClass を実行させる jQuery オブジェクト
         * @param		{String}		className	addClass に渡すクラス名
         *
         * @return	 	{Prop}		メソッドチェーン用のインスタンス
         */
        function addClass(query, className) {
            return new Prop(query, className, "addClass");
        }
        jq.addClass = addClass;
        /**
         * **jQuery の removeClass を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.jq.removeClass($("#box"), "hover").play();
         * ```
         *
         * @method		removeClass
         *
         * @param		{JQuery}		query		removeClass を実行させる jQuery オブジェクト
         * @param		{String}		className	removeClass に渡すクラス名
         *
         * @return	 	{Prop}		メソッドチェーン用のインスタンス
         */
        function removeClass(query, className) {
            return new Prop(query, className, "removeClass");
        }
        jq.removeClass = removeClass;
    })(jq = Twn.jq || (Twn.jq = {}));
})(Twn || (Twn = {}));
/// <reference path="../../../dts/createjs-lib.d.ts" />
/// <reference path="../../../dts/easeljs.d.ts" />
/// <reference path="../../../dts/tweenjs.d.ts" />
/// <reference path="../Command.ts" />
/**
 * @module			Twn.cjs
 * @namespace		Twn.cjs
 */
var Twn;
(function (Twn) {
    var cjs;
    (function (cjs) {
        var Prop = (function (_super) {
            __extends(Prop, _super);
            /**
             * EaselJS(CreateJS) の DisplayObject.set を実行するコマンドのクラスです。
             *
             * **コンストラクタを直接使うことはありません。**
             *
             * * **Twn.cjs.prop()**
             *
             * **を使ってください。**
             *
             * @class				Prop
             * @extends			Command
             * @constructor
             *
             * @param		{DisplayObect}		target		DisplayObject.set を実行させる DisplayObect オブジェクト
             * @param		{Object}			props		DisplayObject.set に渡すプロパティ
             */
            function Prop(target, props) {
                var _this = this;
                _super.call(this);
                // コマンドの実行が完了したらこれを呼び出してもらうようにする
                this._onComplete = function () {
                    if (_this._callback)
                        _this._callback();
                };
                this._target = target;
                this._props = props;
            }
            /**
             * コマンドのインスタンスを破棄します。
             * コマンドは直ちに停止され、再び開始はできなくなります。
             *
             * @example
             * ```
             * var prop = Twn.cjs.prop(shape, { x: 0, y: 0, alpha: 0 }).play();
             * ...
             * prop.destroy();
             * ```
             *
             * @method		destroy
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this._target;
                delete this._props;
                return this;
            };
            /**
             * コマンドを開始します。
             *
             * @example
             * ```
             * Twn.cjs.prop(shape, { x: 0, y: 0, alpha: 0 }).play();
             * ```
             *
             * @method		play
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.play = function () {
                _super.prototype.play.call(this);
                this._target.set(this._props);
                this._onComplete();
                return this;
            };
            /**
             * コマンドを停止します。
             * 再び、最初から開始することもできます。
             *
             * @method		stop
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.stop = function () {
                _super.prototype.stop.call(this);
                return this;
            };
            return Prop;
        })(Twn.Command);
        cjs.Prop = Prop;
        // ----------------------------------------------------------------------------------------------------
        // ショートカット
        //
        /**
         * @class		xxx
         * @namespace	- Twn.cjs
         */
        /**
         * **EaselJS(CreateJS) の DisplayObject.set を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.cjs.prop(shape, { x: 0, y: 0, alpha: 0 }).play();
         * ```
         * @method		prop
         *
         * @param		{DisplayObect}		target		DisplayObject.set を実行させる DisplayObect オブジェクト
         * @param		{Object}			props		DisplayObject.set に渡すプロパティ
         *
         * @return	 	{Prop}		メソッドチェーン用のインスタンス
         */
        function prop(target, props) {
            return new Prop(target, props);
        }
        cjs.prop = prop;
    })(cjs = Twn.cjs || (Twn.cjs = {}));
})(Twn || (Twn = {}));
/// <reference path="../../../dts/createjs-lib.d.ts" />
/// <reference path="../../../dts/easeljs.d.ts" />
/// <reference path="../../../dts/tweenjs.d.ts" />
/// <reference path="../Command.ts" />
/**
 * @module			Twn.cjs
 * @namespace		Twn.cjs
 */
var Twn;
(function (Twn) {
    var cjs;
    (function (cjs) {
        var Tween = (function (_super) {
            __extends(Tween, _super);
            /**
             * TweenJS(CreateJS) の Tween.to を実行するコマンドのクラスです。
             *
             * **コンストラクタを直接使うことはありません。**
             *
             * * **Twn.cjs.tween()**
             *
             * **を使ってください。**
             *
             * @class				Tween
             * @extends			Command
             * @constructor
             *
             * @param		{Object}		target 		Tween.get に渡すオブジェクト
             * @param		{Number}		duration	実行時間。デフォルトはミリ秒ではなく秒です。
             * @param		{Function}		ease		イージング関数を表す文字列
             * @param		{Object}		prop		Tween.to に渡すプロパティ
             * @param		{Number}		[position=0]	Tweenの開始位置を指定する秒数です。
             */
            function Tween(target, duration, ease, prop, position) {
                var _this = this;
                _super.call(this);
                // コマンドの実行が完了したらこれを呼び出してもらうようにする
                this._onComplete = function () {
                    delete _this._tween;
                    if (_this._callback)
                        _this._callback();
                };
                if (!position)
                    position = 0;
                if (position > 1)
                    position = 1;
                this._target = target;
                this._duration = duration;
                this._ease = ease;
                this._prop = prop;
                this._position = position;
            }
            /**
             * コマンドのインスタンスを破棄します。
             * コマンドは直ちに停止され、再び開始はできなくなります。
             *
             * @example
             * ```
             * var tween = Twn.cjs.tween(shape, 0.4, cjs.Ease.cubicOut, { x: 100, y: 100, alpha: 1 }).play();
             * ...
             * tween.destroy();
             * ```
             *
             * @method		destroy
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this._target;
                delete this._duration;
                delete this._ease;
                delete this._prop;
                delete this._position;
                delete this._tween;
                return this;
            };
            /**
             * コマンドを開始します。
             *
             * @example
             * ```
             * Twn.cjs.tween(shape, 0.4, cjs.Ease.cubicOut, { x: 100, y: 100, alpha: 1 }).play();
             * ```
             *
             * @method		play
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.play = function () {
                _super.prototype.play.call(this);
                this._tween = createjs.Tween.get(this._target).to(this._prop, this._duration * Twn.Command.TIME_UNIT / (Twn.Command.SPEED ? Twn.Command.SPEED : 0.01), this._ease);
                if (this._position > 0)
                    this._tween.setPosition(this._position * Twn.Command.TIME_UNIT / (Twn.Command.SPEED ? Twn.Command.SPEED : 0.01), createjs.Tween.NONE);
                this._tween.call(this._onComplete);
                return this;
            };
            /**
             * コマンドを停止します。
             * 再び、最初から開始することもできます。
             *
             * @example
             * ```
             * var tween = Twn.cjs.tween(shape, 0.4, cjs.Ease.cubicOut, { x: 100, y: 100, alpha: 1 }).play();
             * ...
             * tween.stop();
             * ...
             * tween.play();
             * ```
             *
             * @method		stop
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.stop = function () {
                _super.prototype.stop.call(this);
                if (this._tween)
                    this._tween.setPaused(true);
                delete this._tween;
                return this;
            };
            return Tween;
        })(Twn.Command);
        cjs.Tween = Tween;
        // ----------------------------------------------------------------------------------------------------
        // ショートカット
        //
        /**
         * @class		xxx
         * @namespace	- Twn.cjs
         */
        /**
         * **TweenJS(CreateJS) の Tween.to を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.pararell(
         *   Twn.cjs.tween(shape, 0.3, cjs.Ease.linear, { alpha: 1 }),
         *   // 最初の0.3秒をスキップ
         *   Twn.cjs.tween(shape, 0.6, cjs.Ease.cubicOut, { x: 100, y: 100 }, 0.3)
         * ).play();
         * ```
         *
         * @method		tween
         *
         * @param		{Object}		target		Tween.get に渡すオブジェクト
         * @param		{Number}		duration	実行時間。デフォルトはミリ秒ではなく秒です。
         * @param		{Function}		ease		イージング関数
         * @param		{Object}		prop		Tween.to に渡すプロパティ
         * @param		{Number}		[position=0]	Tweenの開始位置を指定する秒数です。
         *
         * @return	 	{Tween}		メソッドチェーン用のインスタンス
         */
        function tween(target, duration, ease, prop, position) {
            if (position === void 0) { position = 0; }
            return new Tween(target, duration, ease, prop, position);
        }
        cjs.tween = tween;
    })(cjs = Twn.cjs || (Twn.cjs = {}));
})(Twn || (Twn = {}));
/// <reference path="../../../dts/jquery.d.ts" />
/// <reference path="../../../dts/velocity-animate.d.ts" />
/// <reference path="../Command.ts" />
/**
 * @module			Twn.vel
 * @namespace		Twn.vel
 */
var Twn;
(function (Twn) {
    var vel;
    (function (vel) {
        var Tween = (function (_super) {
            __extends(Tween, _super);
            /**
             * Velocity.js の velocity を実行するコマンドのクラスです。
             *
             * **コンストラクタを直接使うことはありません。**
             *
             * * **Twn.vel.tween()**
             *
             * **を使ってください。**
             *
             * @class				Tween
             * @extends			Command
             * @constructor
             *
             * @param		{JQuery}		query		velocity を実行させる jQuery オブジェクト
             * @param		{Number}		duration	実行時間。デフォルトはミリ秒ではなく秒です。
             * @param		{String}		ease		イージング関数を表す文字列
             * @param		{Object}		props		velocity に渡すプロパティの入ったオブジェクト
             */
            function Tween(query, duration, ease, props) {
                _super.call(this);
                this._query = query;
                this._duration = duration;
                this._ease = ease;
                this._props = props;
            }
            /**
             * コマンドのインスタンスを破棄します。
             * コマンドは直ちに停止され、再び開始はできなくなります。
             *
             * @method		destroy
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this._query;
                delete this._duration;
                delete this._ease;
                delete this._props;
                return this;
            };
            /**
             * コマンドを開始します。
             *
             * @example
             * ```
             * Twn.vel.tween($("#box"), 0.4, "easeOutCubic", { transformX: 100, transformY: 100, opacity: 1 }).play();
             * ```
             *
             * @method		play
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.play = function () {
                //super.play();
                this._query.velocity(this._props, {
                    duration: this._duration * Twn.Command.TIME_UNIT / (Twn.Command.SPEED ? Twn.Command.SPEED : 0.01),
                    easing: this._ease,
                    queue: false,
                    complete: this._onComplete
                });
                return this;
            };
            /**
             * コマンドを停止します。
             * 再び、最初から開始することもできます。
             *
             * @example
             * ```
             * var tween = Twn.vel.tween($("#box"), 0.4, "easeOutCubic", { transformX: 100, transformY: 100, opacity: 1 }).play();
             * ...
             * tween.stop();
             * ...
             * tween.play();
             * ```
             *
             * @method		stop
             *
             * @return		{Tween}		メソッドチェーン用のインスタンス
             */
            Tween.prototype.stop = function () {
                this._query.velocity("stop");
                return this;
            };
            return Tween;
        })(Twn.Command);
        vel.Tween = Tween;
        // ----------------------------------------------------------------------------------------------------
        // ショートカット
        //
        /**
         * @class		xxx
         * @namespace	- Twn.vel
         */
        /**
         * **Velocity.js の velocity を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.vel.tween($("#box"), 0.4, "easeOutCubic", { transformX: 100, transformY: 100, opacity: 1 }).play();
         * ```
         *
         * @method		tween
         *
         * @param		{JQuery}		query		velocity を実行させる jQuery オブジェクト
         * @param		{Number}		duration	実行時間。デフォルトはミリ秒ではなく秒です。
         * @param		{String}		ease		イージング関数を表す文字列
         * @param		{Object}		props		velocity に渡すプロパティの入ったオブジェクト
         *
         * @return	 	{Tween}		メソッドチェーン用のインスタンス
         */
        function tween(query, duration, ease, props) {
            return new Tween(query, duration, ease, props);
        }
        vel.tween = tween;
    })(vel = Twn.vel || (Twn.vel = {}));
})(Twn || (Twn = {}));
/// <reference path="../../../dts/jquery.d.ts" />
/// <reference path="../../../dts/velocity-animate.d.ts" />
/// <reference path="../Command.ts" />
/**
 * @module			Twn.vel
 * @namespace		Twn.vel
 */
var Twn;
(function (Twn) {
    var vel;
    (function (vel) {
        var Prop = (function (_super) {
            __extends(Prop, _super);
            /**
             * Velocity.js の hook を実行するコマンドのクラスです。
             *
             * **コンストラクタを直接使うことはありません。**
             *
             * * **Twn.vel.hook()**
             *
             * **を使ってください。**
             *
             * @class				Prop
             * @extends			Command
             * @constructor
             *
             * @param		{JQuery}		query		hook を実行させる jQuery オブジェクト
             * @param		{Object}		props		hook に渡すプロパティの入ったオブジェクト
             */
            function Prop(query, props) {
                _super.call(this);
                this._query = query;
                this._props = props;
            }
            /**
             * コマンドのインスタンスを破棄します。
             * コマンドは直ちに停止され、再び開始はできなくなります。
             *
             * @method		destroy
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.destroy = function () {
                _super.prototype.destroy.call(this);
                delete this._query;
                delete this._props;
                return this;
            };
            /**
             * コマンドを開始します。
             *
             * @example
             * ```
             * Twn.vel.hook($("#box"), { transformX: "0px", transformY: "0px" }).play();
             * ```
             *
             * @method		play
             *
             * @return		{Prop}		メソッドチェーン用のインスタンス
             */
            Prop.prototype.play = function () {
                //super.play();
                for (var prop in this._props) {
                    $.Velocity.hook(this._query, prop, this._props[prop]);
                }
                this._onComplete();
                return this;
            };
            return Prop;
        })(Twn.Command);
        vel.Prop = Prop;
        // ----------------------------------------------------------------------------------------------------
        // ショートカット
        //
        /**
         * @class		xxx
         * @namespace	- Twn.vel
         */
        /**
         * ** Velocity.js の hook を実行するコマンド**を生成します。
         *
         * @example
         * ```
         * Twn.vel.hook($("#box"), { transformX: "0px", transformY: "0px" }).play();
         * ```
         * @method		hook
         *
         * @param		{JQuery}		query		hook を実行させる jQuery オブジェクト
         * @param		{Object}		props		hook に渡すプロパティの入ったオブジェクト
         *
         * @return	 	{Prop}		メソッドチェーン用のインスタンス
         */
        function hook(query, props) {
            return new Prop(query, props);
        }
        vel.hook = hook;
    })(vel = Twn.vel || (Twn.vel = {}));
})(Twn || (Twn = {}));
/// <reference path="../dts/jquery.d.ts" />
