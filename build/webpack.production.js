const webpack = require('webpack');
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const getEntries = require('./getEntries')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

baseConfig.vue.loaders = {
    css: ExtractTextPlugin.extract({
        loader: "css-loader",
        fallbackLoader: "vue-style-loader"
    })
}

const productionConf = merge(baseConfig, {
    entry: getEntries(),
    stats: { children: false },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new OptimizeCssAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: { discardComments: {removeAll: true } },
          canPrint: true
        }),
        new ExtractTextPlugin('css/[name].css')
    ]
})

module.exports = productionConf