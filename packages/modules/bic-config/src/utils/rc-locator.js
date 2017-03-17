'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (cfg, obj) => {

	console.log('>>> obj.rc', obj.rc);

	const filename = obj && obj.rc && obj.rc !== cfg.rc ? obj.rc : cfg.rc;

	const filepath = path.resolve(process.cwd(), filename);

	return fs.existsSync(filepath) ? require(filepath) : {};

};
