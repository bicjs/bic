'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

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
const modulesPath = require('../utils/get-modules-path');

const searchPattern = 'bic-plugin-*';

[

	path.join(modulesPath.node, '@bicjs', searchPattern),
	path.join(cfg.file.cwd, cfg.extensions, 'plugins', searchPattern)

].forEach(src => {

	requirePackages(src, webpackConfig);

});

const log = require('@bicjs/bic-logger').get('webpack config');

log.silly(webpackConfig);

module.exports = webpackConfig;
