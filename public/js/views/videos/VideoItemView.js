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
		'id' 	   : '5',
		'className': 'grid-box vid-thumb',

		templateHelpers: function(){
			var model = this.model.attributes
			return {
				imageUrl : model.imageUrl,
				topic : model.topic,
				duration : model.duration
			}
		},

		'onRender' : function () {
			$("#allCount").html(($("#allCount").html() * 1) + 1 )
		}
	} );

} );