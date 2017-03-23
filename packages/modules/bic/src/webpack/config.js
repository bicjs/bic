'use strict';

const webpackConfig = require('./defaults');

/**
 * Add entry points (plugins may depend on these being defined)
 */
const addEntry = require('../utils/add-entry');

addEntry(webpackConfig);

/**
 * Add loaders & plugins
 */
const requirePackages = require('../utils/require-packages');

requirePackages('**/bic-loader-*', webpackConfig);
requirePackages('**/bic-plugin-*', webpackConfig);

require('@bicjs/bic-logger')
	.get('webpack config')
	.debug(webpackConfig);

module.exports = webpackConfig;
