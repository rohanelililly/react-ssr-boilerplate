const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { getAppEnv } = require('./env');

const env = getAppEnv();
const { PUBLIC_URL = '' } = env.raw;

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

if (env.raw.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: true
  },
  entry: './server/app.js',
  output: {
    path: resolvePath('../build'),
    filename: 'server.js',
    publicPath: PUBLIC_URL + '/',
    libraryTarget: 'commonjs2'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              'css-modules-transform',
              {
                camelCase: true,
                extensions: ['.css', '.scss'],
                generateScopedName: '[hash:base64]',
                ignore: 'src/styles'
              }
            ],
            'dynamic-import-node'
          ]
        }
      },
      {
        test: /\.s?[ac]ss$/,
        exclude: [resolvePath('../src/styles'),resolvePath('../assets')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader',
          'import-glob-loader'
        ]
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
