const path = require('path');

module.exports = {
	debug: false,
	output: {
		filename: 'index.js',
		publicPath: './public/'
	},
	resolve: {
		modulesDirectories: ['src', 'node_modules'],
		root: path.join(__dirname, '/src'),
		extensions: ['', '.js', '.json']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
				query: {
					presets: ['es2015'],
					// plugins: ['transform-runtime', 'transform-object-rest-spread' ]
				}
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.DedupePlugin()
	]
};

