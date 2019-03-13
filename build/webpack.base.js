const path = require('path')
module.exports = {
  output: {
    path: path.join(__dirname, '../dist'),
    // 加在html引用路径前面
    // 配置cdn 在这加cdn前缀
    // 最后面的 / 加上，否则影响hot-module-replacement功能
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        // 执行前检查
        enforce: "pre",
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: [
          path.resolve(__dirname,'../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
}
