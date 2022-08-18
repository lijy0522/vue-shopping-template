/*
 * @Author: lijy
 */
module.exports = {
    // 关闭 eslint
    lintOnSave: false,
    // 代理跨域
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // pathRewrite: { "^/api": "" },
            }
        }
    }
}