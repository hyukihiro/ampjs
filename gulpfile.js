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
	proxy   : '/sample/',   // URL
	develop : 'develop/',  // 開発用
	httpdocs: 'httpdocs/', // 公開用
	src     : 'src/',      // ライブラリソース用
	docs    : 'docs/'      // ドキュメント用
};


/**
 * MODULE: 読み込むプラグインリスト
 * ※使用しないプラグインはコメントアウト
 */
var MODULE = {
	gulp         : require('gulp'),
	browserSync  : require('browser-sync'),
	concat       : require('gulp-concat'),
	fs           : require('fs'),
	header       : require('gulp-header'), // header comment
	imagemin     : require('gulp-imagemin'),
	jshint       : require('gulp-jshint'),
	jshintStylish: require('jshint-stylish'),
	// sass         : require('gulp-ruby-sass'),
	uglify       : require('gulp-uglify'),
	pleeease     : require('gulp-pleeease'),
	plumber      : require('gulp-plumber'),
	rename       : require('gulp-rename'),
	watch        : require('gulp-watch'),
	jsDoc        : require('gulp-yuidoc')
	// glob         : require('glob'), // for sass-includes
	// path         : require('path'), // for sass-includes
	// declare      : require('gulp-declare'),  // for handlebars
	// handlebars   : require('gulp-handlebars'),
	// ts           : require('gulp-tsc'),
	// ejs          : require('gulp-ejs'),
	// minCss       : require('gulp-minify-css'),
	// rimraf       : require('rimraf') // ファイル削除
};


/**
 * tasks: タスク設定
 * ※MODULEで読み込んだプラグインを見て自動的に追加
 */
var tasks = (function(){
	var
	tasks   = ['watch', 'browserSync', 'imagemin', 'css', 'js', 'copy'],
	options = ['sass', 'ejs',	'ts', 'handlebars'];

	for(var i = 0; i < options.length; i += 1){
		if(MODULE[options[i]]){
			tasks.push(options[i]);
		}
	}
	return tasks;
}());


/**
 * copy： copyファイルリスト
 */
var copy = [
	'*.md',
	'*.txt',
	'*.htm',
	'*.html',
	'*.php',
	'*.inc',
	'*.xml',
	'*.json',
	'*.ico',
	'*.swf',
	'*.pdf',
	'*.mp3',
	'*.mp4',
	'*.ogv',
	'*.webm',
	'*.zip',
	'.htaccess',
	// '*.css',
	// '*.scss',
	// '*.hbs',
	// '*.js',
	// '*.ts',
	// '*.gif',
	// '*.png',
	// '*.jpg',
	// '*.jpeg',
	// '*.svg'
];


/**
 * syncFiles: browserSync監視ファイル
 */
var syncFiles = [
	PATH.httpdocs + '**/*.html',
	PATH.httpdocs + '**/*.inc',
	PATH.httpdocs + '**/*.php',
	PATH.httpdocs + '**/*.css',
	PATH.httpdocs + '**/*.js'
];


/**
 * LICENCE: jsコピーライトコメント
 */
var LICENCE = MODULE.fs.readFileSync('LICENCE.txt', 'utf8');


/* options
-----------------------------------------------------------------*/

/**
 * pleeeaseOptions： css prefix調整
 */
var pleeeaseOptions = {
	browsers  : ['last 2 version', 'ie 8', 'ie 9', 'Android 4'],
	sourcemaps: false,
	mqpacker  : false,
	minifier  : false
};


/**
 * sassOptions: sassオプション
 */
var sassOptions = {
	// noCache: true,
	style  : 'expanded'
};



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
  MODULE.gulp.src(PATH.develop + 'src/amp/**/*.js')
    .pipe(MODULE.jsDoc())
    .pipe(MODULE.gulp.dest(PATH.docs));

	// MODULE.gulp.src('develop/**/*.js')
	// 	.pipe(MODULE.jsDoc())
	// 	.pipe(MODULE.gulp.dest(PATH.docs + 'js/'));

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

	// imagemin
	MODULE.gulp.watch([
		PATH.develop + '**/*.jpg',
		PATH.develop + '**/*.jpeg',
		PATH.develop + '**/*.png',
		PATH.develop + '**/*.gif',
		PATH.develop + '**/*.svg'
	], ['imagemin']);

	// copy
	for(var j = 0; j < copy.length; j += 1){
		MODULE.gulp.watch(PATH.develop + '**/' + copy[j], ['copy']);
	}

	// js
	MODULE.gulp.watch(PATH.develop + '**/*.js', ['js']);

	// css
	MODULE.gulp.watch(PATH.develop + '**/*.css', ['css']);

	// sass
	if(MODULE.sass) MODULE.gulp.watch(PATH.develop + '**/*.scss', ['sass']);

	// handlebars
	if(MODULE.handlebars) MODULE.gulp.watch(PATH.develop + '**/*.hbs', ['handlebars']);

	// typescript
	if(MODULE.ts) MODULE.gulp.watch(PATH.develop + '**/*.ts', ['ts']);

	// ejs
	if(MODULE.ejs){
		MODULE.gulp.watch(PATH.develop + '**/*.ejs', function(){
			var json = JSON.parse(plugins.fs.readFileSync(PATH.develop + 'ejs.config.json'));
			MODULE.gulp.src([PATH.develop + '**/*.ejs'])
				.pipe(MODULE.plumber())
				.pipe(MODULE.ejs(json))
				.pipe(MODULE.rename({extname: '.html'}))
				.pipe(MODULE.gulp.dest(PATH.httpdocs));
		});
	}
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
		root : PATH.httpdocs,
		port : 80
	});
});


