/**
    Filter Data
    Author : Joseph Panuncillo
    Last Date Modified : 1/22/14

    @Description  Prototype for Filter Data
*/
define(function (require) {
    'use strict';

    /**
     * Utility function for assigning variable keys to object attributes, we'll see if we need it for other function. Stay here for the meantime.
     * @param  string key     Attribute key
     * @param  object value   Attribute value
     * @return object         generated object
     */

    function objectMaker(key, value) {
        var jsonVariable = {};
        jsonVariable[key] = value;
        return jsonVariable;
    }

    /**
     * Object that wraps new filter logics to make it usable by the system
     * @param string executeMessage Message display when filter logic is executed
     */
    /** Object that provides methods for adding new filter data */
    var FILTER_DATA = function () {
        this.filterDataCollection = [];
    };
    FILTER_DATA.prototype = {
        /**
         * add new filter data
         * @param  string key                   object ID
         * @param  function newFilterDataObject object that returns the new filter data
         */
        regFilterDataObject: function (key, newFilterDataObject) {
            this.filterDataCollection.push(objectMaker(key, newFilterDataObject));
        },
        getFilterData: function () {
            return this.filterDataCollection;
        }
    };

    return new FILTER_DATA();
});