function requestJoinOptions(i) {
    return { requestNumber: i };
}

function onJoin() {
    console.log(this.sessionId, "joined.");
}

function onMessage(message) {
    console.log(this.sessionId, "received:", message);
}

function onLeave() {
    console.log(this.sessionId, "left.");
}

function onError(err) {
    console.log(this.sessionId, "!! ERROR !!", err.message);
}

function onStateChange(state) {
    console.log(this.sessionId, "new state:", state);
}

export {
    requestJoinOptions,
    onJoin,
    onMessage,
    onLeave,
    onError,
    onStateChange
};