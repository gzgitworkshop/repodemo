define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!templates/videos/videoItemView.html' );

	return Marionette.ItemView.extend( {

		'initialize' : function ( options ) {
		},

		'template' : _.template( template ),
		'ui'       : {},
		'events'   : {},
		
		'tagName'  : 'li',

		'onRender' : function () {}
	} );

} );