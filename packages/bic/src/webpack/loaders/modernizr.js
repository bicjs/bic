'use strict';

/**
 * TODO: Inline Modernizr JS into `<head>`.
 */

const path = require('path');
const fs = require('fs-jetpack');

const cfg = require('@bicjs/bic-config');

const projectRoot = require('../utils/get-project-root');

const resourceConfigPath = path.resolve(projectRoot, '.modernizr-autorc');

module.exports = webpackConfig => {

	if (fs.exists(resourceConfigPath)) {

		if (cfg.debug === false) {

			/**
			 * NOTE: Disables output from Customizr
			 */
			process.argv.push('--quiet');

		} else {

			/**
			 * NOTE: Increases output from Customizr
			 */
			process.argv.push('--verbose');

		}

		webpackConfig.module.rules.push({
			test: /\.modernizr-autorc$/,
			use: {
				loader: 'modernizr-auto-loader'
			}
		});

		webpackConfig
			.resolve
			.alias
			.modernizr$ = resourceConfigPath;

	}

};
