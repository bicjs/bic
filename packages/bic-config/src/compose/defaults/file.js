'use strict';

const path = require('path');
const argv = require('yargs').argv;

const source = 'src';
const common = 'common';
const manifest = 'manifest';
const vendor = 'vendor';
const reports = 'reports';
const dist = 'dist';
const temp = '.tmp';
const dest = argv.production || argv.p ? dist : temp;

// console.log('argv', argv);

const config = {
	cwd: process.cwd()
};

const directories = {

	/**
	 *  Application & Presentation
	 */

	// Presentation layer source
	source,

	// Page specific resources
	pages: path.join(source, 'pages'),

	// Modular resources
	modules: path.join(source, 'modules'),

	// Build 'dest' sub directories
	dist,
	temp,
	dest,

	// Performance plugin directories
	happypack: path.join(dest, '.happypack'),
	cached: path.join(dest, '.cached'),

	// Assets common to all app entry points
	common,

	// 3rd party vendor libraries
	vendor,

	/**
	 * TODO: Figure out why a manifest needs to be split out...
	 */
	manifest,

	// Reports, graphs, etc.
	reports,

	// These 'common' map 1:1 from source to dest, and so are useful for copying
	favicons: path.join(common, 'favicons'),
	images: path.join(common, 'images'),
	fonts: path.join(common, 'fonts'),
	data: path.join(common, 'data'),

	// Packages, libraries, pre-NPM modules
	node: 'node_modules',
	local: 'local_modules'
};

// Good for webpack
directories.absolute = Object.keys(directories)
	.reduce((absolute, key) => {

		absolute[key] = path.join(config.cwd, directories[key]);

		return absolute;

	}, {});

// Add file names
Object.assign(config, directories, {
	index: 'index',
	config: 'config',
	extensions: {
		js: 'js',
		css: 'css',
		sass: 'scss',
		html: 'html',
		tmpl: 'ejs'
	}
});

module.exports = config;
