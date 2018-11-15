'use strict';

const path = require('path');
const glob = require('globby');

const cfg = require('@bicjs/bic-config').get();

const addEntryPoint = require('./add-entry-point');

module.exports = webpackConfig => {

	webpackConfig.entry = glob.sync(
		cfg.pattern.js, {
			cwd: path.join(cfg.file.absolute.source, cfg.file.pages)
		})
		.reduce((entryObject, entryPath) => {

			return addEntryPoint(entryObject, entryPath, webpackConfig);

		}, {});

};
