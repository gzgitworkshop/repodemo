define( function ( require ) {
    'use strict';

    var gradeFilter = require('utilities/videos/filters/gradeFilter');
    var expect     = require( 'chai' ).expect();
    var should     = require( 'chai' ).should();

    var async = require('https://raw2.github.com/caolan/async/master/lib/async.js');
    var models = {
        'VideoModel': require('models/videos/VideoModel')
    };

    var videoData = {raw : [new models.VideoModel({
            _id: 1,
            imageUrl: 'img/video-bg-2.png',
            topic: 'Closing the Gap',
            duration: '9 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "prekindergarten", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id: 2,
            imageUrl: 'img/video-bg-3.png',
            topic: 'Culture',
            duration: '3 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "Kindergarten", "grade-12" ]
            }
        }), new models.VideoModel({
            _id: 3,
            imageUrl: 'img/video-bg-4.png',
            topic: 'Phones in Class',
            duration: '4 min',
            tags: {
                    subject    : [ "English", "Technology" ],   
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id: 4,
            imageUrl: 'img/video-bg-5.png',
            topic: 'Time Management',
            duration: '7 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-9", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id: 5,
            imageUrl: 'img/video-bg-6.png',
            topic: 'Tech Basics',
            duration: '4 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-7" ]
            }
        }), new models.VideoModel({
            _id: 6,
            imageUrl: 'img/video-bg-7.png',
            topic: 'Learning Games',
            duration: '9 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id: 7,
            imageUrl: 'img/video-bg-8.png',
            topic: 'Communication',
            duration: '5 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id: 8,
            imageUrl: 'img/video-bg-9.png',
            topic: 'Teaching and the Internet',
            duration: '11 min',
            tags: {
                    subject    : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        })]};

    describe( 'Grade Specific Content Filtering', function () {

        var arrFilters = [  
                            'Pre-Kindergarten',
                            'Kindergarten',
                            'Grade 1',
                            'Grade 2',
                            'Grade 3',
                            'Grade 4',
                            'Grade 5',
                            'Grade 6',
                            'Grade 7',
                            'Grade 8',
                            'Grade 9',
                            'Grade 10',
                            'Grade 11',
                            'Grade 12',
                            'Instructional Coach 1',
                            'Instructional Coach 2',
                            'Instructional Coach - All' ];
        var tagFilters = [
                            ['prekindergarten'],
                            ['kindergarten'],
                            ['grade-1'],
                            ['grade-2'],
                            ['grade-3'],
                            ['grade-4'],
                            ['grade-5'],
                            ['grade-6'],
                            ['grade-7'],
                            ['grade-8'],
                            ['grade-9'],
                            ['grade-10'],
                            ['grade-11'],
                            ['grade-12'],
                            ['grade-1', 'prekindergarten'],
                            ['grade-2', 'grade-1', 'grade-10', 'kindergarten', 'grade-12'],
                            ['kindergarten', 'prekindergarten', 'grade-1', 'grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6', 'grade-7', 'grade-8', 'grade-9', 'grade-10', 'grade-11', 'grade-12']
                        ];

        arrFilters.forEach(function (item) {

            var strHead = item + ' test',
                strdes1 = 'should display ' + item + ' contents/videos for ' + item + ' teachers',
                strdes2 = 'should fetch all ' + ' contents/videos on the system';
            describe( strHead, function () {

                var grade = tagFilters[arrFilters.indexOf(item)],
                        filterData  = { UserData : { 
                                            subject : [  ], 
                                            gradelevel: grade 
                                        }},
                        video = copyObject(videoData),
                        counttags = 0,
                        fetchedtags = 0,
                        videoraw = video.raw;
                var videoraw = video.raw;
                it(strdes1, function () {
                    if(video) {

                        videoraw.forEach ( function(val) {
                            //loop on all values of tagfilters
                            grade.every ( function (fil)  {
                                if( val.attributes.tags.gradelevel.indexOf(fil) > -1 ) {
                                    counttags++;
                                    return false;
                                } else {
                                    return true;
                                }
                            })
                        })
                        logger('available items on stack: ' + counttags);
                    } 
                    
                    gradeFilter.filter(video, filterData, function(res){
                        logger(res);
                        if(res.raw) {
                            fetchedtags = res.raw.length;
                            logger('Fetched items: ' + fetchedtags);
                            var obj = res.raw;
                            obj.forEach( function(val) {
                                var isExist = false;
                                grade.every ( function (fil)  {
                                    if ( val.attributes.tags.gradelevel.indexOf(fil) > -1 ) {
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
                    counttags.should.be.equal(fetchedtags);
                    logger(videoData);
                });

            } );
        });

    });

    function copyObject(obj) {
        var newObj = {};
        for (var key in obj) {
            //copy all the fields
            newObj[key] = obj[key];
        }
        return newObj;
    }

    function logger ( msg ) {
        console.log ( msg );
    }

});