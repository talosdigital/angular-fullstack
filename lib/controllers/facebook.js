var FB = require('fb');

exports.show = function (req, res, next) {

    FB.setAccessToken(req.body.token);

    FB.api({ method: 'users.getInfo', uids: [req.body.id], fields: ['uid', 'name' , 'email'] }, function (res) {
        if(!res || res.error_msg) {
            console.log(!res ? 'error occurred' : res.error_msg);
            return;
        }
        console.log(JSON.stringify(res[0]));
    });
};