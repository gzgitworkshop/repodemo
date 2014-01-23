define(function (require) {
    'use strict';

    var gradeFilter = require('utilities/videos/RecommendLogic');
    var utility      = require('utilities/videos/Utility');

    gradeFilter.setExecuteMessage('Executing Grade Filter');

    gradeFilter.filter = function (videoData, filterdata, callback) {

      var arFilterGrade = filterdata['UserData'].gradelevel;
      utility.filter(videoData, arFilterGrade, function( arResults ) {

	//change videoData.raw reference to arHandler
	videoData.raw = null;
	videoData.raw = arResults;

      });

      callback(videoData);

    };

    return gradeFilter;
});