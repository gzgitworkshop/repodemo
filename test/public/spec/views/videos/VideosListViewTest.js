define( function ( require ) {
	'use strict';

	var VideosListView = require( 'views/videos/VideosListView' );

	describe( 'VideosListView Compositeview', function () {

		it('should be an instance of VideosListView Compositeview', function () {
			var videosListView = new VideosListView();
			videosListView.should.be.an.instanceof( VideosListView );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );