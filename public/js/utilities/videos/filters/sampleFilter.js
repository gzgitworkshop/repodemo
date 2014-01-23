define(function (require) {
    'use strict';

    var sampleFilter = new (require('utilities/videos/RecommendLogic'))();

    sampleFilter.filter = function (videoData, filterdata, callback) {
        videoData.raw.splice(3, 1);
        callback(videoData);
    };

    return sampleFilter;
});