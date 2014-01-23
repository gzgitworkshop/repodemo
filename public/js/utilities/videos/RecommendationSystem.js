/**
    Recommendation System
    Author : Joseph Panuncillo
    Last Date Modified : 1/22/14

    @Description  Prototype for Recommendation System
*/
define(function (require) {
    'use strict';

    var async = require('https://raw2.github.com/caolan/async/master/lib/async.js');

    /**
     * internal messaging, to be able to turn messaging on/off and where to display w/o scouring the source code
     * @param  string message
     */

    function logger(message) {
        //alert(message);
        console.log(message);
    }

    /** Object that provides methods for adding new filter logic */
    var RECOMMENDATION_SYSTEM = function () {
        this.recommendationLogicCollection = [];
        this.videoData = [];
        this.filterData = [];
    };
    RECOMMENDATION_SYSTEM.prototype = {
        /**
         * adds new recommendation/filter logic
         * @param  RECOMMENDATION_LOGIC instance that contains new recommendation/filter
         */
        regRecommendationLogic: function (newRecommendationLogic) {
            this.recommendationLogicCollection.push(newRecommendationLogic);
        },
        /**
         * provide video data and filter data needed by the recommendation/filter execution
         * @param object[] filterData  list of video data/meta
         * @param object[] videoData    map of distinct filter data
         */
        setParameters: function (videoData, filterData) {
            this.videoData = videoData.videoData;
            this.filterData = filterData.filterData;
        },
        setVideoData: function (newVideoData) {
            this.videoData = newVideoData;
        },
        getVideoData: function () {
            return this.videoData;
        },
        getFilterData: function () {
            return this.filterdata;
        },
        /**
         * Calls all recommendation/filter objects, executes each and the output replaces video data every iteration
         * @return final video data
         */
        execute: function () {
            var videoData = this.videoData;
            var filterData = this.filterData;
            logger(videoData);

            async.forEach(this.recommendationLogicCollection, function (obj, callback) {
                logger(obj.executeMessage);
                obj.filter(videoData, filterData, function (outputVideoData) {
                    videoData = outputVideoData;
                });
                logger(videoData);
            }, function (err) {
                logger(videoData);
            });

            return videoData;
        }
    };

    return new RECOMMENDATION_SYSTEM();
});