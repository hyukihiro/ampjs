/*--------------------------------------------------------------------------
	Load: 追加のみ、削除は無しない。
--------------------------------------------------------------------------*/
/**
 * gulp: Load
 */
var gulp = require('gulp');


/**
 * plugins: プラグインリスト
 */
var plugins = {
	browserSync : require('browser-sync'),
  concat      : require('gulp-concat'),
	rimraf      : require('rimraf'),
	declare     : require('gulp-declare'),  // for handlebars
	fs          : require('fs'),
	handlebars  : require('gulp-handlebars'),
	header      : require('gulp-header'), // header comment
	imagemin    : require('gulp-imagemin'),
	jshint      : require('gulp-jshint'),
	sass        : require('gulp-ruby-sass'),
  uglify      : require('gulp-uglify'),
	map         : require('map-stream'), // for JSHint
	pleeease    : require('gulp-pleeease'),
	plumber     : require('gulp-plumber'),
	rename      : require('gulp-rename'),
	typescript  : require('gulp-tsc'),
	watch       : require('gulp-watch'),
	// cssDoc      : require('gulp-styledocco'),
	jsDoc       : require('gulp-yuidoc')
};



/*--------------------------------------------------------------------------
	Project: ここでプロジェクト設定
--------------------------------------------------------------------------*/
/**
 * project: プロジェクト名
 */
var project = 'amp';


/**
 * path: フォルダパス設定
 */
var path = {
	develop: 'develop/', // 開発用
	html   : 'html/', // 公開用
	docs   : 'html/docs/' // ドキュメント用
};


/**
 * defaults: デフォルトタスク設定
 */
var tasks = [
	'imagemin',
	// 'sass',
	'css',
	// 'ts',
	// 'handlebars',
	'js',
	'copy'
];


/**
 * banner: バナー
 */
var banner = plugins.fs.readFileSync('banner.txt', 'utf8');


/**
 * pleeeaseOptions： css prefix調整
 */
var pleeeaseOptions = {
	fallbacks: {
		autoprefixer: ['last 2 version', 'ie 8', 'ie 9', 'Android 2.3']
	},
	optimizers: {
		minifier: false,
		mqpacker: false
	}
};


/**
 * images: 圧縮画像リスト
 */
var imgs = [
	'*.gif',
	'*.png',
	'*.jpg',
	'*.jpeg'
];


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
	// '*.css',
	// '*.scss',
	// '*.hbs',
	// '*.js',
	// '*.ts',
	// '*.gif',
	// '*.png',
	// '*.jpg',
	// '*.jpeg',
	'*.svg',
	'*.ico',
	'*.swf',
	'*.pdf',
	'*.mp3',
	'*.mp4',
	'*.ogv',
	'*.zip',
	'.htaccess'
];


/*--------------------------------------------------------------------------
	Task
--------------------------------------------------------------------------*/
/**
 * default: 開発用
 * cmd    : gulp
 */
gulp.task('default', tasks, function(){
	return gulp.start(['browserSync', 'watch']);
});


/**
 * html: リリース用
 * cmd : gulp html
 */
gulp.task('html', ['clean'], function(){
	return gulp.start(tasks);
});


/**
 * docs: ドキュメントの書き出し
 * cmd : gulp docs
 */
gulp.task('docs', function(){
	// amp
  gulp.src(path.develop + 'src/amp/**/*.js')
    .pipe(plugins.jsDoc())
    .pipe(gulp.dest('docs/amp/'));

  // jquery
  gulp.src(path.develop + 'src/jquery-plugins/**/*.js')
    .pipe(plugins.jsDoc())
    .pipe(gulp.dest('docs/jquery-plugins/'));

	// CssDocs
	if(plugins.cssDoc){
		gulp.src('develop/**/*.scss')
			.pipe(plugins.cssDoc({
				out: path.docs + 'scss/',
				name: project
			})
		);
	}
});




/*--------------------------------------------------------------------------
	Task Plugins
--------------------------------------------------------------------------*/

/**
 * watch: ファイル監視
 */
gulp.task('watch', function(){
	// browserSync.reload
	gulp.watch([path.html + '**']).on('change', function(file){
		plugins.browserSync.reload();
	});

	// css
	// gulp.watch(path.develop + '**/*.scss', ['sass']);
	gulp.watch(path.develop + '**/*.css', ['css']);

	// js
	// gulp.watch(path.develop + '**/*.ts', ['ts']);
	// gulp.watch(path.develop + '**/*.hbs', ['handlebars']);
	gulp.watch(path.develop + '**/*.js', ['js']);

	// imagemin
	for(var i = 0; i < imgs.length; i += 1){
		gulp.watch(path.develop + '**/' + imgs[i], ['img']);
	}

	// copy
	for(var j = 0; j < copy.length; j += 1){
		gulp.watch(path.develop + '**/' + copy[j], ['copy']);
	}
});


