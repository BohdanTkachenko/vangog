import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  target: 'node',
  externals1: [nodeExternals()],
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dropzone': {
      commonjs: 'react-dropzone',
      commonjs2: 'react-dropzone',
      amd: 'react-dropzone',
      root: 'ReactDropzone',
    },
  },
  entry: {
    vangog: './src/lib.js',
  },
  output: {
    path: './dist',
    filename: '[name].js',
    library: 'Vangog',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
      {
        test: /\.(png|gif|jpeg|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
