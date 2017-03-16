'use strict';

const logger = require('@bicjs/bic-logger');
const config = require('@bicjs/bic-config');

const webpackConfig = require('../webpack.config');

const buildDevelopment = require('./webpack/build/development');
const buildProduction = require('./webpack/build/production');

const cfg = config.get();

logger.setLevel(cfg.debug ? logger.LEVEL.debug : logger.LEVEL.error);

const log = logger.get('init');

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
