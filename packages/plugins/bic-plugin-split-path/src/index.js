'use strict';

const SplitByPathPlugin = require('webpack-split-by-path');

const log = require('@bicjs/bic-logger').get('plugin', 'split path');
const cfg = require('@bicjs/bic-config').get();

/**
 * TODO: Optimize code code splitting by combining `manifest` and `common` JS.
 */

module.exports = webpackConfig => {

	if (cfg.production === true) {

		webpackConfig.plugins.push(new SplitByPathPlugin([{
			name: cfg.file.vendor,
			path: cfg.file.absolute.node
		}], {
			manifest: cfg.file.manifest
		}));

		log.debug('added');

	}

};
