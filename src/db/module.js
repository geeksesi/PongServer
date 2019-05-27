const mongoos = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoos.Schema({

    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    score: {
        type: Number,
        require: true,
    },
    timestamp: {
        type: Number,
        require: true,
    },

});

userSchema.plugin(uniqueValidator);
const User = mongoos.model("user", userSchema);
module.exports = {
    User: User
};