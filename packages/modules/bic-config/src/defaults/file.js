'use strict';

const path = require('path');

const config = {
	cwd: process.cwd()
};

const directories = {

	// Packages, libraries, pre-NPM modules
	node: 'node_modules',
	local: 'local_modules',

	// Presentation layer source
	source: 'src',

	// Build 'dest' sub directories
	dist: 'dist',
	temp: '.tmp'
};

// Good for webpack
directories.absolute = Object.keys(directories)
	.reduce((absolute, key) => {

		absolute[key] = path.join(config.cwd, directories[key]);

		return absolute;

	}, {});

const common = 'common';

Object.assign(config, directories,

	{
		// Assets common to all app entry points
		common,
		favicons: path.join(common, 'favicons'),
		images: path.join(common, 'images'),
		fonts: path.join(common, 'fonts'),
		data: path.join(common, 'data'),

		// Page specific resources
		pages: 'pages',

		// Modular resources
		modules: 'modules',

		// 3rd party vendor libraries
		vendor: 'vendor',

		// Modernizr
		modernizr: 'modernizr',

		// webpack manifest
		manifest: 'manifest',

		// Reports, graphs, etc.
		reports: 'reports'
	},

	{
		// Add File names
		name: {
			js: 'index.js',
			css: 'index.css',
			sass: 'index.scss',
			html: 'index.html',
			tmpl: 'index.ejs',
			data: 'config.json',
			favicon: 'favicon.png'
		}
	}
);

module.exports = config;
