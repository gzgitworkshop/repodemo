define( function( require ) {
    'use strict';

    require('http://cdn.bootcss.com/linq.js/2.2.0.2/linq.js');

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

    function linq(obj){
        return Enumerable.From(obj);
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

                console.log(data);
                console.log(linq(data.subjects).Select( obj => obj ).ToArray());

                callback(demoObj);
            },
            error: function(err) {}
        });
    };
});