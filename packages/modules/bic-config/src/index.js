'use strict';

const _ = require('lodash');
const deepFreeze = require('deep-freeze');

const env = require('dotenv').config();

const defaults = require('./compose/defaults');
const resource = require('./compose/resource');
const commands = require('./compose/commands');

const config = _.merge(defaults, resource, commands, env.parsed);

/**
 * ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫
 * Let it go, let it go!
 * Can't hold it back any more.
 * ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫
 */
module.exports = deepFreeze(config);