define(function (require) {
    'use strict';

    //sample filter data for subject

    return function (callback) {
        callback( { subject : [ 'Technology', 'English' ], 
        		 	gradelevel: [ 'grade-1, grade-3' ] 
        		 } );
    };
});