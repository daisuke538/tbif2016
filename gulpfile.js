var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var cssnext = require( 'gulp-cssnext' );
var ghPages = require( 'gulp-gh-pages' );

var paths = {
  'scss': 'assets/stylesheets/',
  'css': 'build/stylesheets/'
}

// jsタスクを定義する
gulp.task( 'js', function() {
  // タスクを実行するファイルを指定する
  // 実行する処理をpipeで繋いでいく（圧縮したファイルを build/javascripts に出力する）
  gulp.src( 'assets/javascripts/**/*.js' ).pipe( gulp.dest( 'build/javascripts' ) );
});

gulp.task( 'scss', function() {
  // scssファイルをcssファイルに変換して圧縮する
  // cssnextは、CSSの先行実装を現状のブラウザが解釈できるCSSに変換する
  gulp.src( paths.scss + '**/*.scss' ).pipe( sass() ).on( 'error', function( err ) {
      console.log( err.message );
    }).pipe( cssnext() ).pipe( gulp.dest( paths.css ) );
});

gulp.task( 'images', function() {
  gulp.src( 'assets/images/**/*' ).pipe( gulp.dest( 'build/images' ) );
});

gulp.task( 'fonts', function() {
  gulp.src( 'assets/fonts/**/*' ).pipe( gulp.dest( 'build/fonts' ) );
});

// buildタスクを実行すると、jsタスク、scssタスクが実行される
gulp.task( 'build', ['js', 'scss', 'images', 'fonts'], function() {
});

gulp.task( 'watch', function() {
  // jsファイルの変更を監視し、変更されたときにjsタスクが実行される
  gulp.watch( 'assets/javascripts/**/*.js', ['js'] );
  // scssファイルの変更を監視し、変更されたときにscssタスクが実行される
  gulp.watch( 'assets/stylesheets/**/*.scss', ['scss'] );
  gulp.watch( 'assets/images/**/*', ['images'] );
  gulp.watch( 'assets/fonts/**/*', ['fonts'] );
});

gulp.task( 'deploy', function() {
  return gulp.src( './build/**/*' )
    .pipe(ghPages());
});
