define( function( require ) {
    'use strict';

    var linq = require('utilities/videos/Linq');

    function getURLParameter( name ) {
        return decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1]
            .replace(/\+/g, '%20')
        ) || null;
    }

    var demoObj = {
        subject    : [],
        gradelevel : []
    };

    function fetchSelected ( paramObj ) {
        if ( paramObj ) {
            return JSON.parse( paramObj );
        }
        return [];
    }

    return function ( callback ) {
        $.ajax({
            url      : 'http://zubu.cloudapp.net:8888/subjects.json?ts=' + (new Date().getTime()),
            type     : 'GET',
            dataType : 'json',
            success  : function(data) {

                demoObj.subject = fetchSelected(getURLParameter('sub'));
                demoObj.gradelevel = fetchSelected(getURLParameter('gra'));

                // for (var i in demoObj.subject) {
                //     demoObj.subject[i] = data.subjects[demoObj.subject[i]].toLowerCase();
                // }
                // for (var i in demoObj.gradelevel) {
                //     demoObj.gradelevel[i] = data.grades[demoObj.gradelevel[i]].toLowerCase();
                // }

                demoObj.subject = linq(demoObj.subject).Select(function(obj){ return data.subjects[obj]; }).ToArray();
                demoObj.gradelevel = linq(demoObj.gradelevel).Select(function(obj){ return data.grades[obj]; }).ToArray();

                callback(demoObj);
            },
            error: function(err) {}
        });
    };
});