const path = require('path');
const pump = require('pump');

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const notify = require("gulp-notify");
const autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    index: 'index.html',
    livereload: true
  });
});

gulp.task('html', function(){
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
    .pipe(connect.reload())
});

gulp.task('less', function() {
    return gulp.src('src/less/main.less')
        .pipe(less({
          paths: [ path.join(__dirname,'src','less','includes') ]
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 7 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});

gulp.task('js', function(cb) {
    var polyfill = path.relative(__dirname, path.join(require.resolve("babel-polyfill"), "../..", "dist/polyfill.min.js"));
    pump([
        gulp.src([polyfill, 'src/js/*.js']),
        babel({ presets: ['env'] }),
        uglify(),
        gulp.dest('build'),
        connect.reload()
    ], cb );
});

gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('build/assets'))
        .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/assets/**/*', ['assets']);
  gulp.watch('src/lang/**/*', ['html']);
});


gulp.task('build', ['less', 'js', 'assets', 'html']);
gulp.task('live', ['connect', 'less', 'js', 'assets', 'html', 'watch']);