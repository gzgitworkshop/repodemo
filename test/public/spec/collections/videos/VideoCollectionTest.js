define( function ( require ) {
	'use strict';

	var VideoCollection = require( 'collections/videos/VideoCollection' );

	describe( 'VideoCollection Collection', function () {

		it('should be an instance of VideoCollection Collection', function () {
			var videoCollection = new VideoCollection();
			videoCollection.should.be.an.instanceof( VideoCollection );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );