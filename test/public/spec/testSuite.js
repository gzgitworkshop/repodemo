define( function () {
	'use strict';

	/* return an array of specs to be run */
	return {
		'specs' : [ 'spec/collections/videos/VideoCollectionTest.js',
		'spec/controllers/AppControllerTest.js',
		'spec/models/videos/VideoModelTest.js',
		'spec/views/videos/VideoItemViewTest.js',
		'spec/views/videos/VideosLayoutTest.js',
		'spec/views/videos/VideosListViewTest.js',
		'spec/utilities/videos/filters/gradeFilterTest.js',
		'spec/utilities/videos/filters/subjectFilterTest.js'
		 ]
	};
} );
