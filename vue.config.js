module.exports = {
    //  代理服务器
    pluginOptions: {
        proxy: {
            enabled: true,   // 是否启用
            context: '/api',  //接口
            options: {
                target: 'http://127.0.0.1:3000', // 目标地址
                changeOrigin: true  //跨域
            }
        }
    }
}