const path = require('path');
const config = require('@budarin/spa-react-app-config').webpackConfigs.getClientConfig();

const HtmlWebpackPlugin = require('@budarin/spa-react-app-config').getWebpackPlugins().HtmlWebpackPlugin;

module.exports = {
    ...config,

    plugins: [
        ...config.plugins,

        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            inject: 'body',
        }),
    ],
};
