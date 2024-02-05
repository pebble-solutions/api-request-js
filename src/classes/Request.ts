import {RequestOptionsInterface} from "../interfaces/RequestOptionsInterface";
import {RequestNotSentError} from "../errors/RequestNotSentError";

export class Request {

    /**
     * Url that must be fetched
     */
    readonly url: string

    /**
     * Request parameters
     */
    readonly options?: RequestInit

    /**
     * Response once the request is sent
     * @private
     */
    private response?: Response

    /**
     * If true, the request has been sent
     * @private
     */
    private sent: boolean

    constructor(url: string, options?: RequestInit) {
        this.url = url;
        this.options = {
            method: "GET",
            ...options
        };
        this.sent = false
    }

    /**
     * Send the request and store the response in the Request object
     */
    async send() {
        this.response = await fetch(this.url, this.options)
        this.sent = true
    }

    /**
     * Get the response from the request object
     */
    getResponse() {
        return this.response;
    }

    /**
     * Get response content according to the response Content-Type
     *
     * @throws RequestNotSentError
     */
    async content() {
        if (!this.isSent()) {
            throw new RequestNotSentError()
        }

        if (!this.response) {
            return null
        }

        const contentType = this.response.headers.get("Content-Type")

        switch (contentType) {
            case "application/json":
                return await this.response.json()
            default:
                return await this.response.text()
        }
    }

    /**
     * Return true if the request has already been sent.
     */
    isSent(): boolean {
        return this.sent
    }

}