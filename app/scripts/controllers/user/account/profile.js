'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountProfileCtrl', function ($scope, $upload, $http) {
        $scope.profile = 'Profile';
        
        function getProfilePicture(){ 
            $http.get('/api/user/profile').success(function(data) {
            $scope.profileimg = data.picture.longUrl;
            });
        }

        $scope.progressBar = false;

        getProfilePicture();

        $scope.onFileSelect = function($files) {
            $scope.profileimg = '';

            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.progressBar = true;
                $scope.upload = $upload.upload({
                    url: '/api/user/picture',
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    // withCredentials: true,
                    file: file // or list of files: $files for html5 only
                    /* set the file formData name ('Content-Desposition'). Default is 'file' */
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                    //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                    
                    $scope.dynamic = parseInt(100.0 * evt.loaded / evt.total);

                }).success(function(data) {
                    
                    $scope.progressBar = false;
                    // file is uploaded successfully
                    getProfilePicture();
                    $scope.alerts = [
                        { type: 'success', msg: data.message }
                        ];
                })
                .error( function(data){
                     $scope.alerts = [
                        { type: 'danger', msg: data.data.message }
                        ];
                });
                //.then(success, error, progress);
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            }
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };
  });