'use strict';

var path          = require('path');
var gulp          = require('gulp');
var conf          = require('./conf');
var sequence      = require('gulp-sequence');
var replace       = require('gulp-replace');
var modifyCssUrls = require('gulp-modify-css-urls');

var $             = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty:  true,
      spare:  true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'blundert',
      root:   'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag:     '<!-- inject:partials -->',
    ignorePath:   path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter   = $.filter('*.html');
  var jsFilter     = $.filter('**/*.js');
  var cssFilter    = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets()) // scans the .html files for JS and CSS references
    // .pipe($.rev())
    .pipe(jsFilter)                   // filter all files to retry only js files
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())         //
    .pipe(cssFilter)                  // filter all files to retry only css files
    .pipe(modifyCssUrls({
      modify: function (url, filePath) {
        // check if the url is an asset one or other kind
        var urlArray = url.split("/");
        if(urlArray.indexOf("assets") != -1) {
            return url;
        }
        else {
            var regex   = new RegExp('(([0-9a-zA-Z-])*.(otf|eot|svg|ttf|woff2|woff))', 'g');
            var result  = regex.exec(url);
            result      = result instanceof  Array ? result[0] : result;
            return result !== null ? '../fonts/' + result : url;
        }
      }
    }))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())                 // returns a stream with the asset replaced resulting HTML files
    // .pipe($.revReplace())          // replace reference only in *.html, and only for css and js files
    .pipe(htmlFilter)                 // filter all files to retry only html files
    .pipe($.minifyHtml({
      empty:        true,
      spare:        true,
      quotes:       true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));

});


// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return !file.stat.isDirectory();
  });


  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));


});

gulp.task('serviceworker', function () {
  return gulp
    .src('service-worker/*')
    .pipe(gulp.dest('blundert/'));  
});

gulp.task('clean', function (done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build:dist', function(cb){
  sequence('clean', ['html', 'fonts', 'other', 'serviceworker'], cb);
});

gulp.task('build', function(cb){
  sequence('clean', ['html', 'fonts', 'other'], 'rev', cb);
});
