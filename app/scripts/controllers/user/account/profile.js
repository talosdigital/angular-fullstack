'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountProfileCtrl', function ($scope, $upload, $http) {
        $scope.profile = 'Profile';
        
        function getProfilePicture(){ 
            $http.get('/api/user/profile').success(function(data) {
            $scope.profileimg = data.picture.longUrl;
            });
        }

        getProfilePicture();

        $scope.onFileSelect = function($files) {
            $scope.profileimg = '';

            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: '/api/user/picture', //upload.php script, node.js route, or servlet url
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    // headers: {'header-key': 'header-value'},
                    // withCredentials: true,
                    file: file // or list of files: $files for html5 only
                    /* set the file formData name ('Content-Desposition'). Default is 'file' */
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                    //formDataAppender: function(formData, key, val){}
                }).progress(function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data) {
                    // file is uploaded successfully
                    getProfilePicture();
                    $scope.alerts = [
                    { type: 'success', msg: data.data.message }
                    ];
                });
                //.error(...)
                //.then(success, error, progress);
                //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            }
            /* alternative way of uploading, send the file binary with the file's content-type.
             Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
             It could also be used to monitor the progress of a normal http post/put request with large data*/
            // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
        };
  });
