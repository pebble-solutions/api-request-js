/**
 * This error might occur when something where wrong during the server request or its response.
 */
export class HTTPError extends Error {

    constructor(message: string) {
        super(message);
        this.name = "HTTPError"
    }

}