const webpack = require('webpack');
const path = require('path');

module.exports =  {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		path.resolve(__dirname,'./src/entry.js')
	],
	output: {
		path: path.join(__dirname,'./build'),
		public: '/build',
		filename: 'bundle.js'
	},
	module: {
        loaders: [
            { test: /\.js[x]?$/, loader: "jsx!babel"},
            { test: /\.css$/, loader: "style!css"},
            { test: /\.scss$/, loader: "style!css!sass"},
            { test: /\.svg$/, loader: "url?limit=8192"}
        ]
    },
    resolve: {
    	extensions: ['', '.js', '.jsx'],
  	}
};