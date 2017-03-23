'use strict';

const logger = require('@bicjs/bic-logger');

const config = require('@bicjs/bic-config');

const cfg = config.get();

logger.setLevel(cfg.debug ? logger.LEVEL.debug : logger.LEVEL.error);

const log = logger.get('init');

const webpackConfig = require('./webpack/config');

const cleanDest = require('./utils/clean-dest');

const buildDevelopment = require('./build/development');
const buildProduction = require('./build/production');

log.debug(cfg);

const init = () => {

	log.info('start');

	cleanDest();

	if (cfg.production === true) {

		buildProduction(webpackConfig);

	} else {

		buildDevelopment(webpackConfig);

	}

};

module.exports = {
	init
};
