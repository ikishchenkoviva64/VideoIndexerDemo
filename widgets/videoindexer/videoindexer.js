angular.module('daletVideoIndexer', [])
    .controller('DaletVideoIndexerVideos', function($scope) {
        $scope.videos = [];
        $scope.BASE_URL = "http://dev-moshe:3000/api";
        $scope.loadAllVideoIds = function(callback) {
            $.ajax({
                type: "GET",
                dataType: 'text',
                url: $scope.BASE_URL + "/videoIds",
                success: callback,
                fail: function(){
                    alert('Failed to get videos!');
                }
            });
        };

        $scope.loadVideoData = function(id, callback) {
            $.ajax({
                type: "GET",
                dataType: 'text',
                url: $scope.BASE_URL + "/videoData/" + id,
                success: callback,
                fail: function(){
                    alert('Failed to get video data!');
                }
            });
        };

        $scope.loadAllVideoIds(function (tmpVideos) {
            JSON.parse(tmpVideos).forEach(function (t) {
                $scope.loadVideoData(t, function (tmpVideo) {
                    var obj = JSON.parse(tmpVideo);
                    if (obj.thumbnailUrl != undefined) {
                        console.log(obj.thumbnailUrl);
                        $scope.$apply(function () {
                            $scope.videos.push(obj);
                        });
                    };
                });
            });
        });
    });
