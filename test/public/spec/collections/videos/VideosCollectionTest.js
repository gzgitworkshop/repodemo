define( function ( require ) {
	'use strict';

	var VideosCollection = require( 'collections/videos/VideosCollection' );

	describe( 'VideosCollection Collection', function () {

		it('should be an instance of VideosCollection Collection', function () {
			var videosCollection = new VideosCollection();
			videosCollection.should.be.an.instanceof( VideosCollection );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );