const path = require('path')
const config = require('./src/config')

const resolve =dir=>{
    return path.join(__dirname,dir)
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? './'
    : './'

module.exports = {
    publicPath:BASE_URL,
    lintOnSave:false,
    chainWebpack:config=>{
        config.resolve.alias.set('@',resolve('src'))
            .set('_c',resolve('src/components'))
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    // 打包时不生成.map文件
    productionSourceMap: false
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    // devServer: {
    //   proxy: 'localhost:3000'
    // }
}