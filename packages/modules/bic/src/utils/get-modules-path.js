'use strict';

/**
 * This util is necessary to develop with NPM link.
 * TODO: But it is though?
 */

const path = require('path');

const NODE_MODULES = 'node_modules';

const projectRoot = require('./get-project-root');

const projectModules = path.join(projectRoot, NODE_MODULES);

module.exports = {
	root: projectRoot,
	node: projectModules
};
