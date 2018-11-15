'use strict';

/**
 * TODO: Consider https://github.com/pinojs/pino
 */
const {
	config,
	createLogger,
	format,
	transports
} = require('winston');
const {
	combine,
	colorize,
	timestamp,
	label,
	printf
} = format;

/**
 * Winston.config.npm.levels = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 */

const LEVEL = Object.keys(config.npm.levels).reduce((output, key) => {

	output[key] = key;
	return output;

}, {});

let level = LEVEL.error;

module.exports = {

	LEVEL,

	setLevel: val => {

		level = val;

	},

	get: function get(...labels) {

		return createLogger({
			level,
			format: combine(
				label({
					label: labels.join(' • ')
				}),
				colorize({
					all: true
				}),
				timestamp(),
				printf(info => `🔥 ${info.level} [${info.label}] ⟶ ${info.message}`)
			),
			transports: [new transports.Console()]
		});

	}
};
