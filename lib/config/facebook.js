var FB = require('fb');

FB.api('oauth/access_token', {
    client_id: '470123746363919',
    client_secret: '63d11e4e818c142f4cf12f29d3cddd6e',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    var accessToken = res.access_token;
});

FB.api({ method: 'users.getInfo', uids: ['4'], fields: ['uid', 'name'] }, function (res) {
    if(!res || res.error_msg) {
        console.log(!res ? 'error occurred' : res.error_msg);
        return;
    }

    console.log('User Id: ' + res[0].uid);
    console.log('Name: ' + res[0].name);
});