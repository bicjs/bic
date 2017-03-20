'use strict';

const glob = require('globby');

const cfg = require('@bicjs/bic-config').get();

module.exports = webpackConfig => {

	/**
	 * Import loader presets
	 * TODO: Import project loaders
	 */

	glob.sync([
		'**/bic-loader-*'
	], {
		cwd: cfg.file.absolute.node
	})
		.map(loaderName => require(loaderName))
		.forEach(loader => loader(webpackConfig));

};
