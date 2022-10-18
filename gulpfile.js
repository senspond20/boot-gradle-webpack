const pkg = require('gulp');
const concat = require('gulp-concat');
const cleanCss  = require('gulp-clean-css');
const minifyhtml = require('gulp-minify-html');
const del = require('del');
const server = require('gulp-express');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

const {task, watch, src,dest,series} = pkg;

task('clean', async ()=>{
    console.log('@ dist 하위 경로 강제 삭제')
    await del(['dist/**/*'], {force :true});
})

task('create-html', async ()=>{
    console.log(`@ html/hbs을 압축 합니다.`)
    await src(['src/index.html','src/**/*.hbs'])
        .pipe(minifyhtml())
        .pipe(dest('dist'))
})

task("create-css", async()=>{
    console.log('@ src 경로 아래 css 들을 하나로 병합하고 압축해 dist 폴더아래 저장합니다')
    await src(["src/**/*.css"])
        .pipe(concat("style.bundle.css")) // 모든 css들을 병합
        .pipe(cleanCss({ compatibiliy: 'ie8' })) // ie8 까지 호환성 맞춤
        .pipe(dest("dist/css"))
});

task('create-js', async () =>{
    await src(['src/**/*.js','src/**/*.jsx'])
        .pipe(babel())   // .babelrc 설정으로 들어간다 .
        // .pipe(uglify())  //  js 경량화
        // .pipe(concat("js/main.bundle.js"))
        .pipe(dest('js-test'))
});

task('webpack-js', async() => {
    console.log(`@ 웹팩으로 js를 번들링 합니다.`)
    await webpackStream(webpackConfig).pipe(dest('dist/js'));
});


task('server',async()=>{
    console.log(`@ 서버를 가동합니다.`)
    server.run(['server.js'])
})

task('watch-css', () =>{
    console.log(`@ css 파일 변경을 감지하고 빌드 합니다`)
    const path = 'src/**/*.css';
    watch([path]).on('add', (path, stats)=>{
        console.log(`File ${path} add`);
        series("create-css")
    });
    watch([path]).on('change', (path, stats)=>{
        console.log(`File ${path} was changed`);
        series("create-css")
    });
});

task('default', series(
    [
        'clean',
        'create-html',
        'create-css',
        'webpack-js',
    ]
));

