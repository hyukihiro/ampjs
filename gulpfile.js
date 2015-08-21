/*--------------------------------------------------------------------------
	CONFIG
--------------------------------------------------------------------------*/

/**
 * PACKAGE_JSON: package.json読み込み
 */
var PACKAGE_JSON = require('./package.json');
var YUIDOC_JSON  = require('./yuidoc.json');


/**
 * PROJECT: プロジェクト名
 */
var PROJECT = PACKAGE_JSON.name;


/**
 * PATH: フォルダパス
 */
var PATH = PACKAGE_JSON.path;


/**
 * LICENCE: ライセンス
 */
var LICENCE = require('fs').readFileSync(PATH.license, 'utf8');


/**
 * BANNER: バナーテキスト
 */
var BANNER = PACKAGE_JSON.banner;
BANNER.core.version = YUIDOC_JSON.version;

/**
 * MODULE: モジュール自動追加
 */
var MODULE = {};
Object.keys(PACKAGE_JSON.devDependencies).forEach(function(key){
	var name = key.replace('gulp-', '').split('-').join('_');
	MODULE[name] = require(key);
});


/**
 * tasks: タスク設定
 */
var tasks = ['watch', 'browser_sync', 'js'];


/**
 * syncFiles: browserSync監視対象ファイル
 */
var syncFiles = [
	// PATH.dist + '**/*.html',
	// PATH.dist + '**/*.css',
	PATH.dist + '**/*.js'
];



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
	require('child_process').exec('yuidoc ' + PATH.docs  + ' --config yuidoc.json', {
		"cwd": "./"
	});
});


/**
 * watch: ファイル監視
 */
MODULE.gulp.task('watch', function(){
	// browserSync
	MODULE.gulp.watch(syncFiles)
	.on('change', function(file){
		MODULE.browser_sync.reload();
	});

	// js
	MODULE.gulp.watch(PATH.develop + '**/*.js', ['js']);
});



/*--------------------------------------------------------------------------
	Other Task
--------------------------------------------------------------------------*/

/**
 * browserSync:
 */
MODULE.gulp.task('browser_sync', function(){
	MODULE.browser_sync({
		proxy: PROJECT + PATH.proxy,
		host : PROJECT,
		root : PATH.develop,
		port : 80
	});
});


/**
 * ts: typescriptコンパイル
 */
// MODULE.gulp.task('ts', function(){
// 	MODULE.gulp.src(PATH.develop + '**/*.ts')
// 	.pipe(MODULE.plumber())
// 	.pipe(MODULE.typescript())
// 	.pipe(MODULE.header(LICENCE))
// 	.pipe(MODULE.gulp.dest(PATH.dist));
// });


/**
 * inject: HTMLファイルにjsタグを挿入
 */
MODULE.gulp.task('inject', function(){
	var source = MODULE.gulp.src([
		PATH.dist + 'libs/**/*.js',
		PATH.dist + 'amp/*.min.js',
		PATH.dist + 'amp/utils/*.min.js',
	]);

	MODULE.gulp.src('demo/**/*html')
	.pipe(MODULE.inject(source, {relative: true}))
	// .pipe(MODULE.inject(source.pipe(MODULE.angular_filesort()), {relative: true}))
  .pipe(MODULE.gulp.dest('demo/'));
});


/**
 * js: jsHint & コピー
 */
MODULE.gulp.task('js', function(){

	/* lib
	-----------------------------------------------------------------*/
	// jquery
	MODULE.gulp.src(PATH.develop + 'libs/jquery/*.js')
	.pipe(MODULE.gulp.dest(PATH.dist + 'libs'));

	MODULE.gulp.src(PATH.develop + 'libs/jquery/plugins/**/*.js')
	.pipe(MODULE.concat('jquery.plugins.js'))
	.pipe(MODULE.gulp.dest(PATH.dist + 'libs'));

	// utilitys
	MODULE.gulp.src(PATH.develop + 'libs/utils/**/*.js')
	.pipe(MODULE.concat('utils.js'))
	.pipe(MODULE.gulp.dest(PATH.dist + 'libs'));

	// createjs
	MODULE.gulp.src(PATH.develop + 'libs/createjs/**/*.js')
	.pipe(MODULE.gulp.dest(PATH.dist + 'libs'));


	/* AMP
	-----------------------------------------------------------------*/
	// amp/ amp.js
	 MODULE.gulp.src([
		PATH.develop + 'amp/core/*.js',
		PATH.develop + 'amp/core/base/*.js',
		PATH.develop + 'amp/core/class/**/*.js'
	])
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.delete_lines({filters: [/^\/{3}\s/]}))
	.pipe(MODULE.concat(BANNER.core.name + '-' + BANNER.core.version + '.js'))
	.pipe(MODULE.header(LICENCE, {data: BANNER.core}))
	.pipe(MODULE.template(BANNER.core))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE, {data: BANNER.core}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'));

	// amp/utils/
	 MODULE.gulp.src(PATH.develop + 'amp/core/utils/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.delete_lines({filters: [/^\/{3}\s/]}))
	.pipe(MODULE.rename({prefix : BANNER.core.name + '.'}))
	.pipe(MODULE.header(LICENCE, {data: BANNER.core}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/utils/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE, {data: BANNER.core}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/utils/'));

	// amp/amp.jquery.plugins.js
	MODULE.gulp.src(PATH.develop + 'amp/jquery.plugins/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat(BANNER.jqueryPlugin.name + '-' + BANNER.jqueryPlugin.version + '.js'))
	.pipe(MODULE.delete_lines({filters: [/^\/{3}\s/]}))
	.pipe(MODULE.header(LICENCE, {data: BANNER.jqueryPlugin}))
	.pipe(MODULE.template(BANNER.jqueryPlugin))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE, {data: BANNER.jqueryPlugin}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'));


	// amp/amp.jquery.js
	// class
	MODULE.gulp.src([
		PATH.develop + 'amp/jquery/AMP.$.js',
		PATH.develop + 'amp/jquery/class/**/*.js'
	])
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.concat(BANNER.jquery.name + '-' + BANNER.jquery.version + '.js'))
	.pipe(MODULE.delete_lines({filters: [/^\/{3}\s/]}))
	.pipe(MODULE.header(LICENCE, {data: BANNER.jquery}))
	.pipe(MODULE.template(BANNER.jquery))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'))
	.pipe(MODULE.rename({extname: '.min.js'}))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE, {data: BANNER.jquery}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/'));

	// amp/utils/
	MODULE.gulp.src(PATH.develop + 'amp/jquery/utils/*.js')
	.pipe(MODULE.plumber())
	.pipe(MODULE.jshint())
	.pipe(MODULE.jshint.reporter('jshint-stylish'))
	.pipe(MODULE.delete_lines({filters: [/^\/{3}\s/]}))
	.pipe(MODULE.header(LICENCE, {data: BANNER.jquery}))
	.pipe(MODULE.rename({prefix: BANNER.jquery.name + '.'}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/utils'))
	.pipe(MODULE.uglify())
	.pipe(MODULE.header(LICENCE, {data: BANNER.jquery}))
	.pipe(MODULE.rename({extname : '.min.js'}))
	.pipe(MODULE.gulp.dest(PATH.dist + 'amp/utils'));


	// amp.createjs.js
	// add code

});
