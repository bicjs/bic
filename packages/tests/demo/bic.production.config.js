'use strict';

console.info('Loading: bic config – PRODUCTION');

const config = require('./bic.config');

module.exports = Object.assign(config, {
	canWeAddAnythingHere: true
});
