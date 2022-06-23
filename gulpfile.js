const gulp = require("gulp");
const fs = require("fs");
const { pipeline } = require('readable-stream');

const babel = require("gulp-babel");
const cleaner = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const uglify = require('gulp-uglify');

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const ghpages = require("gh-pages");

const assets = () => pipeline(
    gulp.src("src/assets/**"),
    gulp.dest("dist/assets")
);

const clean = () => pipeline(
    gulp.src("dist", { allowEmpty: true, read: false }),
    cleaner()
);

const html = () => pipeline(
    gulp.src("src/**/*.html"),
    htmlmin({ collapseWhitespace: true }),
    gulp.dest("dist")
);

// const ghCNAME = cb => fs.writeFile("dist/CNAME", "lava.moe", cb);
const ghDeploy = cb => {
    require('child_process').exec('git rev-parse HEAD', (err, stdout) => {
        ghpages.publish("dist", {
            branch: "master",
            message: "Compiled Razuuu/razuuu.github.io@" + stdout.trim()
        }, cb);
    });
};

const script = () => pipeline(
    gulp.src("src/**/*.js"),
    babel(),
    uglify({
        mangle: {
            toplevel: true
        }
    }),
    gulp.dest("dist")
);

const style = () => pipeline(
    gulp.src("src/**/*.css"),
    postcss([
        autoprefixer({ overrideBrowserslist: ['last 1 version'] }),
        cssnano()
    ]),
    gulp.dest("dist")
);

const build = gulp.series(clean, gulp.parallel(assets, html, script, style));
const deploy = gulp.series(build, ghCNAME, ghDeploy);

module.exports = {
    assets,
    clean,
    deploy,
    html,
    ghCNAME,
    ghDeploy,
    script,
    style,
    default: build,
    watch: () => {
        gulp.watch("src/assets/**", assets);
        gulp.watch("src/**/*.html", html);
        gulp.watch("src/**/*.js", script);
        gulp.watch("src/**/*.css", style);
    }
};
