import del from "del";
import zipP from "gulp-zip";

export const zip = ()=>{
    del(`./${app.path.rootFolder}.zip`);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title:"Zip",
            messange:"Error: <%= error.message %>"
        })))
    .pipe(zipP(`${app.path.rootFolder}.zip`))
    .pipe(
        app.gulp.dest('./')
    )
}
