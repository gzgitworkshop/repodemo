define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var $           = require( 'jquery' );
	var Backbone    = require( 'backbone' );
	var Marionette  = require( 'marionette' );
	var async       = require( 'async' );

	var applications = {};
	var collections  = {
		'VideoCollection' : require( 'collections/videos/VideoCollection' )
	};
	var components   = {};
	var layouts      = {
		'VideosLayout' : require( 'views/videos/VideosLayout' )
	};
	var views        = {
		'VideosListView' : require( 'views/videos/VideosListView' ),
		'VideoItemView'  : require( 'views/videos/VideoItemView' ),
		'ErrorView'      : require( 'views/ErrorView' )
	};
	var util = require('utilities/videos/Recommend');

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			return this;
		},

		'showDefault' : function ( actions ) {
			var layout = this._setContent( layouts.VideosLayout );

			util( function ( data ) {
				var collection = new collections.VideoCollection( data );
				var videosView = new views.VideosListView( { 'collection' : collection } );
				layout.videos.show( videosView );
			} );
		},


		// ## Region management methods

		'_setContent' : function ( View, options ) {
			var view;
			if ( typeof View === 'function' ) {
				options = options || {};
				view    = new View( options );
			} else {
				view = View;
			}
			this.regions.content.show( view );

			return view;
		},

		// ## Middleware functions ( checkSession )

		// general error handler to display an errorview in the `content` region
		'_errorHandler' : function ( error ) {
			// Show login page ?  or show limited functionality ?
			if ( _.isObject( error ) ) {
				if ( error.name === 'SessionError' ) {
					if ( Backbone.history.fragment !== 'login' ) {
						this.requestedRoute = Backbone.history.fragment;
					}
					return this.App.Router.navigate( 'login', { 'trigger' : true } );
				}
				// if there's no message, but there is a xhr statusText
				else if ( !error.message && error.statusText ) {
					error.message = error.statusText;
				}
			}
			// if just a string
			else {
				error = { 'message' : error };
			}
			this._setContent( views.ErrorView, { 'model' : new Backbone.Model( error ) } );
		},

		// global $.ajax error handler
		'_ajaxErrorHandler' : function ( e, xhr, settings, exception ) {
			var subURI = e.delegateTarget.documentURI.split( '#' );
			var error;
			var responseTextObj;

			if ( subURI[ 1 ] === 'login' ) {
				if ( xhr.responseText !== 'Unauthorized' ) {

					responseTextObj = JSON.parse( xhr.responseText );

					// setting 'target' : 'loginForm' will attempt to display the error on the form
					error = {
						'msg'        : responseTextObj.message,
						'type'       : 'error',
						'status'     : xhr.status,
						'statusText' : xhr.statusText,
						'target'     : 'login'

					};
				} else {
					error = {
						'msg'        : xhr.responseText,
						'type'       : 'error',
						'status'     : xhr.status,
						'statusText' : xhr.statusText
					};
				}
			} else {
				responseTextObj = JSON.parse( xhr.responseText );

				error = {
					'msg'        : responseTextObj.message,
					'type'       : 'error',
					'status'     : xhr.status,
					'statusText' : xhr.statusText
				};
			}

			this._errorHandler( error );
		}

	} );

} );