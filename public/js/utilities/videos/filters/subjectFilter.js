define(function(require) {
    'use strict';

    var subjectFilter = new(require('utilities/videos/RecommendLogic'))();
    var utility = require('utilities/videos/Utility');

    function logger(sMsg) {
        console.log(sMsg);
    }

    subjectFilter.setExecuteMessage('Executing Subject Filter');

    subjectFilter.filter = function(videoData, filterData, callback) {

	console.log('------- SUBJECT --------');
	console.log(filterData);
	console.log(filterData['UserData']);
	console.log(filterData['UserData'].subject);
        var arFilterSubj = filterData['UserData'].subject;

        try {
            utility.filter(videoData, arFilterSubj, 'subject', function(arResults) {

                if (!arResults) {
                    return callback([]);
                }

                logger('Fetched filtered data');

                //change videoData.raw reference to arHandler
                videoData.raw = null;
                videoData.raw = arResults;

                callback(videoData);

            });
        } catch (err) {
            logger(err);
            callback([]);
        }

    };

    return subjectFilter;
});