"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsController = void 0;
const request_1 = require("../services/request");
/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 */
class RequestsController {
    constructor(options) {
        this.requests = [];
        if (options === null || options === void 0 ? void 0 : options.auth) {
            this._auth = options.auth;
        }
    }
    /**
     * Return the authorization object that will be plugged on every request
     */
    get auth() {
        return this._auth;
    }
    /**
     * Add an authorization object that will be plugged on every request
     * @param auth
     */
    withAuth(auth) {
        this._auth = auth;
        return this;
    }
    /**
     * Remove the authorization object from the controller
     */
    removeAuth() {
        this._auth = undefined;
        return this;
    }
    /**
     * Add a request into the controller
     * @param request
     */
    addRequest(request) {
        if (this._auth) {
            request.withAuth(this._auth);
        }
        this.requests.push(request);
        return request;
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
