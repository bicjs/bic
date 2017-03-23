'use strict';

const del = require('del');

const cfg = require('@bicjs/bic-config').get();

const dir = require('./get-dest-dir');

module.exports = () => {

	if (cfg.clean) {

		del.sync([
			dir.absolute.dest
		]);

	}

};
