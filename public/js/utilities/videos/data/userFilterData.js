define(function(require) {
    'use strict';

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null;
    }

    // var role = getURLParameter('role');
    // role = role ? role + '/' : '';

    // return function(callback) {
    //     $.ajax({
    //         url: 'http://zubu.cloudapp.net:8888/' + role + 'userData1.json?ts=' + (new Date().getTime()),
    //         type: 'GET',
    //         dataType: 'json',
    //         success: function(data) {
    //             callback(data);
    //         },
    //         error: function(xhr, status, error) {
    //             callback([]);
    //         }
    //     });
    // };

    var demoObj = {
        'subject': [],
        'gradelevel': []
    };

    return function(callback) {
        $.ajax({
            url: "http://zubu.cloudapp.net:8888/subjects.json?ts=" + (new Date().getTime()),
            type: "GET",
            dataType: "json",
            success: function(data) {
                var sub = getURLParameter('sub');
                var gra = getURLParameter('gra');

                //for demo only eval() will be removed
                if (sub) {
                    eval("demoObj.subject = " + sub + ";");
                }
                if (gra) {
                    eval("demoObj.gradelevel = " + gra + ";");
                }

                for (var i in demoObj.subject) {
                    demoObj.subject[i] = data.subjects[demoObj.subject[i]].toLowerCase();
                }
                for (var i in demoObj.gradelevel) {
                    demoObj.gradelevel[i] = data.grades[demoObj.gradelevel[i]].toLowerCase();
                }

                console.log(demoObj);

                callback(demoObj);
            },
            error: function(err) {}
        });
    }
});