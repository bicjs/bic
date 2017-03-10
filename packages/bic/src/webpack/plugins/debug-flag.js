'use strict';

const webpack = require('webpack');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({
		minimize: false,
		debug: true
	}));

	webpackConfig.plugins.push(new webpack.DefinePlugin({
		debug: true
	}));

};
