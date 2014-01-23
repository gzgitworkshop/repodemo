define(function (require) {
    'use strict';

    var subjectFilter = require('utilities/videos/RecommendLogic');
    var utility      = require('utilities/videos/Utility');


    
    subjectFilter.filter = function (videoData, filterdata, callback) {
    
    //console.log(filterdata);
    //onsole.log(constants.SUBJECT_INDEX_LEVEL);
    //console.log(filterdata[constants.SUBJECT_INDEX_LEVEL]);

    var arFilterSubj = filterdata[0].UserData.subject;
    utility.filter(videoData, arFilterSubj, function( arResults ) {

      //change videoData.raw reference to arHandler
      videoData.raw = null;
      videoData.raw = arResults;
   
    });

   callback(videoData);
    
    };

    return subjectFilter;
});