/**
 * browserSync:
 */
gulp.task('browserSync', function(){
	plugins.browserSync({
		proxy: project,
		host :project,
		root: path.html,
		port: 80
	});
});


/**
 * clean: ディレクトリ削除
 */
gulp.task('clean', function(cb){
	plugins.rimraf('./html', cb);
});


/**
 * copy: ファイルコピー
 */
gulp.task('copy', function(){
	for(var i = 0; i < copy.length; i += 1){
		gulp.src(path.develop + '**/' + copy[i])
			.pipe(gulp.dest(path.html));
	}
});


/**
 * imagemin: 画像圧縮
 */
gulp.task('imagemin', function(){
	for(var i = 0; i < imgs.length; i += 1){
		gulp.src(path.develop + '**/' + imgs[i])
			.pipe(plugins.imagemin())
			.pipe(gulp.dest(path.html));
	}
});


/**
 * sass: sassコンパイル
 */
gulp.task('sass', function(){
	gulp.src(path.develop + '**/*.scss')
		.pipe(plugins.sass({style: 'expanded'}))
		.pipe(plugins.plumber())
		.pipe(plugins.pleeease(pleeeaseOptions))
		.pipe(gulp.dest(path.html));
});


/**
 * css: cssプレフィックス & コピー
 */
gulp.task('css', function(){
	gulp.src(path.develop + '**/*.css')
		.pipe(plugins.pleeease(pleeeaseOptions))
		.pipe(gulp.dest(path.html));
});


/**
 * typescript: typescriptコンパイル
 */
gulp.task('ts', function(){
	gulp.src(path.develop + '**/*.ts')
		.pipe(plugins.typescript())
		.pipe(plugins.plumber()) // これ動いてる？
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html));
});


/**
 * hbs: handlebarsコンパイル
 */
gulp.task('hbs', function(){
	gulp.src(path.develop + '**/*.hbs')
		.pipe(plugins.handlebars())
    .pipe(plugins.declare({namespace: 'JST'}))
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html));
});


/**
 * js: jsHint & コピー
 */
gulp.task('js', function(){
	// lint
	gulp.src(path.develop + 'js/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter);

	gulp.src(path.develop + 'src/snippet/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter);

	gulp.src(path.develop + 'src/jquery-plugins/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter);

	// copy
	gulp.src(path.develop + 'js/*.js')
		.pipe(gulp.dest(path.html + 'js/'));

	gulp.src(path.develop + 'src/lib/**/*.js')
		.pipe(gulp.dest(path.html + 'src/lib/'));

	// snippet
	gulp.src(path.develop + 'src/snippet/*.js')
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/snippet/'));

	// jquery-plugins
	gulp.src(path.develop + 'src/amp/jquery-plugins/*.js')
		.pipe(plugins.concat('jquery.plugins.js'))
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/jquery-plugins/'))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.uglify())
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/jquery-plugins/'));

	// amp
	gulp.src(path.develop + 'src/amp/**/*.js')
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/'));

	// amp
	gulp.src(path.develop + 'src/amp/*.js')
		.pipe(plugins.concat('amp.min.js'))
		.pipe(plugins.uglify())
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/'));

	// amp.utilitys
	gulp.src(path.develop + 'src/amp/utilitys/*.js')
		.pipe(plugins.concat('amp.utilitys.js'))
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/utilitys/'))
		.pipe(plugins.rename({basename: 'amp.utilitys.min'}))
		.pipe(plugins.uglify())
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/utilitys/'));

	// amp.jquery
	gulp.src(path.develop + 'src/amp/jquery/*.js')
		.pipe(plugins.concat('amp.jQuery.js'))
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/jquery/'))
		.pipe(plugins.rename({basename: 'amp.jQuery.min'}))
		.pipe(plugins.uglify())
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/jquery/'));

	// amp.createjs
	gulp.src(path.develop + 'src/amp/createjs/*.js')
		.pipe(plugins.concat('amp.createjs.js'))
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/createjs/'))
		.pipe(plugins.rename({basename: 'amp.createjs.min'}))
		.pipe(plugins.uglify())
		.pipe(plugins.header(banner))
		.pipe(gulp.dest(path.html + 'src/amp/createjs/'));

});


/**
 * reporter: JSHintエラー書き出し
 */
plugins.jshint.reporter = plugins.map(function(file, cb){
	if(!file.jshint.success){
		console.log('\n#############   JSHint Error （＠｀ □ ´）=З   #############\n');
		console.log('FILE: '+ file.path);
		file.jshint.results.forEach(function(e){
			if(e){
				var key;
				for(key in e.error){
					console.log(key.toUpperCase() + ': ' + e.error[key]);
				}
			}
		});
		console.log('\n');
	}
	cb(null, file);
});
