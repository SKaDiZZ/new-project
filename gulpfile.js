// Load gulp
const gulp = require('gulp');

// Load gulp plugins
const browserSync = require('browser-sync').create(),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    jade = require('gulp-pug'),
    postCSS = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    uglifyJS = require('gulp-uglify');

// Manage PUG templates
gulp.task('goPUG', () => {

    let YOUR_LOCALS = {};

    gulp.src('./src/**/!(_)*.pug')
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

// Manage CSS >> SASS + POSTCSS
gulp.task('goCSS', () => {

    let processors = [autoprefixer, cssnano];

    return gulp.src('./src/scss/**/!(_)*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postCSS(processors))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));

});

// Compile javascript
gulp.task('goJS', () => {

    var bundler = browserify({
        entries: ["./src/js/main.js"]
    });

    bundler.transform(babelify);

    return bundler.bundle()
        .pipe(plumber())
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglifyJS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());

});

// Watch task
gulp.task('watch', () => {

    browserSync.init({
        server: './dist'
    });

    gulp.watch('./src/**/*.pug', ['goPUG']);
    gulp.watch('./src/scss/**/*.scss', ['goCSS']);
    gulp.watch('./src/js/**/*.js', ['goJS']);

});

// Default gulp task
gulp.task('default', ['watch']);
