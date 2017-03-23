'use strict';

const path = require('path');
const glob = require('globby');

const log = require('@bicjs/bic-logger').get('require packages');
const cfg = require('@bicjs/bic-config').get();

const modulesPath = require('./get-modules-path');

module.exports = (searchPattern, webpackConfig) => {

	/**
	 * Import framework presets
	 * TODO: Import project presets
	 */

	const src = [
		path.join(modulesPath.node, searchPattern),
		path.join(cfg.file.cwd, cfg.extensions, searchPattern)
	];

	log.debug('searching', src);

	const packages = glob.sync(src);

	log.debug('found', packages);

	packages
		.map(name => require(name))
		.forEach(pkg => pkg(webpackConfig));

};
