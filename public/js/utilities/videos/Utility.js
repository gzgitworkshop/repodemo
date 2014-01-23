/**
    Recommendation Architecture
    Author : 
    Last Date Modified : 

    @Description  Generic utility functions or tools.
 **/
    
define(function (require) {
    'use strict';

    var async = require('https://raw2.github.com/caolan/async/master/lib/async.js');

    var NOT_FOUND = -1;

    function logger(sMsg) {
    	console.log(sMsg);
    };

    var UTILITY = function () {
    };

    UTILITY.prototype = {

    	/**
    	* Returns an array of objects to the callback function basing from the filter data input
    	* @params videoData {Object}
    	* @params filterData {Array}
    	**/

    	filter : function(videoData, filterData, callback) {

    		/**
    		* TODO: optimize the code below or change the code below into a more 'english' code
    		* research some other techniques in filtering where filter data input is an array and
    		* data to be filtered is also an array
    		*/

			var arFilterHandler = []; //handler of filtered data

			//loop within a loop
			var arFilter = filterData;
			
			///handler of videos to be filtered - feed in the for each
			var arVideoRaw = videoData.raw; 
			//handler of videos to be filtered - value will be assign to arVideoRaw
			var arVideoHandler = [];

			var err = null;

			async.forEach(arFilter , function(obj, callback) {

				var sFilter = obj.toString();
				async.forEach( arVideoRaw, function(obj, callback){

					var arTags = obj.attributes.tags;
					var sTags = arTags.toString() + ',';

					if(sTags.search(sFilter) !== -1) {
						arFilterHandler.push(obj);//filtered
					} else {
						arVideoHandler.push(obj);//unfiltered
					}

				} , function (err) {
					logger("final = " + JSON.stringfy(videoData));
				});
				
				arVideoRaw = null;
				arVideoRaw = arVideoHandler;


			} , function (err) {
				logger("final = " + JSON.stringfy(videoData));
			});
			
			if(!arFilterHandler.length) {
				err = "No Filter Data";
			}

			callback(err, arFilterHandler);
		}

    }

    return new UTILITY();
});