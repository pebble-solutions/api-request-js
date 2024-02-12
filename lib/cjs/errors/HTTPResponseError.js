"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPResponseError = void 0;
const HTTPError_1 = require("./HTTPError");
/**
 * This error might occur when something where wrong in the requested server response. The server has a response, but
 * the ok status is false (not 2XX status).
 */
class HTTPResponseError extends HTTPError_1.HTTPError {
    constructor(message, response) {
        super(message);
        this.name = "HTTPResponseError";
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
    }
}
exports.HTTPResponseError = HTTPResponseError;
