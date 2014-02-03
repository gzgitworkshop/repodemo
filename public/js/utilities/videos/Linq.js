define( function ( require ) {
	'use strict';

	require( 'http://cdn.bootcss.com/linq.js/2.2.0.2/linq.js' );

	return function ( obj ) {
		return Enumerable.From( obj );
	};
} );