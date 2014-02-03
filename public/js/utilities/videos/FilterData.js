/**
Filter Data
Author : Joseph Panuncillo
Last Date Modified : 1/22/14

@Description Prototype for Filter Data
*/
define( function ( require ) {
	'use strict';

	/**
	 * Object that wraps new filter logics to make it usable by the system
	 * @param string executeMessage Message display when filter logic is executed
	 */
	/** Object that provides methods for adding new filter data */
	var FilterData = function () {
		this.filterDataCollection = {};
	};

	FilterData.prototype = {
		/**
		 * add new filter data
		 * @param string key          object ID
		 * @param function newFilterDataObject object that returns the new filter data
		 */
		'regFilterDataObject' : function ( key, newFilterDataObject ) {
			this.filterDataCollection[ key ] = newFilterDataObject;
		},
		'getFilterData' : function () {
			return this.filterDataCollection;
		}
	};

	return new FilterData();
} );