'use strict';

const cfg = require('@bicjs/bic-config');

const getResourceConfig = require('../utils/get-resource-config');

const eslintConfig = getResourceConfig('eslint');
const babelConfig = getResourceConfig('babel');

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
				configFile: eslintConfig
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
				cacheDirectory: !cfg.production,
				extends: babelConfig
			}
		}],
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
