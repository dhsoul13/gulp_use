export const server = (done) =>{
    app.plugins.bs.init({
    server: {
        baseDir: `${app.path.build.html}`
    },
    notify:false,
    port: 3000,
    });
}

