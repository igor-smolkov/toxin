const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

// определение режима сборки
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// имена файлов
const imagesDir = 'images';
const faviconsDir = 'favicons';
const fontsDir = 'fonts';
const pagesDir = 'pages';
const pages = [
  { 'ui-kit': ['colors-and-type', 'form-elements', 'cards', 'headers-and-footers'] },
  { website: ['landing-page', 'search-room', 'room-details', 'registration', 'sign-in'] },
];

// сборка имен
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

// оптимизация
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

// добавление лоадеров css и его препроцессоров
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

// формирование списка плагинов
const plugins = () => {
  const packHTMLWebpackPlugin = (input, output, chunk) => new HTMLWebpackPlugin({
    template: `./${input}`,
    filename: output,
    minify: {
      collapseWhitespace: isProd,
    },
    chunks: ['main', chunk],
    favicon: `${faviconsDir}/favicon.ico`,
  });

  const list = [
    packHTMLWebpackPlugin('index.pug', 'index.html'),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, `src/${imagesDir}/`), to: imagesDir },
        { from: path.resolve(__dirname, `src/${faviconsDir}/`) },
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
    main: './script.js',
    'landing-page': './pages/website/landing-page/landing-page.js',
    'search-room': './pages/website/search-room/search-room.js',
    'room-details': './pages/website/room-details/room-details.js',
    registration: './pages/website/registration/registration',
    'sign-in': './pages/website/sign-in/sign-in',
    'colors-and-type': './pages/ui-kit/colors-and-type/colors-and-type.js',
    'form-elements': './pages/ui-kit/form-elements/form-elements.js',
    cards: './pages/ui-kit/cards/cards.js',
    'headers-and-footers': './pages/ui-kit/headers-and-footers/headers-and-footers.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@comp': path.resolve(__dirname, 'src/components'), // алиас на компоненты
    },
  },
  optimization: optimization(),
  devServer: {
    port: 5200,
    hot: isDev,
    open: true,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
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
          name: `${imagesDir}/${filename('[ext]')}`,
        },
      },
      {
        test: /\.(ttf|woff|otf|eot|svg|woff2)$/,
        loader: 'file-loader',
        options: {
          name: `${fontsDir}/${filename('[ext]')}`,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
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
