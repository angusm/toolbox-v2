const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('clear-closure', () => {
  exec('rm -rf ./lib/closure/toolbox');
});

gulp.task('clear-commonjs', () => {
  exec('rm -rf ./lib/commonjs/toolbox');
});

gulp.task('clear-es6', () => {
  exec('rm -rf ./lib/es6/toolbox');
});

gulp.task('compile-closure', () => {
  exec('cd ./lib/closure; tsickle');
});

gulp.task('compile-commonjs', () => {
  exec('tsc -p ./lib/commonjs');
});

gulp.task('compile-es6', () => {
  exec('tsc -p ./lib/es6');
});

gulp.task('clear', ['clear-closure', 'clear-commonjs', 'clear-es6']);
gulp.task('compile', ['compile-closure', 'compile-commonjs', 'compile-es6']);

gulp.task('default', ['clear', 'compile']);
