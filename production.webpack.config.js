const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	name: 'server',
	plugins: [new webpack.NamedModulesPlugin(), new webpack.ProgressPlugin()],
	target: 'node',
	entry: ['./src/server.js'],
	externals: {},
	output: {
		publicPath: './build',
		path: path.resolve(__dirname, './build'),
		filename: 'main.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				loader: 'babel-loader',
				options: {
					babelrc: true,
				},
			},
		],
	},
	optimization: {
		nodeEnv: false,
		minimize: false,
	},
	node: {
		__dirname: false,
		__filename: false,
	},
};
