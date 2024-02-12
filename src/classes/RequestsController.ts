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
import {RequestsCollection} from "./RequestsCollection";

/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 * In a controller, all requests will share the same authentication object.
 *
 * @param options ControllerOptions
 */
export class RequestsController extends RequestsCollection {

    constructor(options?: ControllerOptions) {
        super(options)
    }

    /**
     * Add multiple requests into the controller.
     *
     * This method will create a requests bucket with a global send promise.
     *
     * @param requests
     */
    addRequests(requests: Request[]): Bucket {
        const bucket = new Bucket(requests)

        this.addRequest(bucket)

        return bucket
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