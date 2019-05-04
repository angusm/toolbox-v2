const gulp = require('gulp');
const exec = require('gulp-exec');
const Server = require('karma').Server;

const targets = ['commonjs', 'es6'];

targets.forEach(
    (target) => {
      gulp.task(
          `clear-${target}`,
          () => {
            return gulp
                .src(`./lib/${target}/toolbox`, {allowEmpty: true})
                .pipe(exec(`rm -rf <%= file.path %>`));
          });
    });

targets.forEach(
    (target) => {
      gulp.task(
          `compile-${target}`,
          () => {
            return gulp
                .src(`./lib/${target}`, {allowEmpty: true})
                .pipe(exec(`tsc -p <%= file.path %>`));
          });
    });

targets.forEach(
    (target) => {
      gulp.task(
          `build-${target}`,
          gulp.series(`clear-${target}`, `compile-${target}`));
    });

gulp.task('doc', () => exec(`typedoc; touch docs/.nojekyll`));
gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

const buildTasks = targets.map((target) => `build-${target}`);
gulp.task('default', gulp.parallel(...buildTasks));
