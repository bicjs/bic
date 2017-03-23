'use strict';

const path = require('path');
const webpack = require('webpack');

const log = require('@bicjs/bic-logger').get('plugin', 'common chunks');
const cfg = require('@bicjs/bic-config').get();

/**
 * TODO: Disable `common` JS if `webpackConfig.entry.length === 1`.
 */

module.exports = webpackConfig => {

	if (cfg.production === true) {

		const options = {
			name: cfg.file.common,
			filename: path.join(cfg.wp.outputName, cfg.file.name.js),
			chunks: Object.keys(webpackConfig.entry).reduce((arr, key) => {

				arr.push(key);

				return arr;

			}, [])
		};

		webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin(options));

		log.debug('added', options);

	}

};
