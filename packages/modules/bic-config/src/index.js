'use strict';

// Add `.env` vars to `process.env` vars
const dotenv = require('dotenv');
dotenv.load();

const immutable = require('seamless-immutable');

// Collect default settings
const DEFAULTS = require('req-all')('./defaults');

// Create config object and make immutable
let cfg = immutable(DEFAULTS);

// Finds `bic.config.js`
const rcLocator = require('./utils/rc-locator');

// Config merge method
const merge = obj => {

	// Merge `rc` first, as the location may have been overrriden by new config
	cfg = immutable.merge(cfg, rcLocator(cfg, obj));

	// Merge new config
	cfg = immutable.merge(cfg, obj);

	// Return updated config
	return cfg;

};

// Merge CLI defaults
const cli = require('./cli');

merge(cli.DEFAULTS);

module.exports = {
	get: () => cfg,
	merge,
	cli
};
