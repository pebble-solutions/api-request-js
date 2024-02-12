import {HTTPError} from "./HTTPError";

/**
 * This error might occur when something where wrong in the requested server response. The server has a response, but
 * the ok status is false (not 2XX status).
 */
export class HTTPResponseError extends HTTPError {

    /**
     * Response status (100 to 599)
     */
    readonly status: number

    /**
     * Response status text
     */
    readonly statusText?: string

    /**
     * Server response
     */
    readonly response: Response

    constructor(message: string, response: Response) {
        super(message);
        this.name = "HTTPResponseError"
        this.status = response.status
        this.statusText = response.statusText
        this.response = response
    }
}