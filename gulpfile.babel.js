'use strict';
// Load gulp
import gulp from 'gulp';
// Live reload
import browserSync from 'browser-sync';
browserSync.create();
// Manage JS
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglifyJS from 'gulp-uglify';
// Manage errors
import plumber from 'gulp-plumber';
// Manage files
import clean from 'gulp-clean';
import rename from 'gulp-rename';
// Manage templates
import jade from 'gulp-pug';
// Manage CSS
import postCSS from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sass from 'gulp-sass';

// Clean your dist folder and files inside to start from scratch
gulp.task('clean', () => {
    return gulp.src(['dist'], {
            read: false
        })
        .pipe(clean());
})

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

    let bundler = browserify({
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
