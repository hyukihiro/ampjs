/**
 * amp JavaScript Library
 *
 * @licence MIT Licence
 *
 * author Yoshihito Fujiwara
 * source https://bitbucket.org/cutupworks/ampjs
 * Copyright (c) 2014 Yoshihito Fujiwara
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


/*--------------------------------------------------------------------------
	�{�T�C�g���̃\�[�X�R�[�h�̕ҏW�E���f�]�ځE�]�p���֎~���܂��B
	Copyright(c) Vogaro.inc ALL Rights Reserved.
	http://www.vogaro.co.jp/
--------------------------------------------------------------------------*/


;var common = common || {};

(function($, amp, exports){


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/

  /**
   * ���L�b�h�X���C�_�[
   *
   * @constructor
   * @class LiquidSlider
   * @param {jQuery} $wrap   �X���C�_�[���b�p�[�v�f
   * @param {Object} options �I�v�V�����l
   */
	function LiquidSlider($wrap, options){
		this.param = $.extend(
			true,
			{},
			LiquidSlider.defaults,
			{
        $wrap         : $wrap,
        $frame        : $wrap.find('.inner'),
        $slide        : $wrap.find('.list'),
        $items        : $wrap.find('.list').children(),
        $pointer      : $wrap.find('.pointer'),
        $thumbnail    : $wrap.find('.thumbnail a'),
        $prev         : $wrap.find('.prev a'),
        $next         : $wrap.find('.next a'),
        originalLength: $wrap.find('.list').children().length,
        length        : 0,
        clone         : 2,
        distance      : 0,
        position      : 0,
        timerId       : null,
        isAnimate     : false
			},
			options
		);

		if(this.param.isInit){
			this.init();
		}
	}

	// prototype
	var p = LiquidSlider.prototype;



	/*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

	/**
	 * �I�v�V�����̃f�t�H���g�l
	 * @static
	 * @property defaults
	 * @type {Object}
	 */
	LiquidSlider.defaults = {
    isInit        : true,
    isFlick       : true,
    current       : 0,
    duration      : 500,
    ease          : 'easeOutExpo',
    timer         : 0,
    activeClass   : 'active',
    tweenStartCall: $.noop,
    tweenCall     : $.noop,
    tweenEndCall  : $.noop,
    resizeCall    : $.noop,
    resizeStopCall: $.noop
	};



	/*--------------------------------------------------------------------------
		@method
	--------------------------------------------------------------------------*/

	/**
	 * ������
	 * @method init
	 * @return {LiquidSlider}
	 */
	p.init = function(){
		var self = this;
		if(!self._isInit){
			self._isInit = true;

			// �v�f�A�p�����[�^�[�ݒ�
			self._createSlideItems();
			self._createPointer();
			self.setStyle();
			self._active();

			// �C�x���g�ݒ�
			self.addEventResize();
			self.addEventFlick();
			self.addEventNext(self.param.$next);
			self.addEventPrev(self.param.$prev);
			self.addEventPager(self.param.$thumbnail);
			self.addEventPager(self.param.$pointer.find('a'));
			self.timerStart();

			self.param.$wrap.hover(
				function(){ self.timerStop();},
				function(){ self.timerStart();}
			);
		};

		return self;
	};


	/**
	 * �p�����[�^�[�A�X�^�C���̐ݒ�
	 * @method setStyle
	 * @return {LiquidSlider}
	 */
	p.setStyle = function(){
		var self = this,
		stageWidth, margin;

		self.param.length = self.param.$items.length;
		self.param.distance = self.param.$items.outerWidth(true);

		// �X�e�[�W�̕�
		stageWidth = self.param.$wrap.outerWidth(true);

		// �����Z���^�[����
		margin = stageWidth < self.param.distance ? 0 : (stageWidth - self.param.distance) / 2;

		// �\���ʒu
		self.param.position = margin + (self.param.distance * self.param.originalLength * -1);

		// ���݂̃A�C�e���𒆉��ɔz�u
		self.param.$slide.css({
			width: self.param.length * self.param.distance,
			left : self.param.position
		});

		// �t���[���̍�����ݒ�
		// self.param.$frame.css({
		// 	height: self.param.$items.eq(self.param.current).outerHeight(true)
		// });

		return self;
	};


	/* events
	-----------------------------------------------------------------*/

	/**
	 * ���T�C�Y�C�x���g
	 * @method addEventResize
	 * @return {LiquidSlider}
	 */
	p.addEventResize = function(){
		var self = this;

		$(window)
		.on('resize.LiquidSlider', function(){
			self.setStyle();
			self.timerStop();
			self.param.resizeCall(self.param);
		})
		.on('resizestop.LiquidSlider', function(){
			self.timerStart();
			self.param.resizeStopCall(self.param);
		});

		return self;
	};


  /**
   * �t���b�N�C�x���g
   * @method addEventFlick
   * @return {LiquidSlider}
   */
	p.addEventFlick = function(){
		var self = this;

		self.param.$items
		.on('flickmoveX.LiquidSlider', function(event){
			self._move(event.moveX);
		})
		.on('flickcancel.LiquidSlider', function(){
			self._moveCenter();
		})
		.on('flickX.LiquidSlider', function(event){
			if(0 < event.moveX){
				self.prev();
			} else {
				self.next();
			}
		})

		return self;
	};


	/**
	 * �l�N�X�g�{�^���C�x���g
	 * @method addEventNext
	 * @param {jQuery} $trigger �g���K�[�v�f
	 * @return {LiquidSlider}
	 */
	p.addEventNext = function($trigger){
		var self = this;
		$trigger.on('click.LiquidSlider', function(){
			self.next();
			return false;
		});

		return self;
	};


	/**
	 * �v���u�{�^���C�x���g
	 * @method addEventPrev
	 * @param {jQuery} $trigger �g���K�[�v�f
	 * @return {LiquidSlider}
	 */
	p.addEventPrev = function($trigger){
		var self = this;

		$trigger.on('click.LiquidSlider', function(){
			self.prev();
			return false;
		});

		return self;
	};


	/**
	 * �y�[�W���[�{�^���C�x���g
	 * @method addEventPrev
	 * @param {jQuery} $trigger �g���K�[�v�f
	 * @return {LiquidSlider}
	 */
	p.addEventPager = function($trigger){
		var self = this;

		$trigger.on('click.LiquidSlider', function(){
			self.moveTo($trigger.index(this));
			return false;
		});

		return self;
	};


	/**
	 * �^�C�}�[�X�^�[�g
	 * @method timerStart
	 * @param  {Number} num �Z�b�g����^�C�}�[�l(�ȗ���)
	 * @return {LiquidSlider}
	 */
	p.timerStart = function(num){
		var self = this;

		if(amp.isNumber(num)){
			self.param.timer = num;
		}

		self.timerStop();

		if(0 < self.param.timer){
			self.param.timerId = setTimeout(function(){
				self.next();
			}, self.param.timer + self.param.duration);
		}

		return self;
	};


	/**
	 * �^�C�}�[��~
	 * @method timerStop
	 * @return {LiquidSlider}
	 */
	p.timerStop = function(){
		clearTimeout(this.param.timerId);
		return this;
	};


	/* controllers
	-----------------------------------------------------------------*/

	/**
	 * ���փX���C�h
	 * @method next
	 * @return {LiquidSlider}
	 */
	p.next = function(){
		this._controller(1);
		return this;
	};


	/**
	 * �O�փX���C�h
	 * @method prev
	 * @return {LiquidSlider}
	 */
	p.prev = function(){
		this._controller(-1);
		return this;
	};


	/**
	 * �w�肵���X���C�h�C���f�b�N�X�փX���C�h
	 * @method moveTo
	 * @param  {Number} num �w�肵���X���C�h�C���f�b�N�X
	 * @return {LiquidSlider}
	 */
	p.moveTo = function(num){
		if(amp.isNumber(num) && num < this.param.originalLength){
			this._controller(num - this.param.current);
		}
		return this;
	};



	/**
	 * �R���g���[���[
   * @private
	 * @method _controller
	 * @param  {Number} step �X���C�h����X�e�b�v��
	 * @return {LiquidSlider}
	 */
	p._controller = function(step){
		var self = this;

		if(!self.param.isAnimate){
			var next = self.param.current + step;

			if(next < 0){
				self.param.current = self.param.originalLength - 1;
			} else if(next > self.param.originalLength - 1){
				self.param.current = 0;
			} else {
				self.param.current = next;
			}

			$.sequence(
				function(){
					self.param.isAnimate = true;
					self.timerStop();
				},
				function(){
					self._active(step);
					return self._tween(step);
				},
				function(){
					self.timerStart();
					self.param.isAnimate = false;
				}
			)


		};

		return self;
	};


	/* views
	-----------------------------------------------------------------*/

	/**
	 * �X���C�h�A�C�e���̐���
	 * @private
	 * @method _createSlideItems
	 * @return {LiquidSlider}
	 */
	p._createSlideItems = function(){
		var slideHTML = this.param.$slide[0].innerHTML,
		print = slideHTML,
		i = 0;

		for(; i < this.param.clone; i += 1){
			print += slideHTML;
		}
		this.param.$slide[0].innerHTML = print;
		this.param.$items = this.param.$slide.children();

		return this;
	};


	/**
	 * �|�C���^�[�̐���
	 * @private
	 * @method _createPointer
	 * @return {LiquidSlider}
	 */
	p._createPointer = function(){
		if(this.param.$pointer[0]){
			var pointerHTML = this.param.$pointer[0].innerHTML,
			print = '',
			i = 0;

			for(; i < this.param.originalLength; i += 1){
				print += pointerHTML;
			}
			this.param.$pointer[0].innerHTML = print;
		}

		return this;
	};


	/**
	 * �A�N�e�B�u�ȗv�f�ɃN���X��U��܂�
	 * @private
	 * @method _active
	 * @return {LiquidSlider}
	 */
	p._active = function(step){
		step = amp.isNumber(step) ? step : 0;

		// pointer
		if(this.param.$pointer[0]){
			this.param.$pointer.children().removeClass(this.param.activeClass)
			.eq(this.param.current).addClass(this.param.activeClass);
		}

		// thumbnail
		if(this.param.$thumbnail[0]){
			this.param.$thumbnail.removeClass(this.param.activeClass)
			.eq(this.param.current).addClass(this.param.activeClass);
		};

		// next
		if(this.param.current === this.param.originalLength - 1){
			this.param.$next.addClass(this.param.activeClass);
		} else {
			this.param.$next.removeClass(this.param.activeClass);
		}

		// prev
		if(this.param.current === 0){
			this.param.$prev.addClass(this.param.activeClass);
		} else {
			this.param.$prev.removeClass(this.param.activeClass);
		}

		// items
		this.param.$slide.children().removeClass(this.param.activeClass)
		.eq(this.param.originalLength + step)
		.addClass(this.param.activeClass);

		return this;
	};


	/**
	 * x�l���փX���C�h
	 * @method _move
	 * @param  {Number} x �X���C�h����x���W�l
	 * @return {LiquidSlider}
	 */
	p._move = function(x){
		this.param.$slide.css({left: this.param.position + x});
		return this;
	};


	/**
	 * �Z���^�[�|�W�V�����փX���C�h�A�j���[�V����
	 * @method _moveCenter
	 * @return {LiquidSlider}
	 */
	p._moveCenter = function(){
		this.param.$slide.stop().animate({left: this.param.position}, 100, this.param.ease);
		return this;
	};


	/**
	 * �X���C�h�A�j���[�V���������s
	 * @private
	 * @method _active
	 * @return {jQuery.Deferred}
	 */
	p._tween = function(step){
		var self = this;

		return $.sequence(

			// �X���C�h�O�̃R�[���o�b�N�����s
			function(){
				return self.param.tweenStartCall(self.param);
			},

			// �X���C�h�ƃR�[���o�b�N�����s
			function(){
				self.param.tweenCall(self.param);

				var x = self.param.position + (self.param.distance * step * -1);
				return self.param.$slide.stop().animate({left: x}, self.param.duration, self.param.ease);
			},

			// �v�f�̃Z���^�����O�ƃX���C�h�����R�[���o�b�N�����s
			function(){
				var $slide = self.param.$slide,
				$items = $slide.children();

				if(0 < step){
					$slide.css({left: self.param.position}).append($items.slice(0, step));
				} else {
					$slide.css({left: self.param.position}).prepend($items.slice(self.param.length + step));
				}

				return self.param.tweenEndCall(self.param);
			}
		);
	};



	/*--------------------------------------------------------------------------
		exports
	--------------------------------------------------------------------------*/

	exports.LiquidSlider = LiquidSlider;



}(jQuery, amp, common));
