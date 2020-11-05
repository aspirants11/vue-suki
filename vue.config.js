// vue.config.js
const path =  require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',  // 公共路径
    // indexPath: 'index.html' , // 相对于打包路径index.html的路径
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist', // 'dist', 生产环境构建文件的目录
    // assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: true, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    // runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    // productionSourceMap: !IS_PROD, // 生产环境的 source map
    // parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    // pwa: {}, // 向 PWA 插件传递选项。
    lintOnSave: false,
    chainWebpack: (config) => {
        // config.resolve.symlinks(true); // 修复热更新失效
        // // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        // config.plugin("html").tap(args => {
        //     // 修复 Lazy loading routes Error
        //     args[0].chunksSortMode = "none";
        //     return args;
        // });
        // config.resolve.alias // 添加别名
        //     .set('@', resolve('src'))
        //     .set('@assets', resolve('src/assets'))
        //     .set('@components', resolve('src/components'))
        //     .set('@views', resolve('src/views'))
        //     .set('@store', resolve('src/store'));
    },
    configureWebpack: (config) => {
        // 配置解析别名
        config.resolve =  {
            extensions: ['.js', '.json', '.vue' ], //自动添加文件名后缀
            alias: {
              '@': path.resolve(__dirname, './src'),
              '@c': path.resolve(__dirname, './src/components'),
            //   'public': path.resolve(__dirname, './public'),
            //   'common': path.resolve(__dirname, './src/common'),
            //   'api': path.resolve(__dirname, './src/api'),
            //   'views': path.resolve(__dirname, './src/views'),
            //   'data': path.resolve(__dirname, './src/data')
            }
          }
    },
    // 生产环境是否生成SourceMap文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtrachtTextPlugin
        extract: true,
        // 开启 css soure maps?
        sourceMap: false,
        // requireModuleExtension: false,// 去掉文件名中的 .module
        loaderOptions: {
            sass:{
                prependData: '@import "./src/styles/mian.scss";'
           }                 
        },
        modules: false
    },
    devServer: {
        open: false, //配置自动启动浏览器
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        hot: true, // 开启热加载
        hotOnly: true, // 热更新
        proxy: null, // 设置代理
        proxy: {
          '/devApi': {
            // 此处的写法，目的是为了 将 /api 替换成 服务器地址
            target: "http://www.web-jshtml.cn/produntapi",
            // 允许跨域
            changeOrigin: true,
            pathRewrite: {
                '^/devApi': ''
            }
          }
        },
        overlay: { // 让浏览器 overlay 同时显示警告和错误
          warnings: true,
          errors: true
        },            
        before: app => {

        }
        },
        // 第三方插件配置
        pluginOptions: {}
}
