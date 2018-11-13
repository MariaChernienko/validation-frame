const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const distDirectory = 'dist';
const htmlBlob = 'src/*.html';
const imagesBlob = 'src/images/**';
const fontsBlob = 'src/fonts/**';
const jsBlob = 'src/js/**';
const stylesBlob = 'src/css/**';
const sassBlob = 'src/sass/**';


gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('default', function () {
  return runSequence('build', 'serve');
});
gulp.task('build', function () {
  return runSequence(
    'cleanDist',
    ['processStyles', 'processHtml', 'processImages', 'processFonts', 'processJs']
  );
});
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: distDirectory
    }
  });
  gulp.watch(htmlBlob, function () {
    return runSequence('processHtml', 'reloadBrowser');
  });
  gulp.watch(imagesBlob, function () {
    return runSequence('processImages', 'reloadBrowser');
  });
  gulp.watch(fontsBlob, function () {
    return runSequence('processFonts', 'reloadBrowser');
  });
  gulp.watch(stylesBlob, function () {
    return runSequence('processStyles', 'reloadBrowser');
  });
  gulp.watch(sassBlob, function () {
      return runSequence('sass', 'reloadBrowser');  9
  });
  gulp.watch(jsBlob, function () {
    return runSequence('processJs', 'reloadBrowser');  
});
});
gulp.task('cleanDist', function () {
  return gulp.src(distDirectory, {read: false, allowEmpty: true}).pipe(clean());
});
gulp.task('processHtml', function () {
  return gulp.src(htmlBlob)
    .pipe(gulp.dest(distDirectory));
});
gulp.task('processImages', function () {
  return gulp.src(imagesBlob)
    .pipe(gulp.dest(`${distDirectory}/images/`));
});
gulp.task('processFonts', function () {
  return gulp.src(fontsBlob)
    .pipe(gulp.dest(`${distDirectory}/fonts/`));
});
gulp.task('processJs', function () {
  return gulp.src(jsBlob)
    .pipe(gulp.dest(`${distDirectory}/js/`));
});
gulp.task('processStyles', function () {
  return gulp.src(stylesBlob)
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(`${distDirectory}/css`));
});
gulp.task('reloadBrowser', function (done) {
  browserSync.reload();
  done();
});
gulp.task('sass', function() {
return  gulp.src(sassBlob)
  .pipe(sass())
  .pipe(gulp.dest(`${distDirectory}/css/`));
});





 

