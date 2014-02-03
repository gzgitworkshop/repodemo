// NOT PART OF THE ACTUAL CODE!
// THIS IS ONLY FOR TESTING AND DEMO!
// ALL LOGIC/FLOW CREATED WITHOUT THOUGHT OF OPTIMIZATION/ CODING STANDARD
// FOR DELETION WHEN ACTUAL API COMES
require( [ 'jquery' ], function ( $ ) {
	'use strict';

	function formParam () {
		var _sub = [];
		var _gra = [];
		var _obj = $( 'input' ).serializeArray();

		if ( _obj ) {
			for ( var _objIndex in _obj ) {
				if ( _obj[ _objIndex ].name === 'sub' ) {
					_sub.push( _obj[ _objIndex ].value );
				} else {
					_gra.push( _obj[ _objIndex ].value );
				}
			}
		}
		return '?sub=[' + _sub + ']&gra=[' + _gra + ']';
	}

	//peek behavior of user status pane
	$( '#peek' ).on( 'mouseenter', function () {
		var _this = $( this );

		_this.animate( {
			left : '0px'
		}, 500 ).removeClass( 'open' );
	} );

	//peek behavior of user status pane
	$( '#peek' ).on( 'mouseleave', function () {
		var _this = $( this );

		_this.animate( {
			left : '-205px'
		}, 500 ).addClass( 'open' );
	} );

	//bind selected tags to app
	$( '#reLogin' ).click( function () {
		var _param     = formParam();
		var isInIframe = false;

		if ( isInIframe ) {
			$( parent.document ).find( 'iframe' ).attr( 'src', '/resources/5048e5d0e5e7fb620900005d/public/index.html' + _param );
		} else {
			var _winloc          = window.location.href.split( '?' )[ 0 ];
			window.location.href = _winloc + _param;
		}
	} );
	//harvest data from url

	function getURLParameter ( name ) {
		return decodeURIComponent(
			(
				new RegExp( '[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)' ).exec( location.search ) || [, '']
			 )[1].replace( /\+/g, '%20' )
		) || null;
	}
	//match ticked tags
	$.ajax( {
		'url'      : 'http://zubu.cloudapp.net:8888/subjects.json?ts = ' + ( new Date().getTime() ),
		'type'     : 'GET',
		'dataType' : 'json',
		'success'  : function ( data ) {
			if ( data ) {
				addTicks( '#sublist', 'sub', data.subjects );
				addTicks( '#gradlist', 'gra', data.grades );
			}
		},
		'error' : function ( err ) {}
	} );
	//get ticked tags

	function fetchSelected ( paramObj ) {
		if ( paramObj ) {
			return JSON.parse( paramObj );
		}
		return [];
	}
	//bind ticked tags

	function addTicks ( selector, key, collection ) {
		var parentCollection = fetchSelected( getURLParameter( key ) );

		for ( var _objIndex in collection ) {
			var _input = $( '<input />' ).attr( 'type', 'checkbox' ).attr( 'name', key ).attr( 'value', _objIndex );

			if ( parentCollection.indexOf( parseInt( _objIndex, 10 ) ) > -1 ) {
				_input.attr( 'checked', 'checked' );
			}

			$( selector ).append(
				$( '<li />' ).addClass( 'lLink' ).append( _input ).append( collection[ _objIndex ] )
			);
		}
	}
} );