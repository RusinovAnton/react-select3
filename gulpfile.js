const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const react = require('gulp-react');
const uglify = require('gulp-uglify');
const jsdoc = require('gulp-jsdoc3');


gulp.task('docs', (cb) => {
    return gulp.src(['README.md', './dist/**/*.js'], {read: false})
        .pipe(jsdoc(cb))
})

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

gulp.task('dist', ['transform', 'lint', 'docs']);

gulp.task('default', ['transform']);
