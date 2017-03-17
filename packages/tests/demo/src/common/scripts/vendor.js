'use strict';

import {
	attach
} from 'fastclick';

attach(document.body);

import Modernizr from 'modernizr';

if (Modernizr.promises) {

	console.log('Promises can be made.');

}
