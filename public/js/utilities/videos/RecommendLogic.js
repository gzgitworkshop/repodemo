define(function (require) {
    'use strict';

    /**
     * Object that wraps new filter logics to make it usable by the system
     * @param string executeMessage Message display when filter logic is executed
     */
    var RECOMMENDATION_LOGIC = function (executeMessage) {
        this.executeMessage = executeMessage;
    };
    RECOMMENDATION_LOGIC.prototype = {
        /**
         * function to be overridden to contain new recommendation/filter logic
         * @param object[] filterData  list of video data/meta
         * @param object[] videoData   map of distinct filter data
         * @return object[] ist of video data/meta
         */
        filter: function (videoData, filterdata, callback) {
            //do nothing
        },
        setExecuteMessage: function (executeMessage) {
            this.executeMessage = executeMessage;
        }
    };

    return new RECOMMENDATION_LOGIC("Executing Filter!");
});