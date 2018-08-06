const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const demoPath = path.resolve(__dirname, 'demo');
const distPath = path.resolve(__dirname, 'demo', 'dist');

let postPlugins = [
    // require('postcss-cssnext')(),
    require('autoprefixer')({ browsers: ['last 2 version', 'Safari 5', 'Firefox 14', 'IE >= 9', 'iOS 7'] }),
    // require('cssnano')()
]
let config = {
    entry: {
        demo: `${demoPath}/index.js`
    },
    output: {
        path: distPath,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(scss)$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                { loader: 'postcss-loader', options: {
                    plugins: () => postPlugins
                }},
                'sass-loader'
            ]
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
        }]
    },
    plugins: [
        new CleanWebpackPlugin(distPath),
        new MiniCssExtractPlugin({
            path: distPath,
            filename: '[name].css'
        }),
    ],
    devServer: {
        contentBase: demoPath,
        publicPath: '/dist/',
        host: '0.0.0.0',
        port: 10086, // 默认8080
        inline: true, // 可以监控js变化
        hot: false,
        // disableHostCheck: true,
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
        config.watch = true;
    }

    if (argv.mode === 'production') {
        postPlugins.push(require('cssnano')());
    }

    return config;
};