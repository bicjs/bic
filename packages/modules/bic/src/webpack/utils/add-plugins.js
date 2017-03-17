'use strict';

const path = require('path');

const cfg = require('@bicjs/bic-config').get();

const DEFAULT_MODE = 'default';

/**
 * TODO: Import project plugins
 */

module.exports = webpackConfig => {

	const reportStatus = (name, mode, flag, status) => {

		if (cfg.debug === true) {

			console.info(`${status} '${name}' plugin while ${mode} mode is ${flag || flag === undefined ? 'active' : 'inactive'}.`);

		}

	};

	const reportWarn = (name, mode) => {

		if (cfg.debug === true) {

			console.warn(`No ${mode} mode for '${name}' plugin.`);

		}

	};

	const filterPlugin = (list, key) => {

		let mode = DEFAULT_MODE;

		const pair = key.split(':');

		let name = pair[0];

		if (pair.length === 2) {

			mode = name;
			name = pair[1];

		}

		const omitPrefix = `no-`;
		const omit = mode.indexOf(omitPrefix) === 0;

		if (omit) {

			mode = mode.split(omitPrefix)[1];

		}

		const flag = cfg[mode];

		let isLoading = false;

		if (flag === true || mode === DEFAULT_MODE) {

			isLoading = !omit;

		} else if (flag === false) {

			isLoading = omit;

		} else {

			// Not in default mode, flag not found
			reportWarn(name, mode);

		}

		if (isLoading) {

			reportStatus(name, mode, flag, 'Loading');

			list.push(name);

		} else {

			reportStatus(name, mode, flag, 'Skipping');

		}

		return list;

	};

	const loadPlugin = name => {

		/* eslint-disable import/no-dynamic-require */
		require(path.join('../plugins', name))(webpackConfig);
		/* eslint-enable import/no-dynamic-require */

	};

	/**
	 * TODO: Check if if plugin init order really matters. (Current setup is hacky.)
	 */

	[
		// Skip in production
		'no-production:hot-module',
		// Load in debug
		'debug:debug-flag',
		// Load always
		'use-strict',
		'lint-styles',
		/**
		 * TODO: Make code splitting optional?
		 */
		'common-chunks',
		'split-path',
		// Load in production
		/**
		 * TODO: Progress is broken
		 */
		// 'production:show-progress',
		'production:stats-graph',
		'production:optimize-output',
		// Open
		'open:open-browser'

	].reduce(filterPlugin, [])
		.forEach(loadPlugin);

};
