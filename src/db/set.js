const db_module = require('./module');
const password_hash = require('password-hash');

function add_user(username, password, cb) {
    const add_user = new db_module.User({
        // _id      : new mongo.Types.ObjectId(),
        username: username,
        password: password_hash.generate(password),
        score: 0,
        timestamp: Math.floor(Date.now() / 1000),

    });
    let resault = {};
    add_user.save((err, res) => {
        if (err) {
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
            resault.body = res;
        }
        cb(resault);
    })

}

function update_score(user_id, score, cb) {
    resault = {};
    db_module.User.findOneAndUpdate({_id : user_id}, {score : score}, (err, user) => {
        if (err) {
            resault.ok = false;
            resault.body = err;
        } else {
            resault.ok = true;
            resault.body = user;
        }
        cb(resault);
    });
}

module.exports = {
    add_user: add_user,
    update_score: update_score
};