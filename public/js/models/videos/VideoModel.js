define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'initialize' : function () {
		},

		'defaults' : {},
		
		'idAttribute' : '_id',
		'urlRoot'     : '/users'

    } );
} );
