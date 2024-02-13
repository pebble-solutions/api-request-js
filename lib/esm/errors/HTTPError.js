"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = void 0;
/**
 * This error might occur when something where wrong during the server request or its response.
 */
class HTTPError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPError";
    }
}
exports.HTTPError = HTTPError;
