const gulp = require('gulp');
const exec = require('child_process').exec;

const targets = ['closure', 'commonjs', 'es6'];

function getCompileCommand(target) {
  if (target === 'closure') {
    return 'cd ./lib/closure; tsickle';
  } else {
    return `tsc -p ./lib/${target}`;
  }
}

targets.forEach((target) => {
  gulp.task(`clear-${target}`, () => exec(`rm -rf ./lib/${target}/toolbox`));
  gulp.task(`compile-${target}`, () => exec(getCompileCommand(target)));
});

gulp.task('clear', targets.map((target) => `clear-${target}`));
gulp.task('compile', targets.map((target) => `compile-${target}`));

gulp.task('default', ['clear', 'compile']);
