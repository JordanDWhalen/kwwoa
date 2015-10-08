var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    globbing = require('gulp-css-globbing'),
    cmq = require('gulp-combine-media-queries'),
    server = require('gulp-server-livereload');


// ROOT TASKS // ---------------------------------------------------------
// Main style task  
gulp.task('css', function() {
  return gulp.src('dev/sass/application.scss')
    .pipe(globbing({extensions: '.scss'}))
    .pipe(sass())
    .on('error', handleError)
    .pipe(cmq()) // combine all @media queries into the page base
    .pipe(autoprefixer({cascade: false})) // auto prefix
    .pipe(minifycss()) // minify everything
    .pipe(gulp.dest('public/css'));
});

// Main Javascript task
gulp.task('js', function() {  
  return gulp.src('dev/js/**/*.js')
    .pipe(newer('public/js'))
    .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest('public/js'));
});

// Main image task
gulp.task('img', function() {
  return gulp.src('dev/img/**/*.{jpg,jpeg,png,gif,svg,ico}')
    .pipe(newer('public/img'))
    .pipe(imagemin({ 
      optimizationLevel: 5,
      progressive: true, 
      interlaced: true,
      svgoPlugins: [{
        collapseGroups: false,
        removeViewBox: false
      }]
    }))
    .on('error', handleError)
    .pipe(gulp.dest('public/img'));
});

// Publish github page
gulp.task('deploy', function() {
  return gulp.src('public/**/*')
    .pipe(ghPages());
});


// FUNCTIONS // ---------------------------------------------------------
// Initial start function
gulp.task('start', ['img'], function() {
  gulp.start('js', 'css');
});

// Watch function
gulp.task('watch', ['start'], function() {
  gulp.watch('dev/sass/**/*.scss', ['css']);
  gulp.watch('dev/js/**/*.js', ['js']);
  gulp.watch('dev/img/**/*.{jpg,jpeg,png,gif,svg,ico}', ['img']);
  gulp.src('public/').pipe(server({ livereload: true, directoryListing: false, open: true, defaultFile: "index.html"}));
});
// Default function
gulp.task('default', ['watch']);

// Error reporting function
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('webserver', function() {

});