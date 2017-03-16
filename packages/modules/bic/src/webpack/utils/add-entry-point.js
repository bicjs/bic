'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

const devFiles = require('./get-dev-files');

module.exports = (entryObject, entryPath) => {

	const entryName = path.dirname(entryPath);

	const getFilePath = fileName => path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryName, fileName));

	entryObject[entryName] = devFiles.concat([
		getFilePath(cfg.file.name.js),
		getFilePath(cfg.file.name.sass),
		getFilePath(cfg.file.name.tmpl)
	]);

	return entryObject;

};
