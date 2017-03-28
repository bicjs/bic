'use strict';

const path = require('path');

const source = 'src';
const common = 'common';
const manifest = 'manifest';
const vendor = 'vendor';
const pages = 'pages';
const modules = 'modules';
const modernizr = 'modernizr';
const reports = 'reports';
const dist = 'dist';
const temp = '.tmp';

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
	pages,

	// Modular resources
	modules,

	// Build 'dest' sub directories
	dist,
	temp,

	// Assets common to all app entry points
	common,

	// 3rd party vendor libraries
	vendor,

	// Modernizr
	modernizr,

	// webpack manifest
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
	name: {
		js: 'index.js',
		css: 'index.css',
		sass: 'index.scss',
		html: 'index.html',
		tmpl: 'index.ejs',
		data: 'config.json'
	}
});

module.exports = config;
