'use strict';

const webpack = require('webpack');

const log = require('@bicjs/bic-logger').get('plugin', 'debug flag');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({
		minimize: !cfg.debug,
		debug: cfg.debug
	}));

	webpackConfig.plugins.push(new webpack.DefinePlugin({
		DEBUG: cfg.debug
	}));

	log.debug('added', cfg.debug);

};
