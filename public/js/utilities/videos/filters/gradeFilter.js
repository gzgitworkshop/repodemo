define(function (require) {
    'use strict';

    var gradeFilter = new (require('utilities/videos/RecommendLogic'))();
    var utility      = require('utilities/videos/Utility');

    function logger(sMsg) {
      console.log(sMsg);
    }

   gradeFilter.setExecuteMessage('Executing Grade Filter');

  gradeFilter.filter = function (videoData, filterdata, callback) {

    var arFilterGrade = filterdata['UserData'].gradelevel;


    utility.filter(videoData, arFilterGrade, function( arResults ) {

      if( !arResults ) {
        return callback([]);
      }

      logger('Fetched filtered data');

      //change videoData.raw reference to arHandler
      videoData.raw = null;
      videoData.raw = arResults;
      callback(videoData);

    });

    };

    return gradeFilter;
});