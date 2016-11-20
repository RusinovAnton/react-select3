const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const react = require('gulp-react');
const uglify = require('gulp-uglify');

gulp.task('transform', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(react({ harmony: false, es6module: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', () => {
  gulp.src(['src/**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('dist', ['lint'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(react({ harmony: false, es6module: true }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['transform']);
