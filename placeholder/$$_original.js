(function(root, $){

  // 'use strict';

  var $$;


  /*----------------------------------------------------------------------
    @constructor
  ----------------------------------------------------------------------*/
  /**
   * <h4>debug���O����ʏ�ɏo�͂��܂���</h4>
   *
   * @static
   * @class $$
   * @constructor
   * @return {Void}
   */
	$$ = function(data, mode, style){

		var PARAM = {
			key : 'ivDebug'
		};

		var PROTO = {

			// init ������
			init : function(){
				var $stage = $('#'+PARAM.key);

				if(!$stage.length){
					PROTO.control();
				}else{
					PARAM.$note = $stage.find('textarea');
					PROTO.console();
				}
			}, //init


			// console �l�̏o��
			console : function(){
				//style�ύX
				if(typeof(mode) === 'object'){
					style = mode;
				}

				if(style){
					PARAM.$note.css(style);
				}

				if(data === undefined){
					//���Z�b�g
					PARAM.$note.val('');
					return false;

				} else {

					//�^�ύX
					if(mode){
						try {
							if(typeof(data) === 'object'){
								data = JSON.stringify(data,null,'\t');
							}
						} catch (err) {
						}
					}

					//�o��
					switch (mode) {
					case 0 :
						console.log(data);
						break;
					case 1 :
						PARAM.$note.val(PARAM.$note.val() + data + '\n');
						break;
					case 2 :
						PARAM.$note.val(data + '\n' + PARAM.$note.val());
						break;
					default :
						PARAM.$note.val(data + '\n');
						break;
					}

					return false;
				}
			}, //console


			// control �f�o�b�N�E�B���h�E�̈ړ�����
			control : function(){
				var $html = $('html');
				var _area = false;
				var _x,_y;
				var styles = {
					stage : {
            cursor      : 'all-scroll',
            overflow    : 'hidden',
            position    : 'fixed',
            bottom      : 10,
            left        : 10,
            zIndex      : 9999,
            padding     : 0,
            margin      : 0,
            opacity     : 0.7,
            borderTop   : '15px solid #333',
            borderRadius: 3
					},
					note   : {
            width   : 200,
            height  : 100,
            padding : 5,
            margin  : 0,
            border  : 0,
            color   : '#fff',
            fontSize: '11px',
						backgroundColor: '#000'
					}
				};

				//DOM
				PARAM.$stage = $('<div />').attr({id : PARAM.key}).css(styles.stage);
				PARAM.$note = $('<textarea />').css(styles.note);
				$('body').append(PARAM.$stage);
				PARAM.$stage.append(PARAM.$note);

				// event
				// $note
				PARAM.$note
				.on('mousedown' , function(){
					_area = true;
				}).on('mouseup' , function(){
					_area = false;
				});

				// $stage
				PARAM.$stage
				.on('mousedown' , function(e){
					_x = PARAM.$stage.offset().left - e.pageX;
					_y = PARAM.$stage.offset().top - e.pageY;
					$html.on('mousemove' , winMove);
				})
				.on('mouseup' , function(){
					$html.off('mousemove' , winMove);
				});

				//functions
				function winMove(e){
					if(!_area){
						PARAM.$stage.css({
              left  : e.clientX + _x,
              top   : e.clientY + _y,
              bottom: 'auto'
						});
					}
				}

				return PROTO.console();
			} //control
		};


		PROTO.init();
	};



	/*--------------------------------------------------------------------------
		@property
	--------------------------------------------------------------------------*/

  /**
   * <h4>�o�[�W�������</h4>
   *
   * @static
   * @property VERSION
   * @type {String}
   */
  $$.VERSION = '1.6';



  /*--------------------------------------------------------------------------
    export
  --------------------------------------------------------------------------*/

  root.$$ = $$;


}(window, jQuery));
