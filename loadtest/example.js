exports.requestJoinOptions = function (i) {
    return { requestNumber: i };
}

exports.requestJoinOptions = function()
{
    return {hash : "37d1084549c848bd6b76046b5fe0a7f9edef50c1b964e5fe6226d7a92e1f3f629882f8b36f520e45d3d32ea4c9d5b9a7f3d577ca18c4d957d78c6a2fda697dad"};
}

exports.onJoin = function () {
    console.log(this.sessionId, "joined.");
}

exports.onMessage = function (message) {
    console.log(this.sessionId, "received:", message);
}

exports.onLeave = function () {
    console.log(this.sessionId, "left.");
}

exports.onError = function (err) {
    console.log(this.sessionId, "!! ERROR !!", err.message);
}

exports.onStateChange = function (state) {
    console.log(this.sessionId, "new state:", state);
}