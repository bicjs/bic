'use strict';

const path = require('path');
const fs = require('fs');

const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('load modernizr');

const resourceConfigPath = path.resolve(cfg.file.cwd, '.modernizr-autorc');

/**
 * TODO: Inline Modernizr JS into `<head>`.
 */

module.exports = webpackConfig => {

	if (fs.existsSync(resourceConfigPath)) {

		log.debug(resourceConfigPath);

		log.profile('start');

		if (cfg.debug === false) {

			/**
			 * Disables output from Customizr
			 */
			process.argv.push('--quiet');

		} else {

			/**
			 * Increases output from Customizr
			 */
			process.argv.push('--verbose');

		}

		const modernizrLoader = {
			test: /\.modernizr-autorc$/,
			use: {
				loader: 'modernizr-auto-loader'
			}
		};

		log.debug(modernizrLoader);

		webpackConfig.module.rules.push(modernizrLoader);

		webpackConfig
			.resolve
			.alias
			.modernizr$ = resourceConfigPath;

		log.info('loaded');

		log.profile('start');

	}

};
