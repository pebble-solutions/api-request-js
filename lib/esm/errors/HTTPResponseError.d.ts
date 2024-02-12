import { HTTPError } from "./HTTPError";
/**
 * This error might occur when something where wrong in the requested server response. The server has a response, but
 * the ok status is false (not 2XX status).
 */
export declare class HTTPResponseError extends HTTPError {
    /**
     * Response status (100 to 599)
     */
    readonly status: number;
    /**
     * Response status text
     */
    readonly statusText?: string;
    /**
     * Server response
     */
    readonly response: Response;
    constructor(message: string, response: Response);
}
