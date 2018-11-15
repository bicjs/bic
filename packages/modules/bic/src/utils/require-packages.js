'use strict';

/**
 * TODO: Replace globby with fs-jetpack.find
 */
const glob = require('globby');

const log = require('@bicjs/bic-logger').get('require packages');

module.exports = (src, webpackConfig) => {

	log.debug('searching', src);

	const packages = glob.sync(src, {
		onlyFiles: false
	});

	log.debug('found', packages);

	packages
		.map(name => require(name))
		.forEach(pkg => pkg(webpackConfig));

};
