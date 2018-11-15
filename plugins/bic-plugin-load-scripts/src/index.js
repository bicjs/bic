'use strict';

const path = require('path');
const cfg = require('@bicjs/bic-config').get();
const log = require('@bicjs/bic-logger').get('load scripts');

module.exports = webpackConfig => {

	const eslintLoader = {
		test: /\.js$/i,
		enforce: 'pre',
		use: [{
			loader: 'eslint-loader',
			options: {
				configFile: path.join(process.cwd(), '.eslintrc.json'),
				emitWarning: true,
				emitError: true,
				failOnWarning: false,
				failOnError: true,
				fix: true,
				cache: true
			}
		}],
		/**
		 * TODO: Use `include` instead of `exclude` for ESLint loader.
		 */
		exclude: [
			new RegExp(cfg.file.node)
		]
	};

	webpackConfig.module.rules.push(eslintLoader);

	log.debug('added', eslintLoader);

	const babelLoader = {
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
	};

	webpackConfig.module.rules.push(babelLoader);

	log.debug('added', babelLoader);

};
