"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bucket = void 0;
const uuid_1 = require("uuid");
const RequestsCollection_1 = require("./RequestsCollection");
/**
 * Bucket contains multiple requests that will be sent all together. All requests are places in a global promise that
 * must be resolved before getting all the results.
 *
 * @param requests Request[]
 * @param options RequestsCollectionOptions
 */
class Bucket extends RequestsCollection_1.RequestsCollection {
    constructor(requests, options) {
        super(options);
        this.id = (0, uuid_1.v4)();
        requests === null || requests === void 0 ? void 0 : requests.forEach(request => {
            this.addRequest(request);
        });
    }
    /**
     * Send queued requests and return all results once all process is done.
     */
    send() {
        let queue = [];
        this.requests.forEach(request => {
            if (this.auth) {
                request.withAuth(this.auth);
            }
            else {
                request.removeAuth();
            }
            queue.push(new Promise((resolve, reject) => {
                request.send().then(val => resolve(val)).catch((e) => reject(e));
            }));
        });
        return Promise.all(queue);
    }
    /**
     * Get content off all request at a time.
     */
    content() {
        let queue = [];
        this.requests.forEach(request => {
            queue.push(new Promise((resolve, reject) => {
                request.content().then(val => resolve(val)).catch((e) => reject(e));
            }));
        });
        return Promise.all(queue);
    }
}
exports.Bucket = Bucket;
