var gulp = require("gulp");

var less = require("gulp-less");
var cmq = require("gulp-combine-mq");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-minify-css");
var rename = require("gulp-rename");

gulp.task("build", function() {
  gulp.src("source/less/style.less")
      .pipe(less())
      .pipe(cmq())
      .pipe(postcss([
        autoprefixer({browsers: "last 2 versions"})
      ]))
      .pipe(rename("style.css"))
      .pipe(gulp.dest("build/css-p"))
      .pipe(minify())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css-p"));
});