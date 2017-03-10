'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

/**
 * TODO: Implement new caching https://webpack.js.org/guides/caching/
 */

/**
 *  Config
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.bundle.js);

const webpackConfig = {
	entry: {},
	context: cfg.file.absolute.source,
	output: {
		path: cfg.file.absolute.dest,
		filename: defaultFilename,
		chunkFilename: defaultFilename,
		publicPath: cfg.wp.publicPath,
		pathinfo: cfg.debug
	},
	resolve: {
		alias: {},
		modules: [
			cfg.file.absolute.source,
			cfg.file.node,
			cfg.file.local
		],
		extensions: [
			'.js'
		]
	},
	// Resolve Package loaders
	resolveLoader: {
		modules: [
			cfg.file.node,
			cfg.file.local
		]
	},
	plugins: [],
	module: {
		rules: []
	},
	cache: cfg.production === false,
	devtool: cfg.production ? 'source-map' : 'cheap-module-eval-source-map'
};

module.exports = webpackConfig;
