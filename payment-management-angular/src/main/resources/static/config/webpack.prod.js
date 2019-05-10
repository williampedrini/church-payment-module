module.exports = function () {

    const Path = require('path');
    const WebPack = require("webpack");
    const CopyWebpackPlugin = require('copy-webpack-plugin');
    const ExtractTextPlugin = require('extract-text-webpack-plugin');

    return {
        entry: "./app/app.module",
        output: {
            path: Path.join(__dirname, '..', '..', 'public', 'build'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    use: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.(css|scss)$/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader']
                    })
                },
                {
                    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('style.css'),
            new WebPack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new WebPack.optimize.UglifyJsPlugin({
                include: /\.js$/,
                minimize: true
            }),
            new CopyWebpackPlugin([
                {
                    from: Path.join(__dirname, '..', 'app', 'shared', 'environment', 'translate', 'locale'),
                    to: 'locale'
                },
                {
                    from: Path.join(__dirname, '..', 'assets', 'images'),
                    to: 'assets/images'
                }
            ])
        ]
    };
};