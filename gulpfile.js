var gulp = require('gulp'),
connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port:9000
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('./app/*.js')
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(['./app/*.html','./app/*.js'], ['html','js']);
});

gulp.task('serve', ['connect', 'watch']);