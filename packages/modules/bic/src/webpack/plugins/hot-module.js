'use strict';

const webpack = require('webpack');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
	webpackConfig.plugins.push(new webpack.NamedModulesPlugin());

};
