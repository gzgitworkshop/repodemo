define( function ( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var Videomodel = require( 'models/videos/VideoModel' );

	return Backbone.Collection.extend( {
		'initialize' : function ( models, options ) {
		},

		'model' : Videomodel
	} );
} );
