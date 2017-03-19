var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var replace = require('gulp-replace');

var GOEMON_LIVERELOAD_CODE = '  <script src="http://localhost:35730/livereload.js"></script>';
var DEST = 'build/';
var DEST_ASSETS = 'assets/';

gulp.task('scripts', function() {
    return gulp.src([
        'src/js/helpers/*.js',
        'src/js/*.js',
      ])
      .pipe(concat('custom.js'))
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(DEST+'/js'))
      .pipe(browserSync.stream());
});

// TODO: Maybe we can simplify how sass compile the minify and unminify version
var compileSASS = function (filename, options) {
  return sass('src/scss/*.scss', options)
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat(filename))
        .pipe(gulp.dest(DEST+'/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass', function() {
    return compileSASS('custom.css', {});
});

gulp.task('sass-minify', function() {
    return compileSASS('custom.min.css', {style: 'compressed'});
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './production/index.html'
    });
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('production/*.html', browserSync.reload);
  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
  // Watch .scss files
  gulp.watch('src/scss/*.scss', ['sass', 'sass-minify']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);

// Build resources for golang web app (Add livereload code, replace path for goemon)
gulp.task('build', function() {
    gulp.src(['./production/*.html'])
        .pipe(replace('href="../', 'href="/'))
        .pipe(replace('\</head\>', GOEMON_LIVERELOAD_CODE + '\n</head>'))
        .pipe(gulp.dest('./' + DEST_ASSETS));
    gulp.src('./vendors/**').pipe(gulp.dest('./' + DEST_ASSETS + 'vendors/'));
    gulp.src('./build/**/*').pipe(gulp.dest('./' + DEST_ASSETS + 'build/'));
});
