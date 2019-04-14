const gulp = require("gulp");
const config = require("./env.paths.json");
const env = process.env.NODE_ENV;

// плагины галпа отдельно подключать не нужно,
// используем в пайпе как $gp.имяПлагина (без приставки gulp-)
const $gp = require("gulp-load-plugins")();

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const del = require("del");

//стили
gulp.task("styles", () => {
    return gulp
        .src(`${config.SRC_DIR}/css/main.scss`)
        .pipe($gp.sourcemaps.init())
        .pipe($gp.plumber())
        .pipe($gp.postcss(require("./postcss.config")))
        .pipe($gp.rename("main.min.css"))
        .pipe(gulp.dest(`${config.DIST_DIR}`))
        .pipe(reload({ stream: true }));
});

// переносим шрифты
gulp.task("fonts", () => {
    return gulp
        .src(`${config.SRC_DIR}/font/**`)
        .pipe(gulp.dest(`${config.DIST_DIR}/font/`));
});

// очистка
gulp.task("clean", () => {
    return del(config.ROOT_PATH);
});

var concat = require('gulp-concat');

gulp.task('scripts', function() {
    return gulp.src(`${config.CORE_DIR}/babel/**`)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(`${config.DIST_DIR}`));
});

//рендерим странички
gulp.task("pug", () => {
    return gulp
        .src(`${config.VIEWS_DIR}/*.pug`)
        .pipe($gp.plumber())
        .pipe($gp.pug())
        .pipe(gulp.dest(`${config.DIST_DIR}`))
        .pipe(reload({ stream: true }));
});


// dev сервер + livereload (встроенный)
gulp.task("server", () => {
    browserSync.init({
        server: {
            baseDir: `${config.DIST_DIR}`
        },
        open: false
    });
});

// спрайт иконок
gulp.task("svg", done => {
    return gulp
        .src(`${config.SRC_DIR}/img/icons/*.svg`)
        .pipe(
            $gp.svgmin({
                js2svg: {
                    pretty: true
                }
            })
        )
        .pipe(
            $gp.cheerio({
                run($) {
                    $("[fill], [stroke], [style], [width], [height]")
                        .removeAttr("fill")
                        .removeAttr("stroke")
                        .removeAttr("style")
                        .removeAttr("width")
                        .removeAttr("height");
                },
                parserOptions: { xmlMode: true }
            })
        )
        .pipe($gp.replace("&gt;", ">"))
        .pipe(
            $gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            })
        )
        .pipe(gulp.dest(`${config.DIST_DIR}/images/icons`));
});

// просто переносим картинки
gulp.task("images", () => {
    return gulp
        .src([
            `${config.SRC_DIR}/img/**/*.*`,
            `!${config.SRC_DIR}/img/icons/*.*`
        ])
        .pipe(gulp.dest(`${config.DIST_DIR}/images/`));
});

// галповский вотчер
gulp.task("watch", () => {
    gulp.watch(`${config.SRC_DIR}/css/**/*.scss`, gulp.series("styles"));
    gulp.watch(`${config.SRC_DIR}/img/**/*.*`, gulp.series("images"));
    gulp.watch(`${config.SRC_DIR}/js/**/*.js`, gulp.series("scripts"));
    gulp.watch(`${config.SRC_DIR}/font/*`, gulp.series("fonts"));
    gulp.watch(`${config.VIEWS_DIR}/*.pug`, gulp.series("pug"));
});

// GULP:DEV
gulp.task(
    "default",
    gulp.series(
        "clean",
        "svg",
        gulp.parallel("styles", "pug", "images", "fonts", "scripts"),
        gulp.parallel("watch", "server")
    )
);

// GULP:build
gulp.task(
    "build",
    gulp.series(
        "clean",
        "svg",
        gulp.parallel("styles", "pug", "images", "fonts", "scripts")
    )
);

var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
    realFavicon.generateFavicon({
        masterPicture: '_source/img/favicon/Logo-toyota.png',
        dest: '_source/img/favicon-generate',
        iconsPath: '/',
        design: {
            ios: {
                pictureAspect: 'noChange',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'noChange',
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#ffffff',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
    return gulp.src([ '_source/block/index.pug' ])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('_source/block'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});