var path = require('path');
module.exports = {
	entry: {
		loading : './src/js/page/loading.js'
	},
	output: {
		path : 'dist/js/page',
		filename: '[name].js'
	},
	module: {
		loaders: [
                { test: /\.css$/, loader: 'style-loader!css-loader' },
                { test: /\.js$/, loader: 'jsx-loader?harmony' },
                { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
                { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}

		]
	},
	resolve:{
		extensions: ['','.js','.json','.scss'],
	}
};