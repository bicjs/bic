'use strict';

const winston = require('winston');

// winston.config.npm.levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

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

	get: (label = '') => {

		return new (winston.Logger)({
			transports: [
				new (winston.transports.Console)({
					label: `🔥  bic ⟶ ${label}`,
					level: level,
					colorize: true,
					timestamp: true,
					prettyPrint: true
				})
			]
		});

	}
};