/**
 * clean: ディレクトリ削除
 */
MODULE.gulp.task('clean', function(cb){
	MODULE.rimraf('./httpdocs', cb);
});


/**
 * copy: ファイルコピー
 */
MODULE.gulp.task('copy', function(){
	for(var i = 0; i < copy.length; i += 1){
		MODULE.gulp.src(PATH.develop + '**/' + copy[i])
		.pipe(MODULE.gulp.dest(PATH.httpdocs));
	}
});


/**
 * ejs: jstemplate
 */
MODULE.gulp.task('ejs', function(e){
	var json = JSON.parse(MODULE.fs.readFileSync(PATH.develop + 'ejs.config.json'));
	MODULE.gulp.src([PATH.develop + '**/*.ejs'])
	.pipe(MODULE.plumber())
	.pipe(MODULE.ejs(json))
	.pipe(MODULE.rename({extname: '.html'}))
	.pipe(MODULE.gulp.dest(PATH.httpdocs));
});


/**
 * imagemin: 画像圧縮
 */
MODULE.gulp.task('imagemin', function(){
	MODULE.gulp.src(PATH.develop + '**/*.+(jpg|jpeg|png|gif|svg)')
	.pipe(MODULE.plumber())
	.pipe(MODULE.imagemin())
	.pipe(MODULE.gulp.dest(PATH.httpdocs));
});


/**
 * sass: sassコンパイル
 */
MODULE.gulp.task('sass', function(){
	MODULE.gulp.src(['**/*.scss'], {base: PATH.develop})
	.pipe(MODULE.plumber())
	.pipe(MODULE.sass(sassOptions))
	.pipe(MODULE.pleeease(pleeeaseOptions))
	.pipe(MODULE.gulp.dest(PATH.httpdocs));
});


/**
 * css: cssプレフィックス & コピー
 */
MODULE.gulp.task('css', function(){
	MODULE.gulp.src(PATH.develop + '**/*.css')
	.pipe(MODULE.plumber())
	.pipe(MODULE.pleeease(pleeeaseOptions))
	.pipe(MODULE.gulp.dest(PATH.httpdocs));
});


/**
 * ts: typescriptコンパイル
 */
MODULE.gulp.task('ts', function(){
	MODULE.gulp.src(PATH.develop + '**/*.ts')
	.pipe(MODULE.plumber())
	.pipe(MODULE.typescript())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs));
});


/**
 * hbs: handlebarsコンパイル
 */
MODULE.gulp.task('hbs', function(){
	MODULE.gulp.src(PATH.develop + '**/*.hbs')
	.pipe(MODULE.plumber())
	.pipe(MODULE.handlebars())
  .pipe(MODULE.declare({namespace: 'JST'}))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs));
});


/**
 * js: jsHint & コピー
 */
MODULE.gulp.task('js', function(){
	// src
	MODULE.gulp.src(PATH.src + 'libs/*.js')
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/libs'));

	// src jquery.plugins.js
	MODULE.gulp.src(PATH.src + 'libs/jquery.plugins/*.js')
	.pipe(MODULE.concat('jquery.plugins.js'))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/libs'));

	// src createjs
	MODULE.gulp.src(PATH.src + 'libs/createjs.plugins/*.js')
	// .pipe(MODULE.concat('createjs.plugins.js'))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/libs/createjs.plugins'));

	// common.js
	MODULE.gulp.src(PATH.develop + 'shared/js/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'shared/js/'));

	// snippet/*.js
	MODULE.gulp.src(PATH.develop + 'src/snippet/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/snippet/'));

	// amp.core.js
	MODULE.gulp.src(PATH.develop + 'src/amp/utilitys/**/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.utilitys.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'))
	.pipe(MODULE.rename({basename: 'amp.utilitys.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'));

	// amp.core.js
	MODULE.gulp.src(PATH.develop + 'src/amp/core/**/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.core.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'))
	.pipe(MODULE.rename({basename: 'amp.core.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'));

	// amp.core.js
	MODULE.gulp.src(PATH.develop + 'src/amp/utilitys/**/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.utilitys.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'))
	.pipe(MODULE.rename({basename: 'amp.utilitys.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'));

	// amp.jquery.plugins.js
	MODULE.gulp.src(PATH.develop + 'src/amp/jquery.plugins/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('jquery.plugins.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'))
	.pipe(MODULE.rename({basename: 'jquery.plugins.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'));

	// amp.jquery.js
	MODULE.gulp.src([
		PATH.develop + 'src/amp/jquery/core/*.js',
		PATH.develop + 'src/amp/jquery/utilitys/*.js'
	])
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.jquery.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'))
	.pipe(MODULE.rename({basename: 'amp.jquery.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'));

	// amp/jquery.plugins/*.js
	MODULE.gulp.src(PATH.develop + 'src/amp/jquery/plugins/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/jquery.plugins/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/jquery.plugins/'));

	// amp.createjs.js
	MODULE.gulp.src([
		PATH.develop + 'src/amp/createjs/core/*.js',
		PATH.develop + 'src/amp/createjs/utilitys/*.js'
	])
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat('amp.createjs.js'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'))
	.pipe(MODULE.rename({basename: 'amp.createjs.min'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/'));

	// amp/createjs.plugins/*.js
	MODULE.gulp.src(PATH.develop + 'src/amp/createjs/plugins/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/createjs.plugins/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE))
	.pipe(MODULE.gulp.dest(PATH.httpdocs + 'src/amp/createjs.plugins/'));
});
