define(function (require) {
    'use strict';

    var async = require('https://raw2.github.com/caolan/async/master/lib/async.js');

    var NOT_FOUND = -1;

    var UTILITY = function () {
    };

    UTILITY.prototype = {

    	/**
    	* Returns an array of objects basing from the filter data input
    	* @params videoData {Object}
    	* @params filterData {Array}
    	**/

    	filter : function(videoData, filterData, callback) {

			var arFilterHandler = [];
			//loop within a loop
			//var arFilter = ['computer', 'technology'];
			var arFilter = filterData;
			
			var arVideoRaw = videoData.raw;
			var arVideoHandler = [];

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


			callback(arFilterHandler);
		}

    }

    return new UTILITY();
});