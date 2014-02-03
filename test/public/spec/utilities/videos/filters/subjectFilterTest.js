define( function ( require ) {
    "use strict";

    var subjectFilter = require("utilities/videos/filters/subjectFilter");
    var expect     = require( "chai" ).expect();
    var should     = require( "chai" ).should();

    var async = require("https://raw2.github.com/caolan/async/master/lib/async.js");
    var models = {
        "VideoModel": require("models/videos/VideoModel")
    };

    var videoData = { raw      : [new models.VideoModel({
            _id      : 1,
            imageUrl : "img/video-bg-2.png",
            topic    : "Closing the Gap",
            duration : "9 min",
            tags     : {
                    subject    : [ "ela", "physical education", "foreign language" ],
                    gradelevel : [ "grade-1", "grade-2", "prekindergarten", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id      : 2,
            imageUrl : "img/video-bg-3.png",
            topic    : "Culture",
            duration : "3 min",
            tags     : {
                    subject    : [ "ela", "physical education", "foreign language" ],
                    gradelevel : [ "grade-1", "grade-2", "Kindergarten", "grade-12" ]
            }
        }), new models.VideoModel({
            _id      : 3,
            imageUrl : "img/video-bg-4.png",
            topic    : "Phones in Class",
            duration : "4 min",
            tags     : {
                    subject    : [ "ela", "physical education" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id      : 4,
            imageUrl : "img/video-bg-5.png",
            topic    : "Time Management",
            duration : "7 min",
            tags     : {
                    subject    : [ "ela", "physical education", "business" ],
                    gradelevel : [ "grade-1", "grade-9", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id      : 5,
            imageUrl : "img/video-bg-6.png",
            topic    : "Tech Basics",
            duration : "4 min",
            tags     : {
                    subject    : [ "ela", "physical education" ],
                    gradelevel : [ "grade-1", "grade-7" ]
            }
        }), new models.VideoModel({
            _id      : 6,
            imageUrl : "img/video-bg-7.png",
            topic    : "Learning Games",
            duration : "9 min",
            tags     : {
                    subject    : [ "ela", "technology", "foreign language" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id      : 7,
            imageUrl : "img/video-bg-8.png",
            topic    : "Communication",
            duration : "5 min",
            tags     : {
                    subject    : [ "ela", "technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id      : 8,
            imageUrl : "img/video-bg-8.png",
            topic    : "Communication",
            duration : "5 min",
            tags     : {
                    subject    : [ "ela", "technology" ],
                    gradelevel : [ "grade-1", "grade-2", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id      : 9,
            imageUrl : "img/video-bg-9.png",
            topic    : "Teaching and the Internet",
            duration : "11 min",
            tags     : {
                    subject    : [ "ela", "technology", "music" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        })]};

    describe( "Subject Specific Content Filtering", function () {

        var arrFilters = [
                            "ELA",
                            "Math",
                            "Foreign Languages",
                            "Social Studies",
                            "Science",
                            "Performing Arts",
                            "Fine Arts",
                            "Music",
                            "Technology",
                            "Consumer Science",
                            "Physical Education",
                            "ELA and Foreign Language",
                            "Social Studies and Math",
                            "Science, Technology and Consumer Science",
                            "Performing Arts and Fine Arts",
                            "Music and Physical Education",
                            "Business and Vocational Courses",
                            "Math, English, Science and Foreign Languages"
                             ];
        var tagFilters = [
                            ["ela"],
                            ["math"],
                            ["foreign languages"],
                            ["social studies"],
                            ["science"],
                            ["performing arts"],
                            ["fine arts"],
                            ["music"],
                            ["technology"],
                            ["consumer science"],
                            ["physical education"],
                            ["ela", "foreign language"],
                            ["social studies", "math"],
                            ["science", "technology", "consumer science"],
                            ["performing arts", "fine arts"],
                            ["music", "physical education"],
                            ["business", "vocational"],
                            ["math", "ela", "science", "foreign language"],
                             ];

        arrFilters.forEach(function (item) {

            var strHead = arrFilters.indexOf( item ) + 1 + " - " + item + " Test",
                strdes1 = "should display " + item + " contents/videos for " + item + " subjects",
                strdes2 = "should fetch all " + " contents/videos on the system";
            describe( strHead, function () {

                var _subject = tagFilters[ arrFilters.indexOf( item ) ],
                        filterData  = {
                            UserData : {
                                subject    : _subject,
                                gradelevel : [  ]
                            }},
                        video       = copyObject(videoData),
                        counttags   = 0,
                        fetchedtags = 0,
                        videoraw    = video.raw;
                var videoraw = video.raw;
                it(strdes1, function () {
                    if(video) {

                        videoraw.forEach ( function( val ) {
                            //loop on all values of tagfilters
                            _subject.every ( function ( fil )  {
                                if( val.attributes.tags.subject.indexOf( fil ) > -1 ) {
                                    counttags++;
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                        })
                        logger("available items on stack: " + counttags);
                    }

                    subjectFilter.filter( video, filterData, function( res ){
                        logger( res );
                        if( res.raw ) {
                            fetchedtags = res.raw.length;
                            logger( "Fetched items: " + fetchedtags );
                            var obj = res.raw;
                            obj.forEach( function( val ) {
                                var isExist = false;
                                _subject.every ( function ( fil )  {
                                    if ( val.attributes.tags.subject.indexOf( fil ) > -1 ) {
                                        isExist = true;
                                        return false;
                                    } else {
                                        return true;
                                    }
                                })
                                isExist.should.be.true;
                            })
                        }
                    });

                });

                it(strdes2, function () {
                    counttags.should.be.equal( fetchedtags );
                    logger( videoData );
                });

            } );
        });

    });

    function copyObject( obj ) {
        var newObj = {};
        for ( var key in obj ) {
            //copy all the fields
            newObj[ key ] = obj[ key ];
        }
        return newObj;
    }

    function logger ( msg ) {
        console.log ( msg );
    }

});