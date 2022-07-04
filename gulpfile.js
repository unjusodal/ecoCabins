const {src, dest, watch, parallel, series} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const concat = require('gulp-concat')
const imageMin = require('gulp-imagemin')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()
const del = require('del')
const autoprefixer  = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin');

function styles() {
    return src('src/styles/*.scss')

    .pipe(sass())
    .pipe(cssmin())
    .pipe(concat('styles.min.css'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function html() {
    return src('src/index.pug')

    .pipe(pug())
    .pipe(concat('index.html'))
    .pipe(dest('dist'))
}

function js() {
    return src('src/index.js')

    .pipe(uglify())
    .pipe(concat('index.min.js'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function compressImg() {
    return src('src/assets/images/**/*.*')

    .pipe(imageMin([
        imageMin.gifsicle({interlaced: true}),
        imageMin.mozjpeg({quality: 75, progressive: true}),
        imageMin.optipng({optimizationLevel: 5}),
        imageMin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/assets/images'))
}

function watching() {
    watch('src/index.pug', html),
    watch('src/index.pug').on('change', browserSync.reload),
    watch('src/styles/*.scss', styles),
    watch('src/index.js', js)
}

function liveServer() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

function cleanDist() {
    return del('dist')
}

function addFonts() {
    return src('src/assets/fonts/*.ttf')

    .pipe(dest('dist/assets/fonts'))
}

exports.styles = styles
exports.html = html
exports.js = js
exports.liveServer = liveServer
exports.watching = watching

exports.default = parallel(liveServer, watching)
exports.build = series(cleanDist, html, styles, js, compressImg, addFonts)