import {Request} from "./Request";
import { v4 as uuidv4 } from "uuid";

export class Bucket {

    /**
     * Requests stored in the bucket
     * @private
     */
    private requests: Request[]

    /**
     * Bucket unique ID
     */
    readonly id: string

    constructor(requests?: Request[]) {
        this.requests = requests || []
        this.id = uuidv4()
    }

    /**
     * Send queued requests and return all results once all process is done.
     */
    send(): Promise<any[]> {

        let queue: Promise<any>[] = []

        this.requests.forEach(request => {
            queue.push(new Promise((resolve, reject) => {
                request.send().then(val => resolve(val)).catch((e) => reject(e))
            }))
        })

        return Promise.all(queue)
    }
}