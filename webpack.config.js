const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// TODO add deploiment webpack file 
module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: [
		"babel-polyfill",
		path.join(__dirname, './src/js/index.js')
	],

	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			title: '挖金矿',
			template: './src/index.html', //指定要打包的html路径和文件名
			filename: '../dist/index.html' //指定输出路径和文件名
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[chunkhash:8].css",
		}),
		new CopyWebpackPlugin([
			{ from: 'src/images/', to: 'images/' }
		], {
			ignore: [],
			debug: 'debug',
			copyUnmodified: true
		}),
	],

	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel-loader',

				options: {
					plugins: ['syntax-dynamic-import'],

					presets: [
						[
							'@babel/preset-env',
							{
								modules: false
							}
						]
					]
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader',
					'postcss-loader'
				]
			}
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		host: '0.0.0.0',
		port: 8081,
		quiet: true,
	}
};
