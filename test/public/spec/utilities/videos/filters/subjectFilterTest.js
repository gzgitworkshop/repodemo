define( function ( require ) {
	'use strict';

	var subjectFilter = require( 'utilities/videos/filters/subjectFilter' );
    var util = require('utilities/videos/Recommend');
	var models = {
        'VideoModel': require('models/videos/VideoModel')
    };
var videoData = {raw : [new models.VideoModel({
            _id: 1,
            imageUrl: 'img/video-bg-2.png',
            topic: 'Closing the Gap',
            duration: '9 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "prekindergarten", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id: 2,
            imageUrl: 'img/video-bg-3.png',
            topic: 'Culture',
            duration: '3 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "Kindergarten", "grade-12" ]
            }
        }), new models.VideoModel({
            _id: 3,
            imageUrl: 'img/video-bg-4.png',
            topic: 'Phones in Class',
            duration: '4 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id: 4,
            imageUrl: 'img/video-bg-5.png',
            topic: 'Time Management',
            duration: '7 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-9", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id: 5,
            imageUrl: 'img/video-bg-6.png',
            topic: 'Tech Basics',
            duration: '4 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-7" ]
            }
        }), new models.VideoModel({
            _id: 6,
            imageUrl: 'img/video-bg-7.png',
            topic: 'Learning Games',
            duration: '9 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id: 7,
            imageUrl: 'img/video-bg-8.png',
            topic: 'Communication',
            duration: '5 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        }), new models.VideoModel({
            _id: 8,
            imageUrl: 'img/video-bg-8.png',
            topic: 'Communications 2',
            duration: '5 min',
            tags: {
                    subject : [ "English", "Technology" ],
                    gradelevel : [ "grade-1", "grade-2", "kindergarten" ]
            }
        }), new models.VideoModel({
            _id: 9,
            imageUrl: 'img/video-bg-9.png',
            topic: 'Teaching and the Internet',
            duration: '11 min',
            tags: {
                    subject : [ "Technology" ],
                    gradelevel : [ "grade-1", "grade-2" ]
            }
        })]};			
			var subarray = ["English",
			"Math",
			"Foreign Language",
			"Social Studies",
			"Science",
			"Performing Arts",
			"Fine Arts",
			"Music",
            "Vocational",
			"Technology",
			"Consumer science",
			"Physical Education"];
            var _subarray = [
            ['English', 'Foreign Language'],
            ['Social Studies', 'Math'],
            ['Science', 'Technology', 'Consumer'],
            ['Performing Arts', 'Fine Arts'],
            ['Music', 'Physical Education'],
            ['Business', 'Vocational'],
                [
                    "Math",
                    "English",
                    "Science",
                    "Foreign Language",
                    "Fine Arts", 
                    "Performing Arts",
                    "Physical Education",
                    "Vocational",
                    "Social Studies",
                    "Business",
                    "Technology",
                    "Consumer Science",
                    "Music"
                ]
            ];
            var _subarray_ = [
                    ['Math', 'Science', 'Foreign Language'],
                    ['Fine Arts', 'Performing Arts', 'Physical Education'],
                    ['Music Vocational', 'Social Studies'],
                    ['Business', 'Technology','Consumer Science']
                ];
