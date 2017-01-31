'use strict';

var path    = require('path');
var gulp    = require('gulp');
var conf    = require('./conf');
var connect = require('gulp-connect');


gulp.task('ngdocs', [], function () {
    var gulpDocs = require('gulp-ngdocs');
    var options = {
        html5Mode: false,
        title: "blundert Docs",
    }
    return gulp.src([
        path.join(conf.paths.src, '/app/**/**/*.js')
    ])
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'))
        .pipe(connect.reload());
});


gulp.task('connect', ['ngdocs'], function() {

    connect.server({
        root: 'docs',
        livereload: true,
        fallback: 'docs/index.html',
        port: 8081
    });
});


gulp.task('html:docs', function () {
    gulp.src('docs/*.html')
        .pipe(connect.reload());
});

gulp.task('watch:docs', function () {
    gulp.watch(
        [
            path.join(conf.paths.src, '/app/**/*.js'),
            path.join('!' + conf.paths.src, '/app/scripts/compiled-directives/*.js'),
            path.join('!' + conf.paths.src, '/app/scripts/compiled-controllers/*.js')
        ],
        function(event) {
            gulp.start('ngdocs');
            connect.reload();
        },
        ['html:docs']
    );
});

gulp.task('connect_ngdocs', ['connect', 'watch:docs']);
