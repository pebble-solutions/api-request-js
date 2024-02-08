import { v4 as uuidv4 } from "uuid";
export class Bucket {
    constructor(requests) {
        this.requests = requests || [];
        this.id = uuidv4();
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
