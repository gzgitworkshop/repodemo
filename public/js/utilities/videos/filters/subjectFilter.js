define( function ( require ) {
	'use strict';

	var SubjectFilter = new ( require( 'utilities/videos/RecommendLogic' ) )();
	var utility       = require( 'utilities/videos/Utility' );

	function logger ( sMsg ) {
		console.log( sMsg );
	}

	SubjectFilter.setExecuteMessage( 'Executing Subject Filter' );

	SubjectFilter.filter = function ( videoData, filterData, callback ) {

		var arFilterSubj = filterData[ 'UserData' ].subject;

		try {
			utility.filter( videoData, arFilterSubj, 'subject', function ( arResults ) {

				if ( !arResults ) {
					return callback( [] );
				}

				logger( 'Fetched filtered data' );

				//change videoData.raw reference to arHandler
				videoData.raw = null;
				videoData.raw = arResults;

				callback( videoData );

			} );
		} catch ( err ) {
			logger( err );
			callback( [] );
		}

	};

	return SubjectFilter;
} );