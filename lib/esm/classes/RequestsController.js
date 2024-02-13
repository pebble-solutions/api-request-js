"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsController = void 0;
const request_1 = require("../services/request");
const Bucket_1 = require("./Bucket");
const RequestsCollection_1 = require("./RequestsCollection");
/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 * In a controller, all requests will share the same authentication object.
 *
 * @param options ControllerOptions
 */
class RequestsController extends RequestsCollection_1.RequestsCollection {
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
        const bucket = new Bucket_1.Bucket(requests);
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
        const request = (0, request_1.getRequest)(url, params, options);
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
        const request = (0, request_1.postRequest)(url, params, options);
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
        const request = (0, request_1.putRequest)(url, params, options);
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
        const request = (0, request_1.patchRequest)(url, params, options);
        return this.addRequest(request);
    }
    /**
     * Add a delete request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    delete(url, options) {
        const request = (0, request_1.deleteRequest)(url, options);
        return this.addRequest(request);
    }
    /**
     * Add an options request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    options(url, options) {
        const request = (0, request_1.optionsRequest)(url, options);
        return this.addRequest(request);
    }
    /**
     * Add a head request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    head(url, options) {
        const request = (0, request_1.headRequest)(url, options);
        return this.addRequest(request);
    }
}
exports.RequestsController = RequestsController;
