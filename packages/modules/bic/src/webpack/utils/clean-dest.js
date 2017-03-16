'use strict';

const del = require('del');

const cfg = require('@bicjs/bic-config').get();

module.exports = () => {

	if (cfg.clean) {

		del.sync([
			cfg.file.absolute.dest
		]);

	}

};
