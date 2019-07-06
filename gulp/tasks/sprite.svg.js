'use stricts'

module.exports = function() {
    $.gulp.task('svg', () => {
        return $.gulp.src($.config.src +'/img/**/*.svg')
            .pipe($.gulp.dest($.config.build +'/assets/img/'));
    });
};
