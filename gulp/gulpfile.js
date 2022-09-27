const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const babel = require('gulp-babel');

function swallowError(error){
	console.log(error.toString())
	this.emit('end')
}

function css() {
    return src('css/index.scss')
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(concat('index.css'))
        .pipe(dest('../assets/css/'));
}

function js() {
    return src([
        'js/functions.js'
    ], {
        sourcemaps: false
    })
    .on('error', swallowError)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .on('error', swallowError)
    .pipe(concat('index.js'))
    .on('error', swallowError)
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .on('error', swallowError)
    .pipe(dest('../assets/js', { sourcemaps: false }));
}

function icons() {
    return src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(dest('../assets/webfonts/'));
}

function plugins() {
    return src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/materialize-css/dist/js/materialize.min.js',
    ], {
        sourcemaps: false
    })
    .on('error', swallowError)
    .pipe(concat('plugins.js'))
    .on('error', swallowError)
    .pipe(minify({
        ext:{
            min:'.js'
        },
        noSource: true
    }))
    .on('error', swallowError)
    .pipe(dest('../assets/js', { sourcemaps: false }));
}

function real() {
    watch(['css/**/*.scss', 'js/*.js'], parallel(css, js));
}

exports.icons = icons;
exports.js = js;
exports.css = css;
exports.plugins = plugins;
exports.watch = real;
exports.default = parallel(css, js, plugins, icons);
