'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

const devFiles = require('./get-dev-files');

module.exports = (entryObject, entryPath) => {

	const entryName = path.dirname(entryPath);

	const getFilePath = bundleName => path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryName, bundleName));

	entryObject[entryName] = devFiles.concat([
		getFilePath(cfg.file.bundle.js),
		getFilePath(cfg.file.bundle.sass),
		getFilePath(cfg.file.bundle.tmpl)
	]);

	return entryObject;

};
