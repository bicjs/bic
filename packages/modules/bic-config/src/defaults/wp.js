'use strict';

const config = {

	/**
	 * Inline base64 URLs for <=8k images, direct URLs for the rest
	 * @type {Number}
	 */
	maxInlineFileSizeLimit: Infinity,
	// MaxInlineFileSizeLimit: 8192,

	/**
	 * Output file name
	 * @type {String}
	 */
	outputName: '[name]',

	/**
	 * Output file hash
	 * @type {String}
	 */
	outputHash: '[hash]',

	/**
	 * Output file chunk hash
	 * @type {String}
	 */
	outputChunkHash: '[chunkhash]',

	/**
	 * Output file content hash
	 * @type {String}
	 */
	outputContentHash: '[contenthash]',

	/**
	 * Output file path
	 * @type {String}
	 */
	outputPath: '[path][name].[ext]',

	/**
	 * Output hash file path
	 * @type {String}
	 */
	outputHashPath: '[path][hash].[name].[ext]',

	/**
	 * Output chunk hash file path
	 * @type {String}
	 */
	outputChunkHashPath: '[path][chunkhash].[name].[ext]',

	/**
	 * Output content hash file path
	 * @type {String}
	 */
	outputContentHashPath: '[path][contenthash].[name].[ext]',

	/**
	 * Prefix for output file paths
	 * @type {String}
	 */
	publicPath: '/',

	/**
	 * Debugging stats
	 * @type {Object}
	 * @see {@link https://webpack.js.org/configuration/stats/#stats|Stats}
	 */
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

};

module.exports = config;
