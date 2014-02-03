define( function ( require ) {
    'use strict';

    var SampleFilter = new( require( 'utilities/videos/RecommendLogic' ) )();

    SampleFilter.filter = function ( videoData, filterdata, callback ) {
        videoData.raw.splice( 3, 1 );
        callback( videoData );
    };

    return SampleFilter;
});