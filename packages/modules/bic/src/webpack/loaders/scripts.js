'use strict';

const cfg = require('@bicjs/bic-config');

module.exports = webpackConfig => {

	// ESLint

	webpackConfig.module.rules.push({
		test: /\.js$/i,
		enforce: 'pre',
		use: [{
			loader: 'eslint-loader',
			options: {
				emitWarning: true,
				emitError: true,
				failOnWarning: false,
				failOnError: true,
				fix: true,
				cache: true,
				configFile: 'eslint-config-bic'
			}
		}],
		/**
		 * TODO: Use `include` instead of `exclude` for ESLint loader.
		 * @type {Array}
		 */
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

	// Babel

	webpackConfig.module.rules.push({
		test: /\.js$/i,
		use: [{
			loader: 'babel-loader',
			options: {
				cacheDirectory: !cfg.production
			}
		}],
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
