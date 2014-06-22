var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// js
var jsbeautify = require('gulp-beautify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// html
var htmlbeautify = require('gulp-prettify');
var htmlhint = require('gulp-w3cjs');

// css
var cssbeautify = require('gulp-cssbeautify');
var csshint = require('gulp-csslint');

// sass/scss
var compass = require('gulp-compass');

var filefolder = {
    'js': 'js/**/*.js',
    'html': 'html/**/*.html',
    'css': 'css/**/*.css',
    'sass': ['sass/**/*.sass', 'sass/**/*.scss']
};

var watchStatus = {
    'isAdded': function(file) {
        return file.event === 'added';
    },
    'isChanged': function(file) {
        return file.event == 'changed';
    },
    'isDeleted': function(file) {
        return file.event == 'deleted';
    },
    'isNotDeleted': function(file) {
        return file.event != 'deleted';
    }
};

gulp.task('js-beautify', function() {
    gulp.src(filefolder.js)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.js
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(jsbeautify({
            indentSize: 4
        }))
        .pipe(gulp.dest('js'))
        .pipe(reload({stream: true}));
});

gulp.task('js-hint', function() {
    return gulp.src(filefolder.js)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.js
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('html-beautify', function() {
    gulp.src(filefolder.html)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.html
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(htmlbeautify({
            indentSize: 4
        }))
        .pipe(gulp.dest('html'))
        .pipe(reload({stream: true}));
});

gulp.task('html-hint', function() {
    gulp.src('html/**/*.html')
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.html
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(htmlhint());
});

gulp.task('css-beautify', function() {
    return gulp.src(filefolder.css)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.css
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(cssbeautify())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream: true}));
});

gulp.task('css-hint', function() {
    gulp.src(filefolder.css)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.css
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(csshint())
        .pipe(csshint.reporter());
});

gulp.task('compass', function() {
    gulp.src(filefolder.sass)
        .pipe(watch({
            'emit': 'all',
            'glob': filefolder.sass
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(gulp.dest('css'))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: './',
            directory: true
        },
        debugInfo: false,
        open: false,
        browser: ["google chrome", "firefox"],
        injectChanges: true,
        notify: true        
    });
});

gulp.task('js', ['js-beautify', 'js-hint']);
gulp.task('html', ['html-beautify', 'html-hint']);
gulp.task('css', ['css-beautify', 'css-hint']);
gulp.task('sass', ['compass']);

gulp.task('default', ['js', 'html', 'css', 'sass'], function() {

});
gulp.task('livereload', ['browser-sync', 'default'], function() {

});