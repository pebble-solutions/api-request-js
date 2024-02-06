"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestNotSentError = void 0;
/**
 * This error might occur when we try to use data while the request has not been sent to the resource server.
 */
class RequestNotSentError extends Error {
    constructor() {
        super("Request has not been sent.");
        this.name = "RequestNotSentError";
    }
}
exports.RequestNotSentError = RequestNotSentError;
