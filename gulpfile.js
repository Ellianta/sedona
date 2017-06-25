var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var autoprefixer = require("gulp-autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function() {
  gulp.src("app/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(autoprefixer({
      browsers: [
         "last 1 version",
         "last 2 Chrome versions",
         "last 2 Firefox versions",
         "last 2 Opera versions",
         "last 2 Edge versions"
      ]
    }))
  .pipe(gulp.dest("app/css"))
  .pipe(minify())
  .pipe(rename("style-min.css"))
  .pipe(gulp.dest("app/css"))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task("serve", ["style"], function(){
  browserSync.init({
    server: "./app"
  });
  gulp.watch("app/less/**/*.less", ["style"]);
  gulp.watch("app/*.html").on("change", browserSync.reload);
});


gulp.task("images", function() {
   return gulp.src("build/img/**/*.{png,jpg,gif}")
   .pipe(imagemin([
     imagemin.optipng({optimizationLevel:3})
   ]))
   .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
    return gulp.src([
      "app/fonts/**/*.{woff,woff2}",
      "app/css/*.css",
      "app/img/**",
      "app/js/**",
      "app/*.html"], {
      base: "./app"  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
   return del("build");
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "style",
    "copy",  
    "images",
    fn
  );
});
