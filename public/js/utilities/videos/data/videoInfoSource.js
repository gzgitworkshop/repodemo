define(function (require) {
    'use strict';

    var models = {
        'VideoModel': require('models/videos/VideoModel')
    };

    return [new models.VideoModel({
        _id: 1,
        imageUrl: 'img/video-bg-2.png',
        topic: 'Closing the Gap',
        duration: '9 min',
        tags: ['grade-1', 'English', 'Technology', 'grade-2']
    }), new models.VideoModel({
        _id: 2,
        imageUrl: 'img/video-bg-3.png',
        topic: 'Culture',
        duration: '3 min',
        tags: ['Social Studies', 'grade-2']
    }), new models.VideoModel({
        _id: 3,
        imageUrl: 'img/video-bg-4.png',
        topic: 'Phones in Class',
        duration: '4 min',
        tags: ['Technology', 'Vocational', 'grade-6']
    }), new models.VideoModel({
        _id: 4,
        imageUrl: 'img/video-bg-5.png',
        topic: 'Time Management',
        duration: '7 min',
        tags: ['grade-5', 'Business']
    }), new models.VideoModel({
        _id: 5,
        imageUrl: 'img/video-bg-6.png',
        topic: 'Tech Basics',
        duration: '4 min',
        tags: ['Technology','grade-6']
    }), new models.VideoModel({
        _id: 6,
        imageUrl: 'img/video-bg-7.png',
        topic: 'Learning Games',
        duration: '9 min',
        tags: ['Technology','grade-1']
    }), new models.VideoModel({
        _id: 7,
        imageUrl: 'img/video-bg-8.png',
        topic: 'Communication',
        duration: '5 min',
        tags: ['English', 'grade-1','grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6']
    }), new models.VideoModel({
        _id: 8,
        imageUrl: 'img/video-bg-9.png',
        topic: 'Teaching and the Internet',
        duration: '11 min',
        tags: ['Technology','grade-6']
    })];
});