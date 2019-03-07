const path = require('path');
const webpack = require("webpack");
const merge = require('webpack-merge');
const copyWebpackPlugin = require('copy-webpack-plugin')

const baseConfig = {
    module: {
        rules:[
            {
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/react'
                        ]
                }              
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    node: {
        __dirname: false,
    }
};

// main
const mainConfig = merge(baseConfig, {
    entry : {
        main  : './app/main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    target: 'electron-main',
    plugins: [
            new copyWebpackPlugin([
                {
                from: './app/index.html',
                toType: 'file'
                },
            ])
        ], 
});

// renderer
const rendererConfig = merge(baseConfig, {
    entry : {
        entry : './app/renderer.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    target: 'electron-renderer',
});

module.exports = [mainConfig, rendererConfig]

