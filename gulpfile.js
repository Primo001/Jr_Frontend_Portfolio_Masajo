const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// Compile SCSS
function styles() {
  return src("scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("css"))
    .pipe(browserSync.stream());
}

// Start BrowserSync
function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  watch("scss/*.scss", styles);
  watch("*.html").on("change", browserSync.reload);
  watch("js/**/*.js").on("change", browserSync.reload);
}

exports.default = series(styles, serve);

// const { watch } = require("gulp");

// function defaultTask(cb) {
//   console.log("Gulp is working!");
//   cb();
// }

// exports.default = defaultTask;
