import { AuthorizationInterface } from "../interfaces";
import { RequestType } from "../types";
export declare class Request implements RequestType {
    /**
     * Url that must be fetched
     */
    readonly url: string;
    /**
     * Request ID : a unique string to identify the request
     */
    readonly id: string;
    /**
     * Request parameters
     */
    options?: RequestInit;
    /**
     * Response once the request is sent
     * @private
     */
    private response?;
    /**
     * If true, the request has been sent
     * @private
     */
    private sent;
    /**
     * Store the authorization object if request need authorization.
     * @private
     */
    private authorization?;
    constructor(url: string, options?: RequestInit);
    /**
     * Send the request and store the response in the Request object
     *
     * @throws HTTPResponseError
     */
    send(): Promise<void>;
    /**
     * Add a header to the request option request. This method create and return a copy of the original request options.
     *
     * @param key               Header key
     * @param value             Header value
     * @param options           Input options. If not set, use instance options value
     *
     * @private
     */
    private setHeaderToOptions;
    /**
     * Add header to the request.
     *
     * @param key               Header key
     * @param value             Header value
     */
    withHeader(key: string, value: string): this;
    /**
     * Remove header from the request.
     *
     * @param key               Header key
     */
    removeHeader(key: string): this;
    /**
     * Get the response from the request object
     */
    getResponse(): Response | undefined;
    /**
     * Get response content according to the response Content-Type
     *
     * @throws RequestNotSentError
     */
    content(): Promise<any>;
    /**
     * Return true if the request has already been sent.
     */
    isSent(): boolean;
    /**
     * Set the authorization information onto the request object
     * @param auth
     */
    withAuth(auth: AuthorizationInterface): this;
    /**
     * Remove authorization information from the request
     */
    removeAuth(): this;
}
