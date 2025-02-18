const merge = require('webpack-merge');
// const argv = require('yargs-parser')(process.argv.slice(2));
const baseConfig = require('../../configs/base/webpack.base.js');
const { resolve } = require('path');
// const _mode = argv.mode || 'development';
// const _mergeConfig = require(`./config/webpack.${_mode}.js`);
// const _modeflag = _mode === 'production' ? true : false;
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const Dotenv = require('dotenv-webpack');
// const { ThemedProgressPlugin } = require('themed-progress-plugin');
const projectConfig = {
  entry: {
    main: resolve('src/index.tsx'),
  },
  output: {
    path: resolve(process.cwd(), 'dist'),
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
  },
};
module.exports = merge(baseConfig, projectConfig);
