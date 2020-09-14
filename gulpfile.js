const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const group_media = require('gulp-group-css-media-queries');
const webp = require('gulp-webp');
const webphtml = require('gulp-webp-html');
const webpcss = require("gulp-webpcss");
const webpack = require("webpack-stream");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(group_media())
        .pipe(webpcss())
        .pipe(gulp.dest("dist/css"))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("./src/img/**/*.*", gulp.parallel('images'));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task('html', function() {
    return gulp.src("src/*.html")
        .pipe(webphtml())
        .pipe(rename({suffix: '.not-compressed', prefix: ''}))
        .pipe(gulp.dest("dist/"))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename({basename: "index", extname: ".html"}))
        .pipe(gulp.dest("dist/"));
});

gulp.task('delDir', async () => {
    await del('./dist/');
});

gulp.task('scripts', function() {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function() {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('mailer', function() {
    return gulp.src("src/mailer/**/*")
        .pipe(gulp.dest("dist/mailer"));
});

gulp.task('images', function() {
    return gulp.src("src/img/**/*")
        .pipe(webp({
            quality: 70
        }))
        .pipe(gulp.dest("dist/img"))
        .pipe(gulp.src("src/img/**/*"))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest('./dist/'))
                .pipe(browserSync.stream());
});

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.min.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest('./dist/js/'));
});

gulp.task("build", gulp.series('delDir', gulp.parallel('server', 'styles', 'html', 'scripts', 'fonts', 'mailer', 'images'), "build-js"));
gulp.task("default", gulp.parallel("watch", "build"));

