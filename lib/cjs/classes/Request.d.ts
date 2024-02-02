export declare class Request {
    readonly url: string;
    readonly params?: object;
    readonly options?: RequestInit;
    private response?;
    constructor(url: string, params?: object, options?: RequestInit);
    /**
     * Send the request and store the response in the Request object
     */
    send(): Promise<this>;
    /**
     * Get the response from the request object
     */
    getResponse(): Response | undefined;
}
