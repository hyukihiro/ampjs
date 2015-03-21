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


/*-----------------------------------------------------
library.slider.js v2.0.4 - 2014.08.12

Copyright(c) INVOGUE.CO,. Ltd. ALL Rights Reserved.
http://www.invogue.co.jp/
-------------------------------------------------------*/

;(function($){


  /**
   * �X���C�_�[
   * @param {jQuery} $wrap   �X���C�_�[���b�p�[�v�f
   * @param {Object} options �I�v�V�����l
   */
	common.slider = function($wrap, options){

    var PARAM = $.extend(true, {}, {
      $frame     : $wrap.find('.inner'),
      $slide     : $wrap.find('.list'),
      $items     : $wrap.find('.list').children(),
      $pointer   : $wrap.find('.pointer li'),
      $thumbnail : $wrap.find('.thumbnail a'),
      $prev      : $wrap.find('.prev a'),
      $next      : $wrap.find('.next a'),
			type       : $wrap.find('.thumbnail')[0] && $wrap.find('.thumbnail').attr('class').match(/all-rover|all-alpha/),
      stageWidth : 0,
      distance   : 0,
      total      : 0,
      max        : 0,
      visible    : 1,
      isAnimate  : false,
      isFlick    : true,
      activeClass: 'active',
      timerId    : null,
			current : 0,
			duration: 500,
			easing  : 'easeOutExpo',
			timer   : 0,
			loop    : false,
      resizeCall: $.noop,
      resizeStopCall: $.noop,
      tweenStartCall: $.noop,
      tweenCall: $.noop,
      tweenStopCall: $.noop
    }, options);


    function Slider(){
      this.param = PARAM;
      this.init();
    }
    var p = Slider.prototype;



		/**
		 * init: ������
		 */
    p.init = function(){
      var self = this;

			// �����l�̐ݒ�
      self.set();

			// ���X�|���V�u���Ή�
			if(PARAM.timer){
				$(window).resize(function(){
					clearTimeout(PARAM.timerId);
				});
			}
			Library.resizeStop(function(){
        self.resetValue();
			}, 100);
		};


		/**
		 * set: �����l�̐ݒ�
		 */
    p.set = function(){
      var self = this;

			// set: value
      PARAM.total = self.getVisibleLength(); // �v�f�̐�
			PARAM.stageWidth = PARAM.$frame.width();                           // �X�e�[�W�̕�
			PARAM.itemWidth = PARAM.$items.outerWidth(true);              // ���X�g�̕�
			PARAM.visible = Math.floor(PARAM.stageWidth / PARAM.itemWidth); // �\����
			PARAM.max = Math.ceil(PARAM.total / PARAM.visible);               // ���X�g�̐�
			PARAM.distance = PARAM.visible * PARAM.itemWidth;                                 // �ړ�����
			PARAM.current = Math.ceil(PARAM.current / PARAM.visible);              // �J�E���g

			// set: style
			PARAM.$slide.css({
				width: PARAM.total * PARAM.itemWidth,
				left : PARAM.distance * PARAM.current * -1
			});
			// set: pointer
			if(PARAM.$pointer[0]) self.setPointer();
			// set: style
      self.resetButton(PARAM.current);
			// set: event
      self.setEvent();

      return self;
		};

    /**
     * getVisibleLength: �\�����Ă��鐔
     */
    p.getVisibleLength = function(){
      //PARAM.total = PARAM.$items.length;
      var count = 0;
      PARAM.$items.each(function(){
        if($(this).css('display') !== 'none'){
          count += 1;
        }
      });

      return count;
    };


		/**
		 * resetValue: �l�̍Đݒ�
		 */
    p.resetValue = function(){
      var self = this;
      self.resetButton(PARAM.current, PARAM.current); // active���j���[�g�����̏�Ԃɂ���

      PARAM.total = self.getVisibleLength();

      var prevVisible = PARAM.visible;
			// reset: value
			PARAM.stageWidth = PARAM.$frame.width();                            // �X�e�[�W�̕�
			PARAM.itemWidth = PARAM.$items.outerWidth(true);								// ���X�g�̕�
			PARAM.visible = Math.floor(PARAM.stageWidth / PARAM.itemWidth);  // �\����
			PARAM.max = Math.ceil(PARAM.total / PARAM.visible);                 // ���X�g�̐�
			PARAM.distance = PARAM.visible * PARAM.itemWidth;;                                  // �ړ�����
			PARAM.current = Math.floor(PARAM.current * prevVisible / PARAM.visible);// �J�E���g
				// reset: style
			PARAM.$slide.css({
				width: PARAM.total * PARAM.itemWidth,
				left : PARAM.distance * PARAM.current * -1
			});
			// reset: pointer
			if(PARAM.$pointer[0])	self.setPointer();
			// reset: style
      self.resetButton(PARAM.current);
			// reset: event
      self.setEvent();

      return self;
		};

		/**
		 * setPointer: pointer�̐ݒ�
		 */
    p.setPointer = function(){
      var self = this;

			var frag = document.createDocumentFragment(),
					elm = PARAM.$pointer[0],
					copy = elm.cloneNode(true),
					wrap = elm.parentNode,
					i = 0, l = PARAM.max;
			for(; i < l; i+=1){
				frag.appendChild(elm.cloneNode(true));
			}
			// pointer�ݒu
			PARAM.$pointer = $(wrap).html(frag).find('li');
			PARAM.$pointer.removeClass(PARAM.activeClass);

      return self;
		};

		/**
		 * timer: �^�C�}�[�@�\
		 */
    p.setTimer = function(){
      var self = this;

			if(PARAM.timerId) clearTimeout(PARAM.timerId);
			PARAM.timerId = setTimeout(function(){
				if(PARAM.max <= 1) return false;
				if(!PARAM.loop && PARAM.current == PARAM.max-1){
					return false;
				}
				var num = PARAM.current == PARAM.max-1 ? 0 : PARAM.current+1;
				self.controller(num, PARAM.current);
			}, PARAM.timer);
		};

		/**
		 * setEvent: �C�x���g�̃Z�b�e�B���O
		 */
    p.setEvent = function(){
      var self = this;

			// timer
	    if(PARAM.timer){
        self.setTimer();
				PARAM.$items.hover(
					function(){ clearTimeout(PARAM.timerId);},
					function(){ self.setTimer();}
				);
	    }

      // flick
      PARAM.$items
      .on('flickmoveX.Slider', function(event){
        if(PARAM.isFlick) {
          self._move(event.moveX);
        }
      })
      .on('flickcancel.Slider', function(){
        if(PARAM.isFlick) {
          self._moveReset();
        }
      })
      .on('flickX.Slider', function(event){
        if(PARAM.isFlick) {
          if (0 < event.moveX) {
            PARAM.$prev.click();
          } else {
            PARAM.$next.click();
          }
        }
      })

	    // prev, next
			if(PARAM.$next[0] || PARAM.$prev[0]){
				PARAM.$next.click(function(){
					if(!PARAM.isAnime){
            if(PARAM.current != PARAM.max-1){
              var num = PARAM.current+1;
              self.controller(num, PARAM.current);
            }
					};
					return false;
				});

				PARAM.$prev.click(function(){
					if(!PARAM.isAnime){
            if(PARAM.current !== 0){
              var num = PARAM.current-1;
              self.controller(num, PARAM.current);
            }
					}
					return false;
				});
			}
			// thumbnail
			if(PARAM.$thumbnail[0]){
				PARAM.$thumbnail.click(function(){
					var num = Math.floor(PARAM.$thumbnail.index(this) / PARAM.visible);
					if(!PARAM.isAnime && PARAM.current != num){
            self.ontroller(num, PARAM.current);
					}
					return false;
				});
			}
			// pointer
			if(PARAM.$pointer.find('a')[0]){
				var $pointer = PARAM.$pointer.find('a');
				$pointer.click(function(){
					var num = $pointer.index(this);
					if(!PARAM.isAnime && PARAM.current != num){
            self.controller(num, PARAM.current);
					}
					return false;
				});
			}
      return self;
		};

    //
    p.moveTo = function(num){
      var self = this,
      num = Math.floor(num / PARAM.visible);
      if(!PARAM.isAnime && PARAM.current != num){
        self.controller(num, PARAM.current);
      }
      return self;
    };


		/**
		 * controller: �֐�����
		 */
    p.controller = function(next, current){
      var self = this;

			if(PARAM.timerId) clearTimeout(PARAM.timerId);
      self.resetButton(next, current);
			PARAM.current = next;
      self.tween();

      return self;
		};

		/**
		 * resetButton: �{�^���̃X�^�C���ύX
		 */
    p.resetButton = function(next, current){
      var self = this;

			// prev next: show hide
			if(PARAM.$prev[0] && PARAM.$next[0]){
				if(PARAM.max <= 1){
					PARAM.$next.hide();
					PARAM.$prev.hide();
				} else if(PARAM.max > 1 && PARAM.loop) {
					PARAM.$next.show();
					PARAM.$prev.show();
				} else if(!PARAM.loop){
					if(next == 0){
				    PARAM.$next.show();
				    PARAM.$prev.hide();
					} else if(next == PARAM.max-1){
				    PARAM.$next.hide();
				    PARAM.$prev.show();
					} else {
				    PARAM.$next.show();
				    PARAM.$prev.show();
					}
		    }
			}
	    // thumbnail: active reset
			if(PARAM.$thumbnail[0]){
				var $active  = PARAM.$thumbnail.slice(next*PARAM.visible, next*PARAM.visible+PARAM.visible),
        $current = PARAM.$thumbnail.slice(current*PARAM.visible, current*PARAM.visible+PARAM.visible);

				if(PARAM.type == 'all-rover'){
					Library.active($active.addClass(PARAM.activeClass).find('img'));
					Library.rollover({$rollover: $current.removeClass(PARAM.activeClass).find('img').removeClass(PARAM.activeClass)});
				} else if(PARAM.type === 'all-alpha'){
					Library.active($active.addClass(PARAM.activeClass).find('img'), {type: 'alpha'});
					Library.rollover({$alpha: $current.removeClass(PARAM.activeClass).find('img').removeClass(PARAM.activeClass)});
				}
			}
			// pointer: active reset
			if(PARAM.$pointer[0]){
			  PARAM.$pointer.eq(next).addClass(PARAM.activeClass);
			  PARAM.$pointer.eq(current).removeClass(PARAM.activeClass);
			}

      return self;
		};

    // �������Ƃ�
    p._move = function(x){
      PARAM.$slide.css({left: -PARAM.distance * PARAM.current + x});
      return this;
    };

    // �������Ƃ�
    p._moveReset = function(){
      PARAM.$slide.css({left: -PARAM.distance * PARAM.current});
      return this;
      //PARAM.$slide.velocity({ left: -PARAM.distance * PARAM.current}, 100, PARAM.easing);
    };

    p.tweenCall = function(){};

		/**
		 * tween: �X���C�h�A�j���[�V����
		 */
    p.tween = function(){
      var self = this;
			PARAM.isAnime = true;

      self.tweenCall();
      PARAM.tweenStartCall(PARAM);
			PARAM.tweenCall(PARAM);

			PARAM.$slide
      .velocity({ left: -PARAM.distance * PARAM.current}, PARAM.duration, PARAM.easing, function(){
				PARAM.isAnime = false;
				if(PARAM.timer)	self.setTimer();
       PARAM.tweenStopCall(PARAM);
			});

      return self;
    };


		return new Slider();
	};


}(jQuery));
