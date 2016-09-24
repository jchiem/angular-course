const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./sass/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./app/*.js", ['babel']).on('change', browserSync.reload);
});

gulp.task("babel", function() {
    return gulp.src("app/entry.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task('default', ['serve', 'babel']);