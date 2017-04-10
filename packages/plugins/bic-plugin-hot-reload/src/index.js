'use strict';

const webpack = require('webpack');

const log = require('@bicjs/bic-logger').get('plugin', 'hot reload');
const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	log.profile('start');

	if (cfg.production === true) {

		webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin());

	} else {

		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
		webpackConfig.plugins.push(new webpack.NamedModulesPlugin());

	}

	log.info('added');

	log.profile('start');

};
