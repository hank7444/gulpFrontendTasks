var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');

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

// coffee
var coffee = require('gulp-coffee');

// test
var htmlbuild = require('gulp-htmlbuild'); // 字串寫入
var es = require('event-stream');
var tap = require('gulp-tap'); // 取得檔案名稱
var rename = require("gulp-rename");
var path = require('path');
var fs = require('fs');

var filefolder = {
    'js': 'js/**/*.js',
    'html': 'html/**/*.html',
    'css': 'css/**/*.css',
    'sass': 'sass/**/*.{sass, scss}',
    'coffee': 'coffee/**/*.coffee',
    'test': {
        'html': {
            'html': 'test/html/*.html',
            'script': 'test/html/script/*.js'
        },
        'js': {
            'html': 'test/js/*.html',
            'script': 'test/js/script/**/*.js'
        }
    }
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
        .pipe(reload({
            stream: true
        }));
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



gulp.task('coffee', function() {
    gulp.src(filefolder.coffee)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('js'))
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
        .pipe(reload({
            stream: true
        }));
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
        .pipe(reload({
            stream: true
        }));
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
        .pipe(plumber())
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(gulp.dest('css'))
        .pipe(reload({
            stream: true
        }));
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





// ============ 測試部分的task都在這裡 ==============

// 測試用libs
var getTestLibAry = {
    'js': [
        '/lib/test/jquery-1.10.2.min.js',
        '/lib/test/mocha.js',
        '/lib/test/chai.js',
        '/lib/test/chai-jquery.js',
    ],
    'css': [
        '/lib/test/mocha.css'
    ]
};

// 測試用function
var getPathName = function(filepath) {
    var name = path.basename(filepath);
    return name.substr(0, name.lastIndexOf('.'));
};
var destTestJs = function(name, testType) {
    fs.exists('test/' + testType + '/script/' + name + '.js', function(exists) {

        if (exists) {
            return false
        }
        gulp.src('./test/default.js')
            .pipe(rename(function(path) {
                path.dirname = testType + '/script';
                path.basename = name;
                path.extname = ".js"

            }))
            .pipe(gulp.dest("./test"))
            .pipe(reload({
                stream: true
            }));
    });
};


var createTestHtmlHash = {
    'html': function(name, filepath, testType) {

        gulp.src(filepath)
            .pipe(htmlbuild({
                // add a header with this target
                html: function(block) {
                    block.end('<div id="mocha"></div>');
                },
                css: function(block) {
                    var cssLibAry = getTestLibAry.css;

                    es.readArray(cssLibAry.map(function(str) {
                        return '<link rel="stylesheet" href="' + str + '">';
                    })).pipe(block);
                },
                js: function(block) {

                    var jsLibAry = getTestLibAry.js.slice(0);

                    if (name) {
                        jsLibAry.push('/test/' + testType + '/script/' + name + '.js');
                    }

                    es.readArray(jsLibAry.map(function(str) {
                        return '<script src="' + str + '"></script>';
                    })).pipe(block);
                },
            }))
            .pipe(gulp.dest('./test/' + testType))
            .pipe(reload({
                stream: true
            }));
    },
    'js': function(name, filepath, testType) {

        var htmlPath = 'test/' + testType + '/' + name + '.html';

        fs.exists(htmlPath, function(exists) {

            if (exists) {
                return false;
            }
            gulp.src('./test/default.html')
                .pipe(rename(function(path) {
                    path.dirname = testType;
                    path.basename = name;
                    path.extname = ".html"

                }))
                .pipe(htmlbuild({
                    js: function(block) {

                        var jsLibAry = getTestLibAry.js.slice(0);

                        if (name) {
                            jsLibAry.push('/test/' + testType + '/script/' + name + '.js');
                        }

                        es.readArray(jsLibAry.map(function(str) {
                            return '<script src="' + str + '"></script>';
                        })).pipe(block);
                    },
                }))
                .pipe(gulp.dest("./test"))
                .pipe(reload({
                    stream: true
                }));
        });
    }
};

var destTestHtml = function(name, filepath, testType) {
    createTestHtmlHash[testType](name, filepath, testType);
};



var destDefaultHtml


gulp.task('test-html', function() {

    var testType = 'html';

    // 監聽html檔案, 並產生對應的測試用html與js,
    // html會自動加上測試用的lib與對應相同名稱的js,
    // js部分如果已經存在則不覆蓋(避免寫的測試碼不見)
    gulp.src(filefolder.html)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.html
        }, function(files) {

            files.pipe(tap(function(file, t) {

                var name = getPathName(file.path);
                destTestJs(name, testType);
                destTestHtml(name, file.path, testType);
            }))
        }))
        .pipe(filter(watchStatus.isNotDeleted));

    // 將測試js綁定watch   
    gulp.src(filefolder.test.html.script)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.test.html.script
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('test-js', function() {

    var testType = 'js';

    // 監聽js/script檔案, 產生對應的測試用html
    // html會自動加上測試用的lib與測試用的js
    // html如果已存在則不覆蓋(避免使用者新增的部分被覆蓋掉)
    gulp.src(filefolder.test.js.script)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.test.js.script
        }, function(files) {

            files.pipe(tap(function(file, t) {

                var name = getPathName(file.path);
                gutil.log('name:    ' + name);
                destTestHtml(name, file.path, testType);
            }))
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(reload({
            stream: true
        }));


    // 將測試html綁定watch   
    gulp.src(filefolder.test.js.html)
        .pipe(watch({
            'emit': 'one',
            'glob': filefolder.test.js.html
        }))
        .pipe(filter(watchStatus.isNotDeleted))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('js', ['js-beautify', 'js-hint']);
gulp.task('html', ['html-beautify', 'html-hint']);
gulp.task('css', ['css-beautify', 'css-hint']);
gulp.task('sass', ['compass']);
gulp.task('default', ['js', 'html', 'css', 'sass', 'coffee']);
gulp.task('livereload', ['browser-sync', 'default']);
gulp.task('test', ['browser-sync', 'test-js', 'test-html', 'default']);
