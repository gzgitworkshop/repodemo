define( function ( require ) {
	'use strict';

	var VideoItemView = require( 'views/videos/VideoItemView' );

	describe( 'VideoItemView Itemview', function () {

		it('should be an instance of VideoItemView Itemview', function () {
			var videoItemView = new VideoItemView();
			videoItemView.should.be.an.instanceof( VideoItemView );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );