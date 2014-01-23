define(function(require) {
    'use strict';

    //sample filter data for subject

    return function(callback) {
        $.ajax({
            url: "http://localhost:8888/userData1.json",
            type: "GET",
            dataType: "json",
            success: function(data) {
            	console.log(data);
                callback(data);
            },
            error: function(xhr, status, error) {
                callback([]);
            }
        });
    };
});