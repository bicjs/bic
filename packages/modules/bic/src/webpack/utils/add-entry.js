'use strict';

const glob = require('globby');

const cfg = require('@bicjs/bic-config').get();

const addEntryPoint = require('./add-entry-point');

module.exports = webpackConfig => {

	webpackConfig.entry = glob.sync(
			cfg.pattern.js, {
				cwd: cfg.file.absolute.pages
			})
		.reduce((entryObject, entryPath) => {

			return addEntryPoint(entryObject, entryPath, webpackConfig);

		}, {});

};
