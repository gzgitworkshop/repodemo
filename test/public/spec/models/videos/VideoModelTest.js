define( function ( require ) {
	'use strict';

	var VideoModel = require( 'models/videos/VideoModel' );

	describe( 'VideoModel Model', function () {

		it('should be an instance of VideoModel Model', function () {
			var videoModel = new VideoModel();
			videoModel.should.be.an.instanceof( VideoModel );
		} );

		it('should have more test written', function () {
			( false ).should.be.ok;
		} );
	} );

} );