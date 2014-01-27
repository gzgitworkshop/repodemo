/**
    Recommendation Architecture
    Author :
    Last Date Modified :

    @Description  Generic utility functions or tools.
 **/

define(function (require) {
    'use strict';

    var async = require('async');

    var NOT_FOUND = -1;

    function logger(sMsg) {
		console.log(sMsg);
    }

    var UTILITY = function () {
    };

    UTILITY.prototype = {
/**
* Returns an array of objects to the callback function basing from the filter data input
* @params videoData {Object}
* @params filterData {Array}
**/

		filter : function( videoData, filterData, sFilterType, callback ) {

			if(videoData === null || filterData === null) {

				return callback(null);
			}
/**
* TODO: optimize the code below or change the code below into a more 'english' code
* research some other techniques in filtering where filter data input is an array and
* data to be filtered is also an array
*/
			//handler of videos to be filtered in each iteration of filtered data arrays
			var arVideoRaw = videoData.raw;

			if(!filterData || !filterData.length) {
				return callback(videoData.raw);

			} else {
				//handler of unfiltered vids - feed to second loop
				var arVideoHandler = [];
				//handler of filtered vids
				var arFilterHandler = [];

				async.forEach(filterData , function(obj, filtercallback) {

					var sFilter = obj.toString();

					async.forEach( arVideoRaw, function(obj, videocallback){

						var arTags = obj.attributes.tags[sFilterType];

						if( $.inArray( sFilter , arTags ) !== NOT_FOUND) { //found
							arFilterHandler.push(obj);//filtered
						} else {
							arVideoHandler.push(obj);//unfiltered
						}

					} , function (  ) {
						logger( 'Video loop done' );
					});

					arVideoRaw = null;
					arVideoRaw = arVideoHandler;
					filtercallback(  );

				} , function ( err ) {
					logger( 'Filter data loop done' );
					callback( arFilterHandler );
				});

			}

		}

    }

    return new UTILITY();
});