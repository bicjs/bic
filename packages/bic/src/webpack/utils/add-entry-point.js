'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

module.exports = (entryObject, entryPath) => {

	const entryName = path.dirname(entryPath);

	const entryScript = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryPath));

	entryObject[entryName] = entryScript;

	return entryObject;

};
