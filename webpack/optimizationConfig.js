const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const reactModules = {
    'react-dom': true,
    react: true,
    scheduler: true,
};
const isReactModules = (moduleName) => Boolean(reactModules[moduleName]);

const budarinPackagesPath = path.resolve('./node_modules/@budarin/');

const optimizationConfig = {
    minimize: true,
    mergeDuplicateChunks: true,
    runtimeChunk: {
        name: 'runtime',
    },
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
            default: false,
            defaultVendors: false,
            npms: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                    const packageName = module.context.match(
                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                    )[1];

                    // console.log('---packageName---:', packageName);

                    if (isReactModules(packageName)) {
                        return 'react';
                    }

                    if (packageName === '@budarin') {
                        return 'budarin';
                    }

                    return 'npms';
                },
                chunks: 'all',
                enforce: true,
            },
        },
    },
};

optimizationConfig.minimizer = [
    new TerserPlugin({
        parallel: true,
        sideEffects: true,
        extractComments: false,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                hoist_funs: true,
                module: true,
                toplevel: true,
            },
            mangle: true,
            keep_classnames: false,
            keep_fnames: false,
            output: {
                comments: false,
            },
        },
    }),
];

module.exports = {
    optimizationConfig,
};
