const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const react = require('gulp-react');
const uglify = require('gulp-uglify');
var docs = require('gulp-react-docs');

gulp.task('docs', function() {
  return gulp.src('./dist/components/**/*.js')
    .pipe(docs({ path: './docs' }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('transform', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(react({ harmony: false, es6module: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', () => {
  gulp.src(['./src/**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('dist', ['transform', 'lint']);

gulp.task('default', ['transform']);
