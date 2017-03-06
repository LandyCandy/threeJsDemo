//Sourced From
// https://gist.github.com/danharper/3ca2273125f500429945

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

function compile(watch) {
    var bundler = watchify(browserify('./public/js/index.js', {
        // debug: true
    }).transform(babel, {
        presets: ['es2015'],
        plugins: ['transform-react-jsx'],
        only: '/public/js/*'
    }));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) {
                console.error(err);
                this.emit('end');
            })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('build', function() {
    return compile();
});
gulp.task('watch', function() {
    return watch();
});

gulp.task('default', ['watch']);
