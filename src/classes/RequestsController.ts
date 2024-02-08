import {AuthorizationInterface} from "../interfaces/AuthorizationInterface";
import {Request} from "./Request";
import {
    deleteRequest,
    getRequest,
    headRequest,
    optionsRequest,
    patchRequest,
    postRequest,
    putRequest
} from "../services/request";
import {ReadParamsType, WriteParamsType} from "../types/params";
import {ControllerOptions} from "../types/ControllerOptions";
import {Bucket} from "./Bucket";

/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 */
export class RequestsController {

    /**
     * Authorization object that will be plugged on every request
     * @private
     */
    private _auth?: AuthorizationInterface

    /**
     * List of used requests in the controller
     * @private
     */
    private requests: (Request | Bucket)[]

    constructor(options?: ControllerOptions) {
        this.requests = []

        if (options?.auth) {
            this._auth = options.auth
        }
    }

    /**
     * Return the authorization object that will be plugged on every request
     */
    get auth(): AuthorizationInterface | undefined {
        return this._auth
    }

    /**
     * Add an authorization object that will be plugged on every request
     * @param auth
     */
    withAuth(auth: AuthorizationInterface): this {
        this._auth = auth
        return this
    }

    /**
     * Remove the authorization object from the controller
     */
    removeAuth(): this {
        this._auth = undefined
        return this
    }

    /**
     * Add a request into the controller
     * @param request
     */
    addRequest(request: Request): Request {
        if (this._auth) {
            request.withAuth(this._auth)
        }

        this.requests.push(request)
        return request
    }

    /**
     * Add a get request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent through URL encoding
     * @param options           Request options
     */
    get(url: string, params?: ReadParamsType, options?: RequestInit) {
        const request = getRequest(url, params, options)
        return this.addRequest(request)
    }

    /**
     * Add a post request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    post(url: string, params?: WriteParamsType, options?: RequestInit) {
        const request = postRequest(url, params, options)
        return this.addRequest(request)
    }

    /**
     * Add a put request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    put(url: string, params?: WriteParamsType, options?: RequestInit) {
        const request = putRequest(url, params, options)
        return this.addRequest(request)
    }

    /**
     * Add a patch request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    patch(url: string, params?: WriteParamsType, options?: RequestInit) {
        const request = patchRequest(url, params, options)
        return this.addRequest(request)
    }

    /**
     * Add a delete request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    delete(url: string, options?: RequestInit) {
        const request = deleteRequest(url, options)
        return this.addRequest(request)
    }

    /**
     * Add an options request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    options(url: string, options?: RequestInit) {
        const request = optionsRequest(url, options)
        return this.addRequest(request)
    }

    /**
     * Add a head request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    head(url: string, options?: RequestInit) {
        const request = headRequest(url, options)
        return this.addRequest(request)
    }

}