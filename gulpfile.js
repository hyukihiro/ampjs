/*--------------------------------------------------------------------------
	CONFIG
--------------------------------------------------------------------------*/

/**
 * PROJECT: プロジェクト名
 */
var PROJECT = 'ampjs';


/**
 * PATH: フォルダパス設定
 * ※変更しない
 */
var PATH = {
	proxy   : '/test/',   // develop
	develop : 'develop/', // 開発用
	dist    : 'dist/',    // 配布用
	docsTemp: 'js_docs_temp/',// ドキュメントテンプレート用
	docs    : 'js_docs/'     // ドキュメント用
};


/**
 * MODULE: 読み込むプラグインリスト
 * ※使用しないプラグインはコメントアウト
 */
var MODULE = {
	exec         : require('child_process').exec,
	gulp         : require('gulp'),
	browserSync  : require('browser-sync'),
	concat       : require('gulp-concat'),
	fs           : require('fs'),
	header       : require('gulp-header'), // header comment
	jshint       : require('gulp-jshint'),
	jshintStylish: require('jshint-stylish'),
	uglify       : require('gulp-uglify'),
	plumber      : require('gulp-plumber'),
	rename       : require('gulp-rename'),
	shell        : require('gulp-shell'),
	watch        : require('gulp-watch'),
	jsDoc        : require('gulp-yuidoc')
};


/**
 * tasks: タスク設定
 * ※MODULEで読み込んだプラグインを見て自動的に追加
 */
var tasks = (function(){
	var
	tasks   = ['watch', 'browserSync', 'js'],
	options = ['ejs',	'ts'];

	for(var i = 0; i < options.length; i += 1){
		if(MODULE[options[i]]){
			tasks.push(options[i]);
		}
	}
	return tasks;
}());


/**
 * syncFiles: browserSync監視ファイル
 */
var syncFiles = [
	PATH.dist + '**/*.html',
	PATH.dist + '**/*.css',
	PATH.dist + '**/*.js'
];


/**
 * LICENCE:
 */
var LICENCE = MODULE.fs.readFileSync('LICENCE', 'utf8');



/*--------------------------------------------------------------------------
	Task
--------------------------------------------------------------------------*/

/**
 * default: 開発用
 * cmd    : gulp
 */
MODULE.gulp.task('default', tasks);


/**
 * docs: YUIDOC生成
 * cmd : gulp docs
 */
MODULE.gulp.task('docs', function(){
	// amp
	MODULE.exec('yuidoc develop/amp/ -t docsTemp/yuidoc/yuidoc-bootstrap-theme-custom -H docsTemp/yuidoc/yuidoc-bootstrap-theme-custom/helpers/helpers.js --config ./docsTemp/yuidoc/yuidoc.json', {
		"cwd": "./"
	});

  // MODULE.gulp.src(PATH.develop + 'amp/**/*.js')
  //   .pipe(MODULE.jsDoc.parser())
  //   .pipe(MODULE.jsDoc.reporter())
  //   .pipe(MODULE.jsDoc.generator())
  //   .pipe(MODULE.jsDoc({paths: {docs: ['../js/classes/']}}))
  //   .pipe(MODULE.gulp.dest(PATH.docs));
});


/**
 * watch: ファイル監視
 */
MODULE.gulp.task('watch', function(){
	// browserSync
	MODULE.gulp.watch(syncFiles)
	.on('change', function(file){
		MODULE.browserSync.reload();
	});

	// js
	MODULE.gulp.watch(PATH.develop + '**/*.js', ['js']);

	// typescript
	if(MODULE.ts) MODULE.gulp.watch(PATH.develop + '**/*.ts', ['ts']);

});



/*--------------------------------------------------------------------------
	Other Task
--------------------------------------------------------------------------*/

/**
 * browserSync:
 */
MODULE.gulp.task('browserSync', function(){
	MODULE.browserSync({
		proxy: PROJECT + PATH.proxy,
		host : PROJECT,
		root : PATH.develop,
		port : 80
	});
});


/**
 * ts: typescriptコンパイル
 */
MODULE.gulp.task('ts', function(){
	MODULE.gulp.src(PATH.develop + '**/*.ts')
	.pipe(MODULE.plumber())
	.pipe(MODULE.typescript())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist));
});


/**
 * js: jsHint & コピー
 */
