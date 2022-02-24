//основной модуль
import gulp from "gulp";

// импорт путь
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app ={
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path:path,
    gulp:gulp,
    plugins:plugins,
};

//импорт задачи
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { img } from "./gulp/tasks/img.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

//наблюдение за изменение файла
function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);// gulp.series(html, ftp)
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, img);
}

export { svgSprive }


//сценарии 
const fonts = gulp.series( otfToTtf, ttfToWoff, fontsStyle);
const mainTask = gulp.series(fonts ,gulp.parallel(copy,html,scss, js, img));


const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset,mainTask, zip);

const deployFtp = gulp.series(reset,mainTask, ftp);

export { dev }
export { build }
export { deployZip }


gulp.task('default', dev );
