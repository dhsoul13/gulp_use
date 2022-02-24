import fileinclude from "gulp-file-include";
import webHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import pug from "gulp-pug";

export const html = () =>{
    return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title:"HTML",
            messange:"Error: <%= error.message %>"
        }))
    )
    // .pipe(pug({
    //     pretty:true,
    //     verbose:true,
    // }))
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g,'img/'))
    .pipe(
        app.plugins.if(
            app.isBuild,
            webHtmlNosvg()
        )
    )
    .pipe(
        app.plugins.if(
            app.isBuild,
            versionNumber({
                'value': '%DT%',
                'append':{
                    'key': '_v',
                    'cover':0,
                    'to':[
                        'css',
                        'js',
                    ]
                },
                'output':{
                    'file':'gulp/version.json'
                }
            })
        )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.bs.stream());
}