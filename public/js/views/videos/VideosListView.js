define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var VideoItemView = require( 'views/videos/videoItemView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',

		'itemView'  : VideoItemView,

		'className' : 'inline'

	} );

} );
