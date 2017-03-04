'use strict';

const OPTIONS = {
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
	config: {
		alias: 'f',
		name: 'config',
		description: 'Specify config file',
		default: 'bic.config.js'
	}
};

const yargs = require('yargs');

const argv = yargs
	.usage('Usage: $ <command> [options]')
	.command('bic', 'Run Full Metal Webpack 🍹')
	.example(
		`
		  $ bic -p -c -d -o -f bic.config.file.js

		`,
		`
			1) Package for production
			2) Clean build directory
			3) Run debug mode
		 	4) Open in browser
		 	5) Specify config file
		`
	)
	/**
	 * `--production` or `-p`
	 */
	.alias(OPTIONS.production.alias, OPTIONS.production.name)
	.boolean(OPTIONS.production.alias)
	.default(OPTIONS.production.alias, OPTIONS.production.default)
	.describe(OPTIONS.production.alias, OPTIONS.production.description)
	/**
	 * `--clean` or `-c`
	 */
	.alias(OPTIONS.clean.alias, OPTIONS.clean.name)
	.boolean(OPTIONS.clean.alias)
	.default(OPTIONS.clean.name, OPTIONS.clean.default)
	.describe(OPTIONS.clean.alias, OPTIONS.clean.description)
	/**
	 * `--debug` or `-d`
	 */
	.alias(OPTIONS.debug.alias, OPTIONS.debug.name)
	.boolean(OPTIONS.debug.alias)
	.default(OPTIONS.debug.alias, OPTIONS.debug.default)
	.describe(OPTIONS.debug.alias, OPTIONS.debug.description)
	/**
	 * `--open` or `-o`
	 */
	.alias(OPTIONS.open.alias, OPTIONS.open.name)
	.boolean(OPTIONS.open.alias)
	.default(OPTIONS.open.alias, OPTIONS.open.default)
	.describe(OPTIONS.open.alias, OPTIONS.open.description)
	/**
	 * `--config bic.config.file.js` or `-rc bic.config.file.js`
	 */
	.alias(OPTIONS.config.alias, OPTIONS.config.name)
	.string(OPTIONS.config.alias)
	.default(OPTIONS.config.name, OPTIONS.config.default)
	.describe(OPTIONS.config.alias, OPTIONS.config.description)
	/**
	 * `--help` or `-h`
	 */
	.help('h')
	.alias('h', 'help')
	// Fin
	.epilog('<software_version>')
	.argv;

module.exports = argv;
