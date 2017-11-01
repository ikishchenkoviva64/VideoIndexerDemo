angular.module('daletVideoIndexer', [])
    .controller('DaletVideoIndexerVideos', function($scope) {
        $scope.current = {};
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

        $scope.onVideoClick = function(video) {
            console.log(video.id);
            $scope.current = video;
            $(function(){
                console.log(video.processingProgress);
                var $ppc = $('.progress-pie-chart'), percent = parseInt(video.processingProgress), deg = 360*percent/100;
                console.log(deg);
                if (percent > 50) {
                    $ppc.addClass('gt-50');
                } else {
                    $ppc.removeClass('gt-50');
                }
                $('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
            });
        };

        $scope.loadAllVideoIds(function (tmpVideos) {
            JSON.parse(tmpVideos).forEach(function (t) {
                $scope.loadVideoData(t, function (tmpVideo) {
                    var obj = JSON.parse(tmpVideo);
                    if ($scope.videos.length == 0) {
                        $scope.onVideoClick(obj);
                    }
                    $scope.$apply(function () {
                        $scope.videos.push(obj);
                    });
                });
            });
        });
    });