describe( 'Subject Specific Content Filtering for Teachers', function () {
	  	describe( 'For Elementary and Pre-kindergarten Level Teachers', function () {
			subarray.forEach(function (subj){
				describe( subj+' Teacher', function () {

			            var grade = 'grade-6',
			                filterData  = { UserData : { 
			                                    subject : [ subj ],
                                                grade : ['prekindergarten','kindergarten','grade-1','grade-2','grade-3','grade-4','grade-5','grade-6']
			                                }},
			                video = videoData.raw;
			          
			            it('Should fetch '+subj+' Contents', function () {
			                subjectFilter.filter(videoData, filterData, function(res){
			                    if(res.raw) {
			                       var obj = res.raw;
			                        obj.forEach( function(val) {
			                     //  console.log(val.attributes.tags + '---');
			                            (val.attributes.tags.subject).should.contain(subj);                    
			                        })                  
			                    }                   
			                });
			            }); 
			    } );
			});

		});

        describe( 'For Secondary Level Teachers', function () {
            subarray.forEach(function (subj){
                describe( subj+' Teacher', function () {

                       // var grade = 'grade-6',
                           var filterDatas  = { UserData : { 
                                                subject : [ subj ],
                                                grade : ['grade-7','grade-8','grade-9','grade-10','grade-11','grade-12','Vocational']
                                            }},
                            video = videoData.raw;

                        it('Should fetch '+subj+' Contents', function () {
                            subjectFilter.filter(videoData, filterDatas, function(res){
                                if(res.raw) {
                                   var obj = res.raw;
                                    obj.forEach( function(val) {
                                 //  console.log(val.attributes.tags + '---');
                                        (val.attributes.tags).should.contain(subj);                    
                                    })                  
                                }                   
                            });
                        }); 
                } );
            });

        });

        describe( 'Subject Filtering on Multiple Subjects for Elementary Teachers', function () {
            //alert(_subarray.length);
          //  var xxx = 0;
            _subarray.forEach(function (subj){
                                   // alert('');
                describe( 'For '+subj+' Teacher', function () {

                       // var grade = 'grade-6',
                           var _filterDatas  = { UserData : { 
                                                subject :  subj ,
                                                grade : ['prekindergarten','kindergarten','grade-1','grade-2','grade-3','grade-4','grade-5','grade-6']
                                            }},
                            video = videoData.raw;
                      
                        it('Should fetch '+subj+' Contents', function () {
                            subjectFilter.filter(videoData, _filterDatas, function(res){
                                if(res.raw) {
                                   var obj = res.raw;
                                    obj.forEach( function(val) {
                                        subj.forEach(function(vv){
                                            _.contains(val.attributes.tags,vv).should.be.true;
                                        });

                                    })                  
                                }                   
                            });
                        }); 
                } );
            });

        });
         describe( 'Subject Filtering on Multiple Subjects for Secondary Teachers', function () {
            //alert(_subarray.length);
          //  var xxx = 0;
            _subarray.forEach(function (subj){
                                  //  alert(xxx++);
                describe( 'For '+subj+' Teacher', function () {

                       // var grade = 'grade-6',
                           var _filterDatas  = { UserData : { 
                                                subject :  subj ,
                                                grade : ['grade-7','grade-8','grade-9','grade-10','grade-11','grade-12','Vocational']
                                            }},
                            video = videoData.raw;
                      
                        it('Should fetch '+subj+' Contents', function () {
                            subjectFilter.filter(videoData, _filterDatas, function(res){
                                if(res.raw) {
                                   var obj = res.raw;
                                    obj.forEach( function(val) {
                                 //  console.log(val.attributes.tags + '---');
                                  //      (val.attributes.tags).should.contain(subj);   
                                        subj.forEach(function(vv){
                                            _.contains(val.attributes.tags,vv).should.be.true;
                                        });

                                    })                  
                                }                   
                            });
                        }); 
                } );
            });

        });
        describe( 'Subject Filtering combinations of 3 to 4 subjects for Elementary and prekindergarten Teachers', function () {
            //var subj = ['Technology','Math'];
             _subarray.forEach(function (subj){
              var _filterDatas_  = { UserData : { 
                                                subject :  subj ,
                                                 grade : ['prekindergarten','kindergarten','grade-1','grade-2','grade-3','grade-4','grade-5','grade-6']
                                            }},
                            video = videoData.raw;

                                                    it('Should fetch '+subj+' Contents', function () {
                            subjectFilter.filter(videoData, _filterDatas_, function(res){
                                    var flag = false;
                                if(res.raw) {
                                   var obj = res.raw;
                                    obj.forEach( function(val) {
                                  
                                            subj.forEach(function(vvv){
                                                if( _.contains(val.attributes.tags.subject,vvv))
                                                    flag = true;
                                                });
                                                if(flag)
                                                     true.should.be.true;
                                                 else
                                                    false.should.be.true;
                                            });                  
                                }                   
                            });
                        }); 
                    });

       });
         describe( 'Subject Filtering combinations of 3 to 4 subjects for Secondary and Vocational Teachers', function () {
                //var subj = ['Technology','Math'];
             _subarray_.forEach(function (subj){
              var _filterDatas2_  = { UserData : { 
                                                subject :  subj ,
                                                grade : ['grade-7','grade-8','grade-9','grade-10','grade-11','grade-12','Vocational']
                                            }},
                            video = videoData.raw;

                                                    it('Should fetch '+subj+' Contents', function () {
                            subjectFilter.filter(videoData, _filterDatas2_, function(res){
                                    var flag = false;
                                if(res.raw) {
                                   var obj = res.raw;
                                    obj.forEach( function(val) {
                                  
                                            subj.forEach(function(vvv){
                                                if( _.contains(val.attributes.tags.subject,vvv))
                                                    flag = true;
                                                });
                                                if(flag)
                                                     true.should.be.true;
                                                 else
                                                    false.should.be.true;
                                            });                  
                                }                   
                            });
                        }); 
                                    util(function(data){   
                                        console.log(data);
                                    });
                    });

       });
});

});