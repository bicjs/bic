'use strict';

const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		sourceMap: cfg.debug,
		compress: {
			warnings: true
		}
	}));

	webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
		cssProcessorOptions: {
			discardComments: {
				removeAll: true
			}
		}
	}));

};
