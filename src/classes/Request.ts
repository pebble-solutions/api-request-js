import {RequestNotSentError} from "../errors/RequestNotSentError";
import {AuthorizationInterface} from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import {RequestType} from "../types";
import {HTTPResponseError} from "../errors/HTTPResponseError";
import {getErrorMessage} from "../services/error";

export class Request implements RequestType {

    /**
     * Url that must be fetched
     */
    readonly url: string

    /**
     * Request ID : a unique string to identify the request
     */
    readonly id: string

    /**
     * Request parameters
     */
    options?: RequestInit

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

    /**
     * Store the authorization object if request need authorization.
     * @private
     */
    private authorization?: AuthorizationInterface

    constructor(url: string, options?: RequestInit) {
        this.url = url;
        this.options = {
            method: "GET",
            ...options
        };
        this.sent = false
        this.id = uuidv4()
    }

    /**
     * Send the request and store the response in the Request object
     *
     * @throws HTTPResponseError
     */
    async send() {

        let options: RequestInit = {...this.options}

        if (this.authorization) {
            const token = await this.authorization.getToken()
            options = this.setHeaderToOptions("Authorization", "Bearer "+token)
        }

        this.response = await fetch(this.url, options)
        this.sent = true

        if (!this.response.ok) {
            throw new HTTPResponseError(await getErrorMessage(this), this.response)
        }
    }

    /**
     * Add a header to the request option request. This method create and return a copy of the original request options.
     *
     * @param key               Header key
     * @param value             Header value
     * @param options           Input options. If not set, use instance options value
     *
     * @private
     */
    private setHeaderToOptions(key: string, value: string | null, options?: RequestInit) {
        options = options || this.options || {}
        options = {...options}

        const headers = new Headers(options.headers)

        if (value) {
            headers.set(key, value)
        } else {
            headers.delete(key)
        }

        options.headers = {}

        for (const header of headers.entries()) {
            options.headers[header[0]] = header[1]
        }

        return options
    }

    /**
     * Add header to the request.
     *
     * @param key               Header key
     * @param value             Header value
     */
    withHeader(key: string, value: string): this {
        this.options = this.setHeaderToOptions(key, value)
        return this
    }

    /**
     * Remove header from the request.
     *
     * @param key               Header key
     */
    removeHeader(key: string): this {
        this.options = this.setHeaderToOptions(key, null)
        return this
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
        const contentLength = this.response.headers.get("Content-Length")

        if (contentLength === "0" || this.response.status === 204) {
            return null
        }

        if (contentType?.match("application/json")) {
            return await this.response.json()
        }
        else {
            return await this.response.text()
        }
    }

    /**
     * Return true if the request has already been sent.
     */
    isSent(): boolean {
        return this.sent
    }

    /**
     * Set the authorization information onto the request object
     * @param auth
     */
    withAuth(auth: AuthorizationInterface): this {
        this.authorization = auth
        return this
    }

    /**
     * Remove authorization information from the request
     */
    removeAuth(): this {
        this.authorization = undefined
        return this
    }

}