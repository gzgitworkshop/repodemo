define( function ( require ) {
    "use strict";

    var gradeFilter = require( "utilities/videos/filters/gradeFilter" ),
        expect      = require( "chai" ).expect(),
        should      = require( "chai" ).should(),
        async       = require( "https://raw2.github.com/caolan/async/master/lib/async.js" ),
        models      = {
            "VideoModel" : require( "models/videos/VideoModel" )
        };

    var videoData = { raw : [ new models.VideoModel ({
            _id      : 1,
            imageUrl : "img/video-bg-2.png",
            topic    : "Closing the Gap",
            duration : "9 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "prekindergarten", "kindergarten" ]
            }
        }), new models.VideoModel ({
            _id      : 2,
            imageUrl : "img/video-bg-3.png",
            topic    : "Culture",
            duration : "3 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "Kindergarten", "grade-12" ]
            }
        }), new models.VideoModel({
            _id      : 3,
            imageUrl : "img/video-bg-4.png",
            topic    : "Phones in Class",
            duration : "4 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id      : 4,
            imageUrl : "img/video-bg-5.png",
            topic    : "Time Management",
            duration : "7 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-9", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id      : 5,
            imageUrl : "img/video-bg-6.png",
            topic    : "Tech Basics",
            duration : "4 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-7" ]
            }
        }), new models.VideoModel({
            _id      : 6,
            imageUrl : "img/video-bg-7.png",
            topic    : "Learning Games",
            duration : "9 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id      : 7,
            imageUrl : "img/video-bg-8.png",
            topic    : "Communication",
            duration : "5 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id      : 8,
            imageUrl : "img/video-bg-8.png",
            topic    : "Communication",
            duration : "5 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id      : 9,
            imageUrl : "img/video-bg-9.png",
            topic    : "Teaching and the Internet",
            duration : "11 min",
            tags     : {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        })]};

    describe( "Grade Specific Content Filtering", function () {

        var arrFilters = [
                            "Pre-Kindergarten",
                            "Kindergarten",
                            "Grade 1",
                            "Grade 2",
                            "Grade 3",
                            "Grade 4",
                            "Grade 5",
                            "Grade 6",
                            "Grade 7",
                            "Grade 8",
                            "Grade 9",
                            "Grade 10",
                            "Grade 11",
                            "Grade 12",
                            "Pre-Kindergarten and Kindergarten",
                            "Kindergarten and Grade 1",
                            "Grade 1 and Grade 2",
                            "Grade 2 and Grade 3",
                            "Grade 3 and Grade 4",
                            "Grade 4 and Grade 5",
                            "Grade 5 and Grade 6",
                            "Grade 6 and Grade 7",
                            "Grade 7 and Grade 8",
                            "Grade 8 and Grade 9",
                            "Grade 9 and Grade 10",
                            "Grade 10 and Grade 11",
                            "Grade 11 and Grade 12",
                            "Pre-Kindergarten to Grade 1",
                            "Kindergarten to Grade 2",
                            "Grade 1 to Grade 3",
                            "Grade 2 to Grade 4",
                            "Grade 3 to Grade 5",
                            "Grade 4 to Grade 6",
                            "Grade 5 to Grade 7",
                            "Grade 6 to Grade 8",
                            "Grade 7 to Grade 9",
                            "Grade 8 to Grade 10",
                            "Grade 9 to Grade 11",
                            "Grade 10 to Grade 12",
                            "Pre-Kindergarten to Grade 2",
                            "Kindergarten to Grade 3",
                            "Grade 1 to Grade 4",
                            "Grade 2 to Grade 5",
                            "Grade 3 to Grade 6",
                            "Grade 4 to Grade 7",
                            "Grade 5 to Grade 8",
                            "Grade 6 to Grade 9",
                            "Grade 7 to Grade 10",
                            "Grade 8 to Grade 11",
                            "Grade 9 to Grade 12",
                            "Pre-Kindergarten to Grade 3",
                            "Kindergarten to Grade 4",
                            "Grade 1 to Grade 5",
                            "Grade 2 to Grade 6",
                            "Grade 3 to Grade 7",
                            "Grade 4 to Grade 8",
                            "Grade 5 to Grade 9",
                            "Grade 6 to Grade 10",
                            "Grade 7 to Grade 11",
                            "Grade 8 to Grade 12",
                            "Pre-Kindergarten to Grade 4",
                            "Kindergarten to Grade 5",
                            "Grade 1 to Grade 6",
                            "Grade 2 to Grade 7",
                            "Grade 3 to Grade 8",
                            "Grade 4 to Grade 9",
                            "Grade 5 to Grade 10",
                            "Grade 6 to Grade 11",
                            "Grade 7 to Grade 12",
                            "Pre-Kindergarten to Grade 5",
                            "Kindergarten to Grade 6",
                            "Grade 1 to Grade 7",
                            "Grade 2 to Grade 8",
                            "Grade 3 to Grade 9",
                            "Grade 4 to Grade 10",
                            "Grade 5 to Grade 11",
                            "Grade 6 to Grade 12",
                            "Pre-Kindergarten to Grade 6",
                            "Kindergarten to Grade 7",
                            "Grade 1 to Grade 8",
                            "Grade 2 to Grade 9",
                            "Grade 3 to Grade 10",
                            "Grade 4 to Grade 11",
                            "Grade 5 to Grade 12",
                            "Pre-Kindergarten to Grade 7",
                            "Kindergarten to Grade 8",
                            "Grade 1 to Grade 9",
                            "Grade 2 to Grade 10",
                            "Grade 3 to Grade 11",
                            "Grade 4 to Grade 12",
                            "Pre-Kindergarten to Grade 8",
                            "Kindergarten to Grade 9",
                            "Grade 1 to Grade 10",
                            "Grade 2 to Grade 11",
                            "Grade 3 to Grade 12",
                            "Pre-Kindergarten to Grade 9",
                            "Kindergarten to Grade 10",
                            "Grade 1 to Grade 11",
                            "Grade 2 to Grade 12",
                            "Pre-Kindergarten to Grade 10",
                            "Kindergarten to Grade 11",
                            "Grade 1 to Grade 12",
                            "Pre-Kindergarten to Grade 11",
                            "Kindergarten to Grade 12",
                            "All" ];
        var tagFilters = [
                            ["prekindergarten"],
                            ["kindergarten"],
                            ["grade-1"],
                            ["grade-2"],
                            ["grade-3"],
                            ["grade-4"],
                            ["grade-5"],
                            ["grade-6"],
                            ["grade-7"],
                            ["grade-8"],
                            ["grade-9"],
                            ["grade-10"],
                            ["grade-11"],
                            ["grade-12"],
                            ["prekindergarten", "kindergarten"],
                            ["kindergarten", "grade-1"],
                            ["grade-1", "grade-2"],
                            ["grade-2", "grade-3"],
                            ["grade-3", "grade-4"],
                            ["grade-4", "grade-5"],
                            ["grade-5", "grade-6"],
                            ["grade-6", "grade-7"],
                            ["grade-7", "grade-8"],
                            ["grade-8", "grade-9"],
                            ["grade-9", "grade-10"],
                            ["grade-10", "grade-11"],
                            ["grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1"],
                            ["kindergarten", "grade-1", "grade-2"],
                            ["grade-1", "grade-2", "grade-3"],
                            ["grade-2", "grade-3", "grade-4"],
                            ["grade-3", "grade-4", "grade-5"],
                            ["grade-4", "grade-5", "grade-6"],
                            ["grade-5", "grade-6", "grade-7"],
                            ["grade-6", "grade-7", "grade-8"],
                            ["grade-7", "grade-8", "grade-9"],
                            ["grade-8", "grade-9", "grade-10"],
                            ["grade-9", "grade-10", "grade-11"],
                            ["grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3"],
                            ["grade-1", "grade-2", "grade-3", "grade-4"],
                            ["grade-2", "grade-3", "grade-4", "grade-5"],
                            ["grade-3", "grade-4", "grade-5", "grade-6"],
                            ["grade-4", "grade-5", "grade-6", "grade-7"],
                            ["grade-5", "grade-6", "grade-7", "grade-8"],
                            ["grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
                            ["grade-3", "grade-4", "grade-5", "grade-6", "grade-7"],
                            ["grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
                            ["grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7"],
                            ["grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
                            ["grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
                            ["grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9","grade-10"],
                            ["grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9","grade-10", "grade-11"],
                            ["grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9","grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11"],
                            ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"],
                            ["prekindergarten", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"]
                        ];

        arrFilters.forEach( function (item) {

            var strHead = arrFilters.indexOf( item ) + 1 + " - " + item + " Test",
                strdes1 = "should display " + item + " contents/videos for " + item + " teachers",
                strdes2 = "should fetch all " + " contents/videos on the system";
            describe( strHead, function () {

                var grade = tagFilters[ arrFilters.indexOf( item ) ],
                        filterData = {
                                UserData   : {
                                subject    : [  ],
                                gradelevel : grade
                            }},
                        video       = copyObject(videoData),
                        counttags   = 0,
                        fetchedtags = 0,
                        videoraw    = video.raw;
                var videoraw = video.raw;
                it( strdes1, function () {
                    if( video ) {

                        videoraw.forEach ( function ( val ) {
                            //loop on all values of tagfilters
                            grade.every ( function ( fil )  {
                                if( val.attributes.tags.gradelevel.indexOf( fil ) > -1 ) {
                                    counttags++;
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                        })
                        logger( "available items on stack: " + counttags );
                    }

                    gradeFilter.filter( video, filterData, function( res ){
                        logger( res );
                        if( res.raw ) {
                            fetchedtags = res.raw.length;
                            logger( "Fetched items: " + fetchedtags );
                            var obj = res.raw;
                            obj.forEach( function( val ) {
                                var isExist = false;
                                grade.every ( function ( fil )  {
                                    if ( val.attributes.tags.gradelevel.indexOf( fil ) > -1 ) {
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