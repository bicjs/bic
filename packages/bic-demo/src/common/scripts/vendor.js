'use strict';

require('fastclick').attach(document.body);

import Modernizr from 'modernizr';

if (Modernizr.promises) {

	console.log('Promises can be made.');

}
