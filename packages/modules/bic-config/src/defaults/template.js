'use strict';

/**
 * FIXME: Remove `fs-jetpack` and use `fs.readFileSync`
 */
const fs = require('fs-jetpack');

module.exports = (tmpl, data, callback) => {

	try {

		const html = fs.read(tmpl);

		callback(null, html);

	} catch (err) {

		callback(err);

	}

};
