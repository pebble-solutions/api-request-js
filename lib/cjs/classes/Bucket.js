"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bucket = void 0;
const uuid_1 = require("uuid");
class Bucket {
    constructor(requests) {
        this.requests = requests || [];
        this.id = (0, uuid_1.v4)();
    }
    /**
     * Send queued requests and return all results once all process is done.
     */
    send() {
        let queue = [];
        this.requests.forEach(request => {
            queue.push(new Promise((resolve, reject) => {
                request.send().then(val => resolve(val)).catch((e) => reject(e));
            }));
        });
        return Promise.all(queue);
    }
}
exports.Bucket = Bucket;
