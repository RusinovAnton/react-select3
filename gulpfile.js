const gulp = require('gulp');

const del = require('del');
const path = require('path');
const runSequence = require('run-sequence');

const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const react = require('gulp-react');

const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');

/**
 * Resolve resources absolute path
 *
 * @param {string} relativePath - resources' relative path
 * @return {string} - resolved path
 */
const pathResolve = relativePath => path.resolve(path.join(__dirname, relativePath));

/** Define package resources paths **/
const paths = {
  dest: pathResolve('./dist'),
  css: pathResolve('./src/styles/**/*.scss'),
  js: pathResolve('./src/**/*.js'),
};

/** Define tasks **/
const cleanTask = () => {
  del.sync(paths.dest)
};

const distTask = () => (done) => {
  runSequence('js', 'css', done)
};

const cssTask = () => gulp.src(paths.css)
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.dest));

const cssLintTask = () => gulp.src(paths.css)
  .pipe(sassLint({ options: { configFile: '.sasslintrc' } }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError());

const jsTask = () => gulp.src(paths.js)
  .pipe(babel())
  .pipe(react({ harmony: false, es6module: true }))
  .pipe(gulp.dest(paths.dest));

const jsLintTask = () => gulp.src([paths.js, '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());


/** Register tasks **/
gulp.task('clean', cleanTask);
gulp.task('dist', ['clean', 'js:lint', 'css:lint'], distTask);

gulp.task('css', cssTask);
gulp.task('css:lint', cssLintTask);

gulp.task('js', jsTask);
gulp.task('js:lint', jsLintTask);

gulp.task('watch', ['css', 'js'], () => {
  gulp.watch('./src/styles/**/*.scss', ['css']);
  gulp.watch('./src/**/*.js', ['js'])
});

gulp.task('default', ['dist']);
