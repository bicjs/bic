'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

const devFiles = require('./get-dev-files');

module.exports = (entryObject, entryPath) => {

	const entryName = path.dirname(entryPath);

	const getFilePath = fileName => path.join(cfg.file.pages, entryName, fileName);

	entryObject[entryName] = devFiles.concat([
		getFilePath(cfg.file.name.js),
		getFilePath(cfg.file.name.sass)
	]);

	return entryObject;

};
