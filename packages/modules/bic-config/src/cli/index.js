const immutable = require('seamless-immutable');

const COMMAND = {
	clean: {
		alias: 'c',
		name: 'clean',
		description: 'Clean build directory',
		default: false
	},
	debug: {
		alias: 'd',
		name: 'debug',
		description: 'Enable debug mode',
		default: false
	},
	production: {
		alias: 'p',
		name: 'production',
		description: 'Package for production',
		default: false
	},
	open: {
		alias: 'o',
		name: 'open',
		description: 'Open in browser',
		default: false
	},
	extensions: {
		alias: 'x',
		name: 'extensions',
		description: 'Specify extensions folder',
		default: './'
	},
	rc: {
		alias: 'f',
		name: 'rc',
		description: 'Specify config file',
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
