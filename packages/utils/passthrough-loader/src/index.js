'use strict';

const getOptions = require('loader-utils').getOptions;

module.exports = function passthroughLoader(content) {

	const options = getOptions(this);

	if (options.callback && typeof options.callback === 'function') {

		options.callback.call(this, content);

	} else {

		throwError('No callback is defined');

	}

};

function throwError(message) {

	const err = new Error('passthrough-loader\n' + message);

	Error.captureStackTrace(err, module.exports);

	throw err;

}
