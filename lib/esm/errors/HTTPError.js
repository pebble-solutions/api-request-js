/**
 * This error might occur when something where wrong during the server request or its response.
 */
export class HTTPError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPError";
    }
}
