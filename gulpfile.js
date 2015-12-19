var gulp = require('gulp'),
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	clean = require('gulp-clean'),
	browserSync = require("browser-sync"),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	reload = browserSync.reload;

var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "Frontend_Coder"
};

//Очищаем dist

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

// Собираем html из Jade

gulp.task('jade', function() {
	gulp.src(['app/jade/*.jade', '!app/jade/_*.jade'])
		.pipe(jade({
			pretty: true
		}))
		.on('error', console.log)
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream: true}));
});


//stylus

gulp.task('stylus', function() {
	gulp.src('app/stylus/*.styl')
		.pipe(stylus())
		.on('error', console.log)
		.pipe(autoprefixer())
		.pipe(gulp.dest('dist/css/'))
		.pipe(reload({stream: true}));
});

//перемещаем файлы

gulp.task('transfer-files', function() {

	gulp.src('app/bower_components/html5shiv/dist/html5shiv.js')
		.pipe(gulp.dest('dist/js'));

});

//images

gulp.task('images', function() {
	gulp.src('./app/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))

});


// Локальный сервер для разработки

gulp.task('webserver', function () {
	browserSync(config);
});


// Запуск сервера разработки gulp watch

gulp.task('watch', function() {

	gulp.watch('app/stylus/**/*.styl', function() {
		gulp.run('stylus');
	});
	gulp.watch('app/jade/**/*.jade', function() {
		gulp.run('jade');
	});

});

//build task

gulp.task('build', [ 'jade', 'stylus', 'transfer-files'], function() {});

//default task

gulp.task('default', [ 'build', 'webserver', 'watch'], function() {});

