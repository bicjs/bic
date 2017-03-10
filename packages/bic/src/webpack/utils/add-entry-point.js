'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config');

const devFiles = require('./get-dev-files');

module.exports = (entryObject, entryPath) => {

	const entryName = path.dirname(entryPath);

	const entryScript = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryPath));
	// const entryStyle = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryName, cfg.file.bundle.sass));

	entryObject[entryName] = devFiles.concat([
		entryScript
		// ,
		// entryStyle
	]);

	return entryObject;

};

/*
const path = require('path');

const cfg = require('@bicjs/bic-config');

const devFiles = require('./get-dev-files');
const addTemplateLoader = require('./add-template-loader');

module.exports = (entryObject, entryPath, webpackConfig) => {

	const entryName = path.dirname(entryPath);

	const entryScript = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryPath));
	const entryStyle = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryName, cfg.file.bundle.sass));
	const entryTemplate = addTemplateLoader(entryName, webpackConfig);

	entryObject[entryName] = [
		entryScript,
		entryStyle,
		entryTemplate
	].concat(devFiles);

	return entryObject;

};
*/
