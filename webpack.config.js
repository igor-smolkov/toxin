const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

//определение режима сборки
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

//имена файлов
const entryPoint = 'script.js'
const baseTemplate = 'index.pug'
const outputHTML = 'index.html'

const pagesDir = 'pages'
const pages = [
    { 'ui-kit' : ['colors-and-type', 'form-elements', 'cards', 'headers-and-footers'] }, 
    { 'website' : ['registration', 'sign-in', 'room-details', 'search-room-1', 'search-room-2', 'search-room-3', 'landing-page-1', 'landing-page-2', 'landing-page-3'] }
]

//сборка имен
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

//оптимизация
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

//добавление лоадеров css и его препроцессоров
const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        }, 
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

const plugins = () => {
    const list = [
        toHTMLPage(baseTemplate, outputHTML),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css') //имя выходного css файла
        })
    ]

    pages.forEach(type => {
        const key = Object.keys(type)[0]
        type[key].forEach(page => list.push(
            toHTMLPage(`${pagesDir}/${key}/${page}/${page}.pug`, `${pagesDir}/${key}/${page}.html`)
        ))
    })

    function toHTMLPage (input, output) {
        return new HTMLWebpackPlugin({
            template: `./${input}`,
            filename: output,
            minify: {
                collapseWhitespace: isProd
            }
        })
    }

    return list
}

module.exports = {
    context: path.resolve(__dirname, 'src'), //папка исходников
    entry: {
        main: [
            '@babel/polyfill',
            `./${entryPoint}`
        ]
    }, //входная точка сборки
    output: {
        filename: filename('js'), //выходной файл приложения
        path: path.resolve(__dirname, 'dist') //папка сборки
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), //алиас на паку исходников
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    }
}