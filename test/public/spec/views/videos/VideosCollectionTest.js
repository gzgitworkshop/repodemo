define( function ( require ) {
	'use strict';

	var VideosCollection = require( 'views/videos/VideosCollection' );

	describe( 'VideosCollection Compositeview', function () {

		it('should be an instance of VideosCollection Compositeview', function () {
			var videosCollection = new VideosCollection();
			videosCollection.should.be.an.instanceof( VideosCollection );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );