'use strict';

const config = require('@bicjs/bic-config');

const cfg = config.get();

const logger = require('@bicjs/bic-logger');

logger.setLevel(cfg.debug ? logger.LEVEL.debug : logger.LEVEL.error);

const log = logger.get('init');

const webpackConfig = require('../webpack.config');

const buildDevelopment = require('./webpack/build/development');
const buildProduction = require('./webpack/build/production');

log.debug(cfg);

const init = () => {

	log.info('start');

	if (cfg.production === true) {

		buildProduction(webpackConfig);

	} else {

		buildDevelopment(webpackConfig);

	}

};

module.exports = {
	init
};
