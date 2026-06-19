const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const moduleFileExtensions = [
    'web.tsx', 'web.ts', 'web.jsx', 'web.js',
    'tsx', 'ts', 'jsx', 'js',
];

module.exports = {
    mode: 'development',

    entry: path.join(__dirname, 'index.web.js'),

    output: {
        path: path.resolve(__dirname, 'dist-web'),
        filename: 'app.[contenthash].js',
        clean: true,
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(js|jsx|ts|tsx|mjs)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        babelrc: false,
                        configFile: false,
                        presets: [
                            ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
                            ['@babel/preset-react', { runtime: 'automatic' }],
                            '@babel/preset-typescript',
                        ],
                        plugins: [
                            ['@babel/plugin-transform-class-properties', { loose: true }],
                            ['@babel/plugin-transform-private-methods', { loose: true }],
                            ['@babel/plugin-transform-private-property-in-object', { loose: true }],
                        ],
                    },
                },
                // Transform source files and key react-native-* packages
                exclude: /node_modules\/(?!(react-native-web|react-native-safe-area-context|react-native-screens|react-native-gesture-handler|react-native-vector-icons|@react-native-vector-icons|@react-navigation|react-native-linear-gradient)\/).*/,
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[name][ext]',
                },
            },
        ],
    },

    resolve: {
        extensions: moduleFileExtensions.map(ext => `.${ext}`),
        alias: {
            // Map react-native to react-native-web
            'react-native$': 'react-native-web',
            // Stub optional native-only modules that have no web equivalent
            'expo-font': false,
            '@react-native-vector-icons/get-image': false,
        },
    },

    plugins: [
        new webpack.IgnorePlugin({ resourceRegExp: /^expo-font$/ }),
        new webpack.IgnorePlugin({ resourceRegExp: /^@react-native-vector-icons\/get-image$/ }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
        }),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
            watch: false,
        },
        port: 3000,
        hot: false,
        liveReload: true,
        open: false,
        historyApiFallback: true,
    },

    watchOptions: {
        ignored: [
            '**/node_modules/**',
            '**/dist-web/**',
            '**/android/**',
            '**/ios/**',
            '**/vendor/**',
        ],
    },

    devtool: 'cheap-module-source-map',
};
