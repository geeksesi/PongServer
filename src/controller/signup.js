const db_set = require('../db/set');
const {encrypt, decrypt} = require('./security');


exports.signup = function(req, res) {
    let username , password; 
    decrypt(req.params.hash, response => 
        {
            username = response.username;
            password = response.password
            db_set.add_user(username, password, success => {
                res.json({
                    ok : success.ok,
                    message : ((typeof success.body.errors == undefined) ? "it's finish please login" : success.body.errors.username.properties.message) 
                });
            });
        });
}