const babel = require('gulp-babel');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const react = require('gulp-react');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');


gulp.task('styles', () => {
  return gulp.src('./src/styles/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/'))
})

gulp.task('transform', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(react({ harmony: false, es6module: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('lint', () => {
  gulp.src(['./src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', () => {
  del.sync('./dist')
})

gulp.task('dist', (done) => {
  runSequence('clean', 'transform', 'styles', 'lint', done)
});

gulp.task('watch', ['styles', 'transform'], () => {
  gulp.watch('./src/styles/styles.scss', ['styles'])
  gulp.watch('./src/**/*.js', ['transform'])
})

gulp.task('default', ['dist']);
