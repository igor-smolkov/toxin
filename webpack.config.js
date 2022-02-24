const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const pagesDir = 'pages';
const pages = [
  {
    'ui-kit': [
      'colors-and-type',
      'form-elements',
      'cards',
      'headers-and-footers',
    ],
  },
  {
    website: [
      'landing-page',
      'search-room',
      'room-details',
      'registration',
      'sign-in',
    ],
  },
];

const filename = (ext) => (
  isDev ? `[name].${ext}` : `[name].[hash].${ext}`
);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '',
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const plugins = () => {
  const packHTMLWebpackPlugin = (input, output, chunk) => new HTMLWebpackPlugin({
    template: `./${input}`,
    filename: output,
    minify: {
      collapseWhitespace: isProd,
    },
    chunks: ['main', chunk],
    favicon: path.resolve(__dirname, 'assets/favicons/favicon.ico'),
  });

  const list = [
    new LiveReloadPlugin({ appendScriptTag: true }),
    packHTMLWebpackPlugin(
      `${pagesDir}/index/index.pug`,
      'index.html',
      'index',
    ),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets/favicons'),
          to: 'assets/favicons',
        },
        {
          from: path.resolve(__dirname, 'assets/images'),
          to: 'assets/images',
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ];

  pages.forEach((type) => {
    const key = Object.keys(type)[0];
    type[key].forEach((page) => list.push(
      packHTMLWebpackPlugin(
        `${pagesDir}/${key}/${page}/${page}.pug`,
        `${key}/${page}.html`,
        page,
      ),
    ));
  });

  return list;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './main.js',
    index: './pages/index/index.js',
    'landing-page': './pages/website/landing-page/landing-page.js',
    'search-room': './pages/website/search-room/search-room.js',
    'room-details': './pages/website/room-details/room-details.js',
    registration: './pages/website/registration/registration',
    'sign-in': './pages/website/sign-in/sign-in',
    'colors-and-type':
      './pages/ui-kit/colors-and-type/colors-and-type.js',
    'form-elements': './pages/ui-kit/form-elements/form-elements.js',
    cards: './pages/ui-kit/cards/cards.js',
    'headers-and-footers':
      './pages/ui-kit/headers-and-footers/headers-and-footers.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@comp': path.resolve(__dirname, 'src/components'),
      '@fonts': path.resolve(__dirname, 'assets/fonts'),
    },
  },
  optimization: optimization(),
  mode: isDev ? 'development' : 'production',
  devServer: {
    port: 5300,
    hot: true,
    open: true,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'webpack-import-glob-loader',
      },
      {
        test: /\.scss$/,
        use: 'webpack-import-glob-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        exclude: /fonts/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]',
        },
      },
      {
        test: /\.(ttf|woff|otf|eot|woff2)$/,
        loader: 'file-loader',
        options: {
          name: `assets/fonts/${filename('[ext]')}`,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/proposal-class-properties'],
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
};
