'use strict';

/**
 Legenda Output
 - loc:    lines of code
 - sloc:   source lines of code
 - cloc:   total comments lines
 - scloc:  singlelines of comment
 - mcloc:  multilines of comment
 - nloc:   empty lines
 - file:   numbers of files parse
 */


var path  = require('path');
var gulp  = require('gulp');
var conf  = require('./conf');
var sloc  = require('gulp-sloc');


// calcolare le metriche per i file sorgente
// settati per il momento solo i file creati per le attività di Stage
var fileWhereCalculate = [
];

// TODO: calcolare le metriche per i file di test
var fileTest = [];

var slocOptions = {
  reportType: 'json'
};

gulp.task('sloc', function(){


  return gulp.src(fileWhereCalculate)
          .pipe(sloc(slocOptions))
          .pipe(gulp.dest('./reports/'));

});