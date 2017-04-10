const immutable = require('seamless-immutable');

const logger = require('@bicjs/bic-logger');

const COMMAND = {
	log: {
		alias: 'l',
		name: 'log',
		description: 'Specify log level',
		type: 'string',
		choices: Object.keys(logger.LEVEL),
		default: logger.LEVEL.error
	},
	debug: {
		alias: 'd',
		name: 'debug',
		description: 'Enable debug mode',
		type: 'boolean',
		default: false
	},
	production: {
		alias: 'p',
		name: 'production',
		description: 'Enable production mode',
		type: 'boolean',
		default: false
	},
	clean: {
		alias: 'c',
		name: 'clean',
		description: 'Clean build directory',
		type: 'boolean',
		default: false
	},
	open: {
		alias: 'o',
		name: 'open',
		description: 'Open in browser',
		type: 'boolean',
		default: false
	},
	extensions: {
		alias: 'x',
		name: 'extensions',
		description: 'Specify extensions folder',
		type: 'string',
		default: '.'
	},
	rc: {
		alias: 'f',
		name: 'rc',
		description: 'Specify config file',
		type: 'string',
		default: 'config.default.js'
	}
};

const COMMAND_LIST = Object.keys(COMMAND).reduce((output, key) => {

	output.push(COMMAND[key]);
	return output;

}, []);

const DEFAULTS = Object.keys(COMMAND).reduce((output, key) => {

	output[key] = COMMAND[key].default;
	return output;

}, {});

module.exports = immutable({
	COMMAND,
	COMMAND_LIST,
	DEFAULTS
});
