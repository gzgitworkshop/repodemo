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
            tags: ['general', 'English', 'Technology', 'grade-2', 'kindergarten', 'grade-7', 'grade-8', 'grade-9', 'grade-10', 'grade-11', 'grade-12']
        }), new models.VideoModel({
            _id: 2,
            imageUrl: 'img/video-bg-3.png',
            topic: 'Culture',
            duration: '3 min',
            tags: ['general', 'Social Studies', 'grade-1']
        }), new models.VideoModel({
            _id: 3,
            imageUrl: 'img/video-bg-4.png',
            topic: 'Phones in Class',
            duration: '4 min',
            tags: ['general', 'Technology', 'Vocational', 'grade-6']
        }), new models.VideoModel({
            _id: 4,
            imageUrl: 'img/video-bg-5.png',
            topic: 'Time Management',
            duration: '7 min',
            tags: ['general', 'grade-5', 'Business']
        }), new models.VideoModel({
            _id: 5,
            imageUrl: 'img/video-bg-6.png',
            topic: 'Tech Basics',
            duration: '4 min',
            tags: ['general', 'Technology','grade-6']
        }), new models.VideoModel({
            _id: 6,
            imageUrl: 'img/video-bg-7.png',
            topic: 'Learning Games',
            duration: '9 min',
            tags: ['general', 'Technology','grade-1']
        }), new models.VideoModel({
            _id: 7,
            imageUrl: 'img/video-bg-8.png',
            topic: 'Communication',
            duration: '5 min',
            tags: ['general', 'English', 'grade-1','grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6','prekindergarten']
        }), new models.VideoModel({
            _id: 8,
            imageUrl: 'img/video-bg-9.png',
            topic: 'Teaching and the Internet',
            duration: '11 min',
            tags: ['general', 'Technology','grade-6','kindergarten']
        })]};

    describe( 'Grade Specific Content Filtering', function () {

        var arrFilters = [  'Pre-Kindergarten',
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
                            'Grade 12' ];
        var tagFilters = [
                            'prekindergarten',
                            'kindergarten',
                            'grade-1',
                            'grade-2',
                            'grade-3',
                            'grade-4',
                            'grade-5',
                            'grade-6',
                            'grade-7',
                            'grade-8',
                            'grade-9',
                            'grade-10',
                            'grade-11',
                            'grade-12',
                        ];

        arrFilters.forEach(function (item) {

            var strHead = item + ' test',
                strdes1 = 'should display ' + item + ' contents/videos for ' + item + ' teachers',
                strdes2 = 'should fetch all ' + ' contents/videos on the system';
            describe( strHead, function () {

                var grade = tagFilters[arrFilters.indexOf(item)],
                        filterData  = { UserData : { 
                                            subject : [ 'general' ], 
                                            gradelevel: [ grade ] 
                                        }},
                        video = copyObject(videoData),
                        counttags = 0,
                        fetchedtags = 0,
                        videoraw = video.raw;
                var videoraw = video.raw;
                it(strdes1, function (done) {
                    if(video) {
                        console.log(videoData);
                        console.log('count video: ' + videoraw.length);
                        videoraw.forEach ( function(val) {
                            if( val.attributes.tags.indexOf(grade) > -1 ) {
                                counttags++;
                            }    
                        })
                        console.log('available items on stack: ' + counttags);
                    }
                    
                    gradeFilter.filter(video, filterData, function(res){
                        if(res.raw) {
                            fetchedtags = res.raw.length;
                            console.log('Fetched items: ' + fetchedtags);
                            var obj = res.raw;
                            obj.forEach( function(val) {
                                console.log('Fetched data: ' + val.attributes.tags);
                                (val.attributes.tags).should.contain(grade);
                                console.log(val);
                            })
                        }
                    });
                    done();
                });

                it(strdes2, function (done) {
                    counttags.should.be.equal(fetchedtags);
                    console.log(videoData);
                    done();
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

});