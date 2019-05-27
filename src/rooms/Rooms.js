const colyseus = require('colyseus');
const { encrypt, decrypt } = require('./../controller/security');
const { User } = require('./../db/module');
const passwordHash = require('password-hash');


exports.SetScore = class extends colyseus.Room {

    onInit(options) {
        console.log("init");
    }

    onAuth(options) {
        return new Promise((resolve, reject) => {

            decrypt(options.hash, response => {
                User.findOne({ username: response.username }, (err, user) => {
                    if (typeof err != undefined || user == null) {
                        reject(false);
                    } else if (!passwordHash.verify(response.password, user.password)) {
                        reject(false);
                    } else {
                        resolve(true);
                    }

                });
            });

            console.log(resolve + "" + reject);
        });
    }



    onJoin(client, options) {
        console.log("someon is here");
    }
    onMessage(client, message) {}
    onLeave(client, consented) {}
    onDispose() {}
}