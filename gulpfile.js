// Require Gulp first!
const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const { src, task } = require("gulp");
const eslintrc = require("gulp-eslint");
const terser = require("gulp-terser");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const prettyError = require("gulp-prettyError");

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

// Task to compiling and
gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});

// Task to watch for changes to CSS files
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("scripts"));

  done();
});

// Load browsersync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.task("lint", function() {
    task("default", () => {
      return src(["scripts/*.js"])
        .pipe(eslintrc())
        .pipe(eslintrc.format())
        .pipe(eslintrc.failAfterError());
    });
  });

  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on("change", browserSync.reload);
  done();
});

gulp.watch(["build/css/*.css", "script.js"]).on("change", browserSync.reload);
// Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));
