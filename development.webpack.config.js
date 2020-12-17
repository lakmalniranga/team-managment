const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	devtool: 'eval-source-map',
	externals: [nodeExternals({})],
	name: 'server',
	plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
	optimization: {
		minimize: false,
		nodeEnv: false,
	},
	target: 'node',
	entry: ['./src/server.js'],
	output: {
		publicPath: './build',
		path: path.resolve(__dirname, './build'),
		filename: 'main.js',
		libraryTarget: 'commonjs2',
		hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
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
			{
				test: /\.(json)$/,
				loader: 'special-loader',
				type: 'javascript/auto',
			},
		],
	},
	node: {
		__dirname: false,
		__filename: false,
	},
};
