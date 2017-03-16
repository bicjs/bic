'use strict';

const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
	webpackConfig.plugins.push(new CaseSensitivePathsPlugin());

};
