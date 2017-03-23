'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

const dir = require('../utils/get-dest-dir');

/**
 * TODO: Implement new caching https://webpack.js.org/guides/caching/
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.name.js);

const webpackConfig = {
	entry: {},
	context: cfg.file.absolute.source,
	output: {
		path: dir.absolute.dest,
		pathinfo: cfg.debug,
		publicPath: cfg.wp.publicPath,
		filename: defaultFilename,
		chunkFilename: defaultFilename
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
	devtool: cfg.production ? 'source-map' : 'cheap-module-eval-source-map',
	devServer: {

		// Hot: true,
		// hotOnly: true,
		quiet: cfg.debug === false,
		noInfo: cfg.debug === false,
		contentBase: dir.absolute.dest,
		publicPath: cfg.wp.publicPath,
		host: cfg.server.host,
		port: cfg.server.port,
		overlay: {
			errors: true,
			warnings: true
		},
		stats: {
			colors: true
		}
	}
};

module.exports = Object.assign({}, webpackConfig);
