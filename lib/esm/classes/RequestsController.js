import { deleteRequest, getRequest, headRequest, optionsRequest, patchRequest, postRequest, putRequest } from "../services/request";
import { Bucket } from "./Bucket";
import { RequestsCollection } from "./RequestsCollection";
/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 * In a controller, all requests will share the same authentication object.
 *
 * @param options ControllerOptions
 */
export class RequestsController extends RequestsCollection {
    constructor(options) {
        super(options);
    }
    /**
     * Add multiple requests into the controller.
     *
     * This method will create a requests bucket with a global send promise.
     *
     * @param requests
     */
    addRequests(requests) {
        const bucket = new Bucket(requests);
        this.addRequest(bucket);
        return bucket;
    }
    /**
     * Add a get request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent through URL encoding
     * @param options           Request options
     */
    get(url, params, options) {
        const request = getRequest(url, params, options);
        return this.addRequest(request);
    }
    /**
     * Add a post request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    post(url, params, options) {
        const request = postRequest(url, params, options);
        return this.addRequest(request);
    }
    /**
     * Add a put request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    put(url, params, options) {
        const request = putRequest(url, params, options);
        return this.addRequest(request);
    }
    /**
     * Add a patch request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    patch(url, params, options) {
        const request = patchRequest(url, params, options);
        return this.addRequest(request);
    }
    /**
     * Add a delete request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    delete(url, options) {
        const request = deleteRequest(url, options);
        return this.addRequest(request);
    }
    /**
     * Add an options request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    options(url, options) {
        const request = optionsRequest(url, options);
        return this.addRequest(request);
    }
    /**
     * Add a head request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    head(url, options) {
        const request = headRequest(url, options);
        return this.addRequest(request);
    }
}
