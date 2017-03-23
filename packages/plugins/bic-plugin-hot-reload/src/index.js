'use strict';

const webpack = require('webpack');

const log = require('@bicjs/bic-logger').get('plugin', 'hot reload');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	if (cfg.production === false) {

		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
		webpackConfig.plugins.push(new webpack.NamedModulesPlugin());

		log.debug('added');

	}

};
