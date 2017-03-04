'use strict';

const fs = require('fs-jetpack');
const _ = require('lodash');

var config = {
	public: {
		data: {
			title: 'Prototype App',
			images: [
				'/common/images/a/test-1.jpg',
				'/common/images/a/test-2.jpg',
				'/common/images/b/test-1.jpg',
				'/common/images/b/test-2.jpg'
			]
		}
	},

	template: (loader, options) => {

		return _.template(fs.read(loader.resourcePath))(options);

	}

};

console.info('Loading: bic config – DEFAULT');

module.exports = config;
