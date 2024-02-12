import { Request } from "./Request";
import { RequestsCollection } from "./RequestsCollection";
import { RequestsCollectionOptions } from "../types/RequestsCollectionOptions";
import { RequestType } from "../types/RequestType";
/**
 * Bucket contains multiple requests that will be sent all together. All requests are places in a global promise that
 * must be resolved before getting all the results.
 *
 * @param requests Request[]
 * @param options RequestsCollectionOptions
 */
export declare class Bucket extends RequestsCollection implements RequestType {
    /**
     * Bucket unique ID
     */
    readonly id: string;
    constructor(requests?: Request[], options?: RequestsCollectionOptions);
    /**
     * Send queued requests and return all results once all process is done.
     */
    send(): Promise<any[]>;
    /**
     * Get content off all request at a time.
     */
    content(): Promise<any[]>;
}
