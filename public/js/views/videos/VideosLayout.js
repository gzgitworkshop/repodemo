define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!templates/videos/videosLayout.html' );

	return Marionette.Layout.extend( {

		'initialize' : function ( options ) {
		},

		'template' : _.template( template ),
		'regions'  : {
			'videos' : '#videos'
		}
	} );

} );