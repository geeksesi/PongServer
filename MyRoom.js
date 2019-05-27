import { Room } from 'colyseus';

export class MyRoom extends Room {
    onInit(options) {}
    onJoin(client, options) {}
    onMessage(client, message) {}
    onLeave(client, consented) {}
    onDispose() {}
}