import {RequestOptionsInterface} from "../interfaces/RequestOptionsInterface";

export class Request {

    readonly url: string

    readonly params?: object

    readonly options?: RequestInit

    private response?: Response

    constructor(url: string, params?: object, options?: RequestInit) {
        this.url = url;
        this.params = params;
        this.options = {
            method: "GET",
            ...options
        };

        console.log(url, params, options)
    }

    /**
     * Send the request and store the response in the Request object
     */
    async send(): Promise<this> {
        this.response = await fetch(this.url, this.options)
        return this
    }

    /**
     * Get the response from the request object
     */
    getResponse() {
        return this.response;
    }

}