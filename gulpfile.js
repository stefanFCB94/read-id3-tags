var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function() {
    var tsResult = gulp.src(['src/**/*.ts', '!src/**/*.spec.ts']) // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('test', ['scripts'], function() {
    var tsResult = gulp.src('src/**/*.spec.ts') // or tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.ts', ['test']);
});
