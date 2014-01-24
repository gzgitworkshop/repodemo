define( function ( require ) {
	'use strict';

	var subjectFilter = require( 'utilities/videos/filters/subjectFilter' );
	var models = {
        'VideoModel': require('models/videos/VideoModel')
    };
var videoData = {raw : [new models.VideoModel({
            _id: 1,
            imageUrl: 'img/video-bg-2.png',
            topic: 'Closing the Gap',
            duration: '9 min',
            tags: ['general', 'grade-1', 'English', 'Technology', 'grade-2', 'kindergarten', 'grade-7', 'grade-8', 'grade-9', 'grade-10', 'grade-11', 'grade-12']
        }), new models.VideoModel({
            _id: 2,
            imageUrl: 'img/video-bg-3.png',
            topic: 'Culture',
            duration: '3 min',
            tags: ['general', 'Social Studies', 'grade-2']
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
            tags: ['general', 'Technology','grade-1','Math']
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
            tags: ['general', 'Technology','grade-6','kindergarten', 'astronomy','construction','Foreign Language']
        })]};
			
			var subarray = ["English",
			"Math",
			"Foreign Language",
			"Social Studies",
			"Science",
			"Performing Arts",
			"Fine Arts",
			"Music",
			"Technology",
			"Consumer science",
			"Physical Education"];

	  	describe( 'Subject Specific Content Filtering for Teachers', function () {
			subarray.forEach(function (subj){
				describe( subj+' Teacher', function () {

			            var grade = 'grade-6',
			                filterData  = { UserData : { 
			                                    subject : [ subj ]
			                                }},
			                video = videoData.raw;
			          
			            it('Should fetch '+subj+' Contents', function () {
			                subjectFilter.filter(videoData, filterData, function(res){
			                    if(res.raw) {
			                       var obj = res.raw;
			                        obj.forEach( function(val) {
			                       console.log(val.attributes.tags);
			                            (val.attributes.tags).should.contain(subj);                    
			                        })                  
			                    }                   
			                });
			            }); 
			    } );
			});

		});

} );