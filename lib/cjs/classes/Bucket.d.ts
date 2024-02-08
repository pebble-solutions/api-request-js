import { Request } from "./Request";
export declare class Bucket {
    /**
     * Requests stored in the bucket
     * @private
     */
    private requests;
    /**
     * Bucket unique ID
     */
    readonly id: string;
    constructor(requests?: Request[]);
    /**
     * Send queued requests and return all results once all process is done.
     */
    send(): Promise<any[]>;
    /**
     * Get content off all request at a time.
     */
    content(): Promise<any[]>;
}
