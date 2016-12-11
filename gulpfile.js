const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const react = require('gulp-react');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');


gulp.task('styles', () => {
    return gulp.src('./src/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'))
})

gulp.task('docs', (cb) => {
    return gulp.src(['README.md', './dist/**/*.js'], { read: false })
        .pipe(jsdoc(cb))
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

gulp.task('dist', ['transform', 'styles', 'lint']);

gulp.task('watch', ['styles', 'transform'], () => {
    gulp.watch('./src/styles.scss', ['styles'])
    gulp.watch('./src/**/*.js', ['transform'])
})

gulp.task('default', ['transform']);
