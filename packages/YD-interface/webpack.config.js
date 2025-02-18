const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));//["Node.js 执行文件的完整路径","正在执行的 JavaScript 文件的路径","命令行中传入的参数"]
const { resolve } = require('path');
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const WebpackBar = require('webpackbar');
const { ThemedProgressPlugin } = require('themed-progress-plugin');//进度条插件
const webpackBaseConfig = {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        include: [
          resolve(__dirname, 'src'),
          resolve(__dirname, 'node_modules'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',//意味着css放到js里面,不单独提出来
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve('src/'),
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
      '@connections': resolve('src/connections'),
      '@abis': resolve('src/abis'),
      '@types': resolve('src/types'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    fallback: {
      // stream: require.resolve('stream-browserify'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      chunkFilename: _modeflag
        ? 'styles/[name].[contenthash:5].css'
        : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new ThemedProgressPlugin(),
  ],
};
module.exports = merge.default(webpackBaseConfig, _mergeConfig);//merge.default是深度合并，不会把重名的东西替换掉
