'use strict';

const webpack = require('webpack');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const log = require('@bicjs/bic-logger').get('plugin', 'optimize output');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production === true) {

		log.profile('start');

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

		/**
		 * TODO: Add [`PurifyCSSPlugin`](https://github.com/webpack-contrib/purifycss-webpack)
		 */

		log.info('added');

		log.profile('start');

	}

};
