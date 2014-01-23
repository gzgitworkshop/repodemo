define(function(require) {
    'use strict';

    var models = {
        'VideoModel': require('models/videos/VideoModel')
    };

    return function(callback) {
        $.ajax({
            url: "http://localhost:8888/videoInfo1.json",
            type: "GET",
            dataType: "json",
            success: function(data) {
                var videoData = [];

                for(var obj in data) {
                    var obj = data[obj];
                    videoData.push(new models.VideoModel({
                        _id: obj._id,
                        imageUrl: obj.imageUrl,
                        topic: obj.topic,
                        duration: obj.duration,
                        tags: obj.tags
                    }));
                };
                callback(videoData);
            },
            error: function(xhr, status, error) {
                callback([]);
            }
        });
    }
});