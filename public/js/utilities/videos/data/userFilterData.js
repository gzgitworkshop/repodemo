define(function(require) {
    'use strict';

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }

    var role = getURLParameter('role');
    role = role ? role + "/" : "";

    return function(callback) {
        $.ajax({
            url: "http://zubu.cloudapp.net:8888/" + role + "userData1.json",
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