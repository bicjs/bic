'use strict';

const path = require('path');

const commands = require('./commands');

const resourceConfigPath = path.resolve(process.cwd(), commands.biconfig);

module.exports = require(resourceConfigPath); // eslint-disable-line no-dynamic-require
