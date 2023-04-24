const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? '/LoginFrontend/'
      : './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://35.201.130.4',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    } 
  }
}
