define(function (require) {
    'use strict';

    var sampleFilter = require('utilities/videos/RecommendLogic');

    sampleFilter.filter = function (videoData, filterdata, callback) {
        videoData.raw.splice(3, 1);
        console.log(filterdata);
        callback(videoData);
    };

    return sampleFilter;
});