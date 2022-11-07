"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var ts = require("gulp-typescript");
var less = require("gulp-less");
var project = ts.createProject("./tsconfig.ts");
var srcFiles = "./src/**/*.ts";
var dest = "./dist";
var jsonFiles = "./src/**/*.json";
var htmlFiles = "./src/**/*.html";
var lessFiles = "./src/**/*.less";
function watchTs() {
    return gulp.watch(srcFiles, tscompile);
}
function tscompile() {
    return gulp.src(srcFiles).pipe(project()).pipe(gulp.dest(dest));
}
function jsonFilesWatchAndCopy() {
    return gulp.watch(jsonFiles, copyJson);
}
function copyJson() {
    return gulp.src(jsonFiles).pipe(gulp.dest(dest));
}
function htmlFilesWatchAndCopy() {
    return gulp.watch(htmlFiles, copyHtml);
}
function copyHtml() {
    return gulp.src(htmlFiles).pipe(gulp.dest(dest));
}
function lessFilesWatchAndCopy() {
    return gulp.watch(lessFiles, lessCompile);
}
function lessCompile() {
    return gulp.src(lessFiles).pipe(less()).pipe(gulp.dest(dest));
}
exports.watch = gulp.series(tscompile, copyHtml, copyJson, lessCompile, gulp.parallel(watchTs, jsonFilesWatchAndCopy, lessFilesWatchAndCopy, htmlFilesWatchAndCopy));