MODULE.gulp.task('js', function(){

	/* lib
	-----------------------------------------------------------------*/
	// jquery
	MODULE.gulp.src(PATH.develop + 'lib/jquery/**/*.js')
	.pipe(MODULE.concat('jquery-1.8.3.pack.js'))
	.pipe(MODULE.gulp.dest(PATH.dist + 'lib'));

	// utilitys
	MODULE.gulp.src(PATH.develop + 'lib/utilitys/**/*.js')
	.pipe(MODULE.concat('utilitys.pack.js'))
	.pipe(MODULE.gulp.dest(PATH.dist + 'lib'));

	// createjs
	MODULE.gulp.src(PATH.develop + 'lib/createjs/**/*.js')
	// .pipe(MODULE.concat('createjs.pack.js'))
	.pipe(MODULE.gulp.dest(PATH.dist + 'lib/createjs'));


	/* snippet/*.js
	-----------------------------------------------------------------*/
	//MODULE.gulp.src(PATH.develop + 'snippet/*.js')
	//.pipe(MODULE.plumber())
	//.pipe(MODULE.jshint())
	//.pipe(MODULE.jshint.reporter('jshint-stylish'))
	//.pipe(MODULE.header(LICENCE))
	//.pipe(MODULE.gulp.dest(PATH.dist + 'snippet/'));


	/* templates/*.js
	-----------------------------------------------------------------*/
	//MODULE.gulp.src(PATH.develop + 'templates/**/*.js')
	//.pipe(MODULE.plumber())
	//.pipe(MODULE.jshint())
	//.pipe(MODULE.jshint.reporter('jshint-stylish'))
	//.pipe(MODULE.gulp.dest(PATH.dist + 'templates/'));


	/* AMP
	-----------------------------------------------------------------*/
	// amp.core.js
	MODULE.gulp.src([
		PATH.develop + 'amp/core/*.js',
		PATH.develop + 'amp/core/base/*.js',
		PATH.develop + 'amp/core/utility/*.js'
	])
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'))
	.pipe(MODULE.rename({basename: 'amp.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'));

	// amp.jquery.js
	// amp/jquery.plugins/*.js
	MODULE.gulp.src(PATH.develop + 'amp/jquery.plugins/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('jquery.plugins.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'));

	// base
	// MODULE.gulp.src([
	// 	PATH.develop + 'amp/jquery/base/*.js',
	// 	PATH.develop + 'amp/jquery/utility/*.js'
	// })
	MODULE.gulp.src(PATH.develop + 'amp/jquery/base/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.jquery.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'))
	.pipe(MODULE.rename({basename: 'amp.jquery.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'));

	// amp.jquery.plugins.js
	/*
	MODULE.gulp.src(PATH.develop + 'amp/jquery/plugins/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/jquery.plugins/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/jquery.plugins/'));
	*/

	// amp.createjs.js
	// MODULE.gulp.src([
	// 	PATH.develop + 'js/amp/createjs/core/*.js',
	// 	PATH.develop + 'js/amp/createjs/utilitys/*.js'
	// ])
	// .pipe(MODULE.plumber())
	// .pipe(MODULE.jshint())
	// .pipe(MODULE.jshint.reporter('jshint-stylish'))
	// .pipe(MODULE.concat('amp.createjs.js'))
	// .pipe(MODULE.header(LICENCE))
	// .pipe(MODULE.gulp.dest(PATH.dist + 'js/amp/'))
	// .pipe(MODULE.rename({basename: 'amp.createjs.min'}))
	// .pipe(MODULE.uglify())
	// .pipe(MODULE.header(LICENCE))
	// .pipe(MODULE.gulp.dest(PATH.dist + 'js/amp/'));

	// // amp/createjs.plugins/*.js
	// MODULE.gulp.src(PATH.develop + 'js/amp/createjs/plugins/*.js')
	// .pipe(MODULE.plumber())
	// .pipe(MODULE.jshint())
	// .pipe(MODULE.jshint.reporter('jshint-stylish'))
	// .pipe(MODULE.header(LICENCE))
	// .pipe(MODULE.gulp.dest(PATH.dist + 'js/amp/createjs.plugins/'))
	// .pipe(MODULE.rename({extname : '.min.js'}))
	// .pipe(MODULE.uglify())
	// .pipe(MODULE.header(LICENCE))
	// .pipe(MODULE.gulp.dest(PATH.dist + 'js/amp/createjs.plugins/'));
});
