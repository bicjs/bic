'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

module.exports = (uid, loaders) => {

	if (cfg.cached === true && cfg.production === false) {

		loaders.unshift({
			loader: 'cached-loader',
			query: {
				cacheDirectory: cfg.file.cached,
				cacheIdentifier: path.join(cfg.file.cached, `cached-${uid}`)
			}
		});

	}

	return loaders;

};
