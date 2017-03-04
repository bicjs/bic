'use strict';

const parseQuery = require('loader-utils').parseQuery;

module.exports = function passthroughLoader(source) {

	const config = getConfig(this.options, parseQuery(this.query));

	if (config.callback && typeof config.callback === 'function') {

		config.callback(source, this);

	} else {

		throwError('No callback is defined');

	}

};

function getConfig(options, query) {

	return options.passthroughLoader ||
    options.passthrough ||
    options[query.config];

}

function throwError(message) {

	const err = new Error('passthrough-loader\n' + message);

	Error.captureStackTrace(err, module.exports);

	throw err;

}
