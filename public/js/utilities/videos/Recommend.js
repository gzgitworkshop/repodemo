define(function (require) {
    'use strict';

    var async = require('https://raw2.github.com/caolan/async/master/lib/async.js');
    var filterData = require('utilities/videos/FilterData');
    var recommendationSystem = require('utilities/videos/RecommendationSystem');
    var sources = {
        'videoInfo': require('utilities/videos/data/videoInfoSource')
    };

    recommendationSystem.regRecommendationLogic(require('utilities/videos/filters/sampleFilter'));
    require('utilities/videos/data/sampleFilterData')(function (newFilterdata) {
        filterData.regFilterDataObject("first", newFilterdata);
    });

    /**
     * to facilitate fetching of both video data and filter data
     * @param  object waterFallCallback mandatory async.waterfall parameter
     */

    function fetchInputs(waterFallCallback) {
        /**
         * Since there is a big possibility that data are fetched asynchronously, functions for fetching data are wrapped in async.series
         */
        async.series([
        /**
         * fetching video data/info
         */
        function (seriesCallback) {
            videoInfo(seriesCallback);
        },
        /**
         * fetching filter data
         */
        function (seriesCallback) {
            seriesCallback(null, {
                filterData: filterData.getFilterData()
            });
        }],
        /**
         * video data and filter data are combined into one array - results
         */

        function (err, results) {
            waterFallCallback(null, results);
        });
    }

    /**
     * performs actual filtering of video data
     * @param  object[] filter data and video data
     * @param  object waterFallCallback mandatory async.waterfall parameter
     */

    function recommedationSystem(inputData, waterFallCallback) {
        recommendationSystem.setParameters(inputData[0], inputData[1]);
        waterFallCallback(null, recommendationSystem.execute());
    }

    /**
     * since there is a big possibility that data accural and filter operations might be asychronous, function are wrapped in async.waterfall
     */

    function recommend(callback) {
        async.waterfall([
        /**
         * performs data accural
         * @param  object waterFallCallback mandatory async.waterfall parameter
         */
        function (waterFallCallback) {
            fetchInputs(waterFallCallback);
        },
        /**
         * performs filtering
         * @param  object[] inputData results from data accural
         * @param  object waterFallCallback mandatory async.waterfall parameter
         */
        function (inputData, waterFallCallback) {
            recommedationSystem(inputData, waterFallCallback);
        }], function (err, result) {
            /**
             * Contains final filtered output, will be modified when applied to the actual resource app to output the video data directly
             */
            callback(result.reserved ? result.reserved.concat(result.raw) : result.raw);
        });
    }

    /**
     * function to be overriden to add the approriate video data
     * @param  object seriesCallback mandatory async.series parameter
     */

    function videoInfo(seriesCallback) {
        seriesCallback(null, {
            videoData: {
                reserved: [],
                raw: sources.videoInfo
            }
        });
    }


    return function (callback) {
        recommend(function (result) {
            callback(result);
        });

    };
});