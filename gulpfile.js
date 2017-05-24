const gulp = require("gulp");
const uglify = require("gulp-uglify");// 压缩js
const rename = require("gulp-rename");//文件重命名
const concat= require("gulp-concat"); //文件合并
const browserify = require("gulp-browserify")// 文件打包
//var htmlmin = require('gulp-htmlmin');//html压缩为一行
var imagemin = require('gulp-imagemin')//图片的压缩
var sass = require('gulp-sass');//sass编译
var minify_css = require('gulp-minify-css');//css的压缩
var webserver = require('gulp-webserver');//web服务热启动
var rev = require('gulp-rev');   //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var url = require("url")
var datajson = require("./data/main.js")

gulp.task("jsmin",function(){
    gulp.src("src/js/common/*.js")
        .pipe(gulp.dest('./build/js/common'))
})
gulp.task("cssmin",function(){
    //压缩css
    gulp.src('src/css/*.sass')
        // sass编译
        .pipe(sass())
        //css的压缩
        .pipe(minify_css())
        .pipe(rev())//md5版本控制
        .pipe(gulp.dest('./build/css'))
        .pipe(rev.manifest())//生成一个rev-manifest.json
        .pipe(gulp.dest("./rev/css"))   //将rev-manifest.json存放到
})
gulp.task("cssmin",function(){
    gulp.src('src/css/*.css')
        .pipe(minify_css())
        .pipe(gulp.dest('./build/css'))
})
gulp.task("html",function(){
    //gulp.src('src/html/*.html')
    //    .pipe(gulp.dest('./build/html'));
})

//文件名替换
gulp.task("htmlrev",function(){
    setTimeout(function () {
        gulp.src(['./rev/**/*.json','./src/html/*.html'])//-读取rev-manifest.json 文件以及需要进行
            .pipe(revCollector({
                replaceReved:true,
                dirReplacements:{
                    'css':'../css',
                    'js':'../js/'
                }
            }))
            .pipe(gulp.dest('./build/html'));
    },3000)
})
//gulp.task("build",["htmlrev"])
gulp.task("build",["jsmin","cssmin",'html',"htmlrev"])

gulp.task("webserver",["build"],function(){
    //watch监视文件，并且可以在文件发生改动时候做一些事情
    gulp.watch("src/css/*.sass",["cssmin"])
    gulp.watch("src/html/*.html",["html"])
    setTimeout(function () {
        gulp.src("./build")
            //web服务热启动
            .pipe(webserver({
                port:8080,
                livereload: true,
                directoryListing: true,
                middleware:function(req,res,next){
                    const reqPath = url.parse(req.url).pathname//请求的地址
                    const routes= datajson.data()
                    routes.forEach(function(i){
                        console.log(i.route)
                        console.log(reqPath)
                        if(i.route == reqPath){
                            i.handle(res,req,next)
                        }
                        next()
                    })

                },
                open: "html/index.html"
            }))
    },3000)

})
gulp.task("default",function(){
    // 将你的默认的任务代码放在这

})


