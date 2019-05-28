const colyseus = require('colyseus');
const { encrypt, decrypt } = require('./../controller/security');
const { User } = require('./../db/module');
const { update_score } = require('./../db/set');
const passwordHash = require('password-hash');


exports.SetScore = class extends colyseus.Room {

    onInit(options) {
        this.authed_client = {};
        console.log("init");
    }

    onAuth(options) {
        // return true
        let promise = new Promise((resolve, reject) => {
            decrypt(options.hash, response => {
                User.findOne({ username: response.username }, (err, user) => {
                    if (err !== null || user == null) {
                        reject(false);
                    } else if (!passwordHash.verify(response.password, user.password)) {
                        reject(false);
                    } else {
                        resolve(user);
                    }
                });
            });

        });
        return promise;
    }

    

    onJoin(client, options, auth) {
        if(auth !== false)
        {
            this.authed_client[client.id] = {
                user_id : auth._id,
                username : auth.username,
                score : auth.score,
                ws : client
            }
        }
        console.log("someon is here");
        // this.send(client, {message : client.id})
        // console.log(client.id);
    }
    onMessage(client, message) {
        console.log(message);
        if(message.type === 'start')
        {
            this.send(client, {
                ok : true, 
                message : "do your job"+ this.authed_client[client.id].username,
                score : this.authed_client[client.id].score
            });
        }
        if(message.type === 'finish')
        {
            update_score(this.authed_client[client.id].user_id, (this.authed_client[client.id].score+1), response => {
                if(!response.ok)
                {
                    this.send(client, {ok : false , message : "we have problem on increase your score"});
                }
                else
                {
                    this.authed_client[client.id].score++;
                    this.send(client, {
                        ok : true,
                        message : "done your score increased",
                        score : this.authed_client[client.id].score
                    });
                }
            });
        }
    }
    onLeave(client, consented) {}
    onDispose() {}
}