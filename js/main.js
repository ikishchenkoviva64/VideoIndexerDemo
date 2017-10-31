const BASE_URL = "http://dev-moshe:3000/api";

$(function() {

    const loadAllVideoIds = function(callback) {
        $.ajax({
            type: "GET",
            dataType: 'text',
            url: BASE_URL + "/videoIds"
        }).done(callback)
            .fail(function() {
                alert("error");
            });
    };

    const loadVideoData = function(id, callback) {
        $.ajax({
            type: "GET",
            dataType: 'text',
            url: BASE_URL + "/videoData/" + id,
            success: callback,
            fail: function(){
                alert('Failed to pass request');
            }
        });
    };
});