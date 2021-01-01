module.exports = {
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/main.scss";`
      }
    }
  }
};
