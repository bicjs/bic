'use strict';

const _ = require('lodash');

var config = {
	url: 'https://www.bicjs.com',
	common: {
		title: 'Prototype App',
		images: [
			'/common/images/a/test-1.jpg',
			'/common/images/a/test-2.jpg',
			'/common/images/b/test-1.jpg',
			'/common/images/b/test-2.jpg'
		]
	},

	template: (tmpl, data, callback) => {

		try {

			const html = _.template(tmpl)(data);

			callback(null, html);

		} catch (err) {

			console.log(err);

			callback(err);

		}

	}

};

console.info('Loading: bic config – DEFAULT');

module.exports = config;
