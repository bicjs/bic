'use strict';

const cfg = require('@bicjs/bic-config').get();

module.exports = cfg.production ? {
	dest: cfg.file.dist,
	absolute: {
		dest: cfg.file.absolute.dist
	}
} : {
	dest: cfg.file.temp,
	absolute: {
		dest: cfg.file.absolute.temp
	}
};
