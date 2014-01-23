define(function (require) {
    'use strict';

    var subjectFilter = new (require('utilities/videos/RecommendLogic'))();
    var utility      = require('utilities/videos/Utility');

    function logger(sMsg) {
      console.log(sMsg);
    }

    subjectFilter.setExecuteMessage('Executing Subject Filter');

    subjectFilter.filter = function (videoData, filterData, callback) {

      var arFilterSubj = filterData['UserData'].subject;

      utility.filter(videoData, arFilterSubj, function( err, arResults ) {

        if(err) {
          logger('Err: ' + err);
          return callback(err);
        }

        logger('Fetched filtered data');

        //change videoData.raw reference to arHandler
        videoData.raw = null;
        videoData.raw = arResults;
        callback(videoData);

      });

    };

    return subjectFilter;
});