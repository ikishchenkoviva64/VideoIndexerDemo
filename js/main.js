const BASE_URL = "dev-moshe:3000/api";

$(function() {

    const loadAllVideoIds = function(callback) {
        $.ajax({
            url: BASE_URL + "/videoIds",
            context: document.body
        }).done(callback);
    };

    const loadVideoData = function(id, callback) {
        $.ajax({
            url: BASE_URL + "/videoData/" + id,
            context: document.body
        }).done(callback);
    };

});