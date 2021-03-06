'use strict';

const config = require('@bicjs/bic-config');

const yargs = require('yargs');

const cli = yargs
	.usage('Usage: $ <command> [options]')
	.command('bic', 'Run Bic 🔥')
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
	);

// Add commands

config.cli.COMMAND_LIST.forEach(command => {

	cli
		.alias(command.alias, command.name)
		.default(command.alias, command.default)
		.describe(command.alias, command.description);

});

/**
 * `--help` or `-h`
 */
cli.help('h')
	.alias('h', 'help')
	// Fin
	.epilog('<software_version>');

/**
 * TODO: Execution order matters due to the way Node `require` caches objects.
 * (If Bic is required before CLI options are merged into config, none of the
 * the entire application will require the cached config that was required in
 * the CLI to populate the command options with defaults (from the config).)
 */

// 1. Merge CLI options into config

config.merge(cli.argv);

// 2. Init Bic

const bic = require('@bicjs/bic');

bic.init();
