import { HTTPError } from "./HTTPError";
/**
 * This error might occur when something where wrong in the requested server response. The server has a response, but
 * the ok status is false (not 2XX status).
 */
export class HTTPResponseError extends HTTPError {
    constructor(message, response) {
        super(message);
        this.name = "HTTPResponseError";
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
    }
}
