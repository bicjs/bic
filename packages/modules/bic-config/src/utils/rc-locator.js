'use strict';

const fs = require('fs');
const path = require('path');

const resolveValue = (cfg, obj, key) => {

	return obj && obj[key] && obj[key] !== cfg[key] ? obj[key] : cfg[key];

};

module.exports = (cfg, obj) => {

	const rc = resolveValue(cfg, obj, 'rc');
	const extensions = resolveValue(cfg, obj, 'extensions');

	const filepath = path.join(cfg.file.cwd, extensions, rc);

	return fs.existsSync(filepath) ? require(filepath) : {};

};
