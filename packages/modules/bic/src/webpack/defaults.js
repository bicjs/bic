'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

const dir = require('../utils/get-dest-dir');

/**
 * TODO: Implement new caching [https://webpack.js.org/guides/caching/]
 */

const filename = cfg.production ? `${cfg.wp.outputChunkHash}.${cfg.file.name.js}` : cfg.file.name.js;
const outputFilename = path.join(cfg.wp.outputName, filename);

const webpackConfig = {
	entry: {},
	context: cfg.file.absolute.source,
	output: {
		path: dir.absolute.dest,
		pathinfo: cfg.debug,
		publicPath: cfg.wp.publicPath,
		filename: outputFilename,
		chunkFilename: outputFilename
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
			// Add asset Information
			assets: true,
			// Sort assets by a field
			assetsSort: 'field',
			// Add information about cached (not built) modules
			cached: true,
			// Add children information
			children: true,
			// Add chunk information (setting this to `false` allows for a less verbose output)
			chunks: true,
			// Add built modules information to chunk information
			chunkModules: true,
			// Add the origins of chunks and chunk merging info
			chunkOrigins: true,
			// Sort the chunks by a field
			chunksSort: 'field',
			// Context directory for request shortening
			context: '../src/',
			// `webpack --colors` equivalent
			colors: true,
			// Add errors
			errors: true,
			// Add details to errors (like resolving log)
			errorDetails: true,
			// Add the hash of the compilation
			hash: true,
			// Add built modules information
			modules: true,
			// Sort the modules by a field
			modulesSort: 'field',
			// Add public path information
			publicPath: true,
			// Add information about the reasons why modules are included
			reasons: true,
			// Add the source code of modules
			source: true,
			// Add timing information
			timings: true,
			// Add webpack version information
			version: true,
			// Add warnings
			warnings: true
		}
	}
};

module.exports = Object.assign({}, webpackConfig);
