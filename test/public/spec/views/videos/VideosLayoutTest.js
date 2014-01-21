define( function ( require ) {
	'use strict';

	var VideosLayout = require( 'views/videos/VideosLayout' );

	describe( 'VideosLayout Layout', function () {

		it('should be an instance of VideosLayout Layout', function () {
			var videosLayout = new VideosLayout();
			videosLayout.should.be.an.instanceof( VideosLayout );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );