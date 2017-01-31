'use strict';

var path      = require('path');
var gulp      = require('gulp');
var conf      = require('./conf');
var sequence  = require('gulp-sequence');
var replace   = require('gulp-replace');
var revNapkin = require('gulp-rev-napkin');

var $         = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function() {
  // Ignore files that may reference assets. We'll rev them next.
  var ignoreThese = '!' + path.join(conf.paths.dist,'/**/*+(css|js|json|html)');

  return gulp.src([path.join(conf.paths.dist,'/**/*'), ignoreThese])
    .pipe($.rev())
    .pipe(gulp.dest(conf.paths.dist))
    //.pipe(revNapkin({verbose: false}))   // This remove the original images (without revision number)
    .pipe($.rev.manifest(path.join(conf.paths.dist, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
});

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function(){
  var manifest = gulp.src(path.join(conf.paths.dist, "rev-manifest.json"));

  return gulp.src(path.join(conf.paths.dist,'/**/**.{css,js}'))
    .pipe($.revReplace({manifest: manifest}))
    .pipe(gulp.dest(conf.paths.dist))
});

// 3) Rev JS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-js', function(){
  return gulp.src(path.join(conf.paths.dist,'/**/*.js'))
    .pipe($.rev())
    .pipe(gulp.dest(conf.paths.dist))
    //.pipe(revNapkin({verbose: false}))   // This remove the original images (without revision number)
    .pipe($.rev.manifest(path.join(conf.paths.dist, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
});

// 4) Rev CSS files (this is done after assets, so that if a
//    referenced asset hash changes, the parent hash will change as well
gulp.task('rev-css', function(){
  return gulp.src(path.join(conf.paths.dist,'/**/*.css'))
    .pipe($.rev())
    .pipe(gulp.dest(conf.paths.dist))
    //.pipe(revNapkin({verbose: false}))   // This remove the original images (without revision number)
    .pipe($.rev.manifest(path.join(conf.paths.dist, 'rev-manifest.json'), {merge: true}))
    .pipe(gulp.dest(''))
});

// 5) Update asset references in HTML
gulp.task('update-html', function(){
  var manifest = gulp.src(path.join(conf.paths.dist, '/rev-manifest.json'));
  return gulp.src(path.join(conf.paths.dist, '/**/*.html'))
    .pipe($.revReplace({manifest: manifest}))
    .pipe(gulp.dest(conf.paths.dist))
});



// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
gulp.task('rev', function(cb) {
  sequence(
    // 1) Add md5 hashes to assets referenced by CSS and JS files
    'rev-assets',
    // 2) Update asset references with $.reved filenames in compiled css + js
    'rev-update-references',
    // 4) Rev JS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
    'rev-js',
    // 4) Rev CSS files (this is done after assets, so that if a referenced asset hash changes, the parent hash will change as well
    'rev-css',
    // 5) Update asset references in HTML
    'update-html',

    cb)
});