const {src, dest, watch, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const concat = require('gulp-concat')
var browserSync = require('browser-sync').create()

function styles() {
    return src('src/styles/*.scss')

    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(dest('dist'))
}

function html() {
    return src('src/index.pug')

    .pipe(pug({
        pretty: true
    }))
    .pipe(concat('index.html'))
    .pipe(dest('dist'))
}

function watching() {
    watch('src/index.pug', html),
    watch('src/index.pug').on('change', browserSync.reload),
    watch('src/styles/*.scss').on('change', browserSync.reload),
    watch('src/styles/*.scss', styles)
}

function liveServer() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

exports.styles = styles
exports.html = html
exports.liveServer = liveServer
exports.watching = watching

exports.default = parallel(liveServer, watching)