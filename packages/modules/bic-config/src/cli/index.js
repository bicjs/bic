const immutable = require('seamless-immutable');

const COMMAND = {
	production: {
		alias: 'p',
		name: 'production',
		description: 'Package for production',
		default: false
	},
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
	open: {
		alias: 'o',
		name: 'open',
		description: 'Open in browser (production)',
		default: false
	},
	rc: {
		alias: 'f',
		/**
		 * FIXME: Change config argument something less clever once CLI is abstracted.
		 * (conflicting with `webpack-dev-server --config=...`)
		 */
		name: 'rc',
		description: 'Specify config file',
		default: 'bic.config.js'
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
