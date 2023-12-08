const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    HtmlWebpackPlugin,
    CopyPlugin,
    WebpackAssetsManifest,
    TerserPlugin,
    DefinePlugin: webpack.DefinePlugin,
};
