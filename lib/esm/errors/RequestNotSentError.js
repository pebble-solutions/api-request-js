/**
 * This error might occur when we try to use data while the request has not been sent to the resource server.
 */
export class RequestNotSentError extends Error {
    constructor() {
        super("Request has not been sent.");
        this.name = "RequestNotSentError";
    }
}
