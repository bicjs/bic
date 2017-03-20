'use strict';

const winston = require('winston');

/**
 * winston.config.npm.levels = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 */

const LEVEL = Object.keys(winston.config.npm.levels).reduce((output, key) => {

	output[key] = key;
	return output;

}, {});

let level = LEVEL.error;

module.exports = {

	LEVEL,

	setLevel: val => {

		level = val;

	},

	get: function get() {

		const labels = Array.prototype.slice.call(arguments);
		labels.unshift('🔥  bic');

		return new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					label: labels.join(' ⟶ '),
					level: level,
					colorize: true,
					timestamp: true,
					prettyPrint: true
				})
			]
		});

	}
};
