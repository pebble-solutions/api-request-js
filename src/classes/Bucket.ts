import {Request} from "./Request";
import { v4 as uuidv4 } from "uuid";
import {AuthorizationInterface} from "../interfaces/AuthorizationInterface";
import {RequestsCollection} from "./RequestsCollection";
import {RequestsCollectionOptions} from "../types/RequestsCollectionOptions";
import {RequestType} from "../types/RequestType";

/**
 * Bucket contains multiple requests that will be sent all together. All requests are places in a global promise that
 * must be resolved before getting all the results.
 *
 * @param requests Request[]
 * @param options RequestsCollectionOptions
 */
export class Bucket extends RequestsCollection implements RequestType {

    /**
     * Bucket unique ID
     */
    readonly id: string

    constructor(requests?: Request[], options?: RequestsCollectionOptions) {
        super(options)
        this.id = uuidv4()

        requests?.forEach(request => {
            this.addRequest(request)
        })
    }

    /**
     * Send queued requests and return all results once all process is done.
     */
    send(): Promise<any[]> {

        let queue: Promise<any>[] = []

        this.requests.forEach(request => {

            if (this.auth) {
                request.withAuth(this.auth)
            } else {
                request.removeAuth()
            }

            queue.push(new Promise((resolve, reject) => {
                request.send().then(val => resolve(val)).catch((e) => reject(e))
            }))
        })

        return Promise.all(queue)
    }

    /**
     * Get content off all request at a time.
     */
    content(): Promise<any[]> {

        let queue: Promise<any>[] = []

        this.requests.forEach(request => {
            queue.push(new Promise((resolve, reject) => {
                request.content().then(val => resolve(val)).catch((e) => reject(e))
            }))
        })

        return Promise.all(queue)
    }
}