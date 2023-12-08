const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest, GenerateSW} = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () =>
{
  return {
    mode: 'production',
    entry:
    {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output:
    {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins:
    [
      new HtmlWebpackPlugin(
      {
        template: './index.html',
        title: 'JATE'
      }),
      new InjectManifest(
      {
        swSrc: './src-sw.js',
        swDest: './src-sw.js'
      }),
      new GenerateSW(
      {
        runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options:
          {
            cacheName: 'icon',
            expiration:
            {
              maxEntries: 1,
            },
          },
        }],
      }),
      new WebpackPwaManifest(
      {
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        start_url: './',
        publicPath: './',
        icons:
        [
          {
            src: path.resolve('./src/images/logo.png'),
            size: '96x96',
            destination: path.join('./assets', './icons'),
          },
        ],
      }), 
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
