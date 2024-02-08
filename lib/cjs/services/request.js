"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestsBucket = exports.createRequestsController = exports.postRequest = exports.headRequest = exports.optionsRequest = exports.deleteRequest = exports.putRequest = exports.patchRequest = exports.getRequest = void 0;
const Request_1 = require("../classes/Request");
const RequestsController_1 = require("../classes/RequestsController");
const Bucket_1 = require("../classes/Bucket");
/**
 * Create a get request.
 *
 * If params are provided, they will be concat onto the url. For GET request, params must respect URL limitations.
 *
 * @param url               URL onto which the request will be sent
 * @param params            URL parameters
 * @param options           Fetch options that will be sent with the request
 */
function getRequest(url, params, options) {
    if (params) {
        const separator = url.match(/\?/) ? "&" : "?";
        url += separator + new URLSearchParams(params).toString();
        url = url.replace(/\?&/, "?");
    }
    return new Request_1.Request(url, Object.assign(Object.assign({}, options), { method: "GET" }));
}
exports.getRequest = getRequest;
/**
 * Create a patch request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
function patchRequest(url, params, options) {
    return new Request_1.Request(url, prepareWriteOptions("PATCH", params, options));
}
exports.patchRequest = patchRequest;
/**
 * Create a put request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
function putRequest(url, params, options) {
    return new Request_1.Request(url, prepareWriteOptions("PUT", params, options));
}
exports.putRequest = putRequest;
/**
 * Create a delete request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
function deleteRequest(url, options) {
    return new Request_1.Request(url, Object.assign(Object.assign({}, options), { method: "DELETE" }));
}
exports.deleteRequest = deleteRequest;
/**
 * Create an options request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
function optionsRequest(url, options) {
    return new Request_1.Request(url, Object.assign(Object.assign({}, options), { method: "OPTIONS" }));
}
exports.optionsRequest = optionsRequest;
/**
 * Create a head request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
function headRequest(url, options) {
    return new Request_1.Request(url, Object.assign(Object.assign({}, options), { method: "HEAD" }));
}
exports.headRequest = headRequest;
/**
 * Create a post request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
function postRequest(url, params, options) {
    return new Request_1.Request(url, prepareWriteOptions("POST", params, options));
}
exports.postRequest = postRequest;
/**
 * Encode request parameters onto request body depending on the content type. Parameters can be FormData encoded otherwise
 * it is considered as JSON.
 *
 * @param params            Request parameters
 */
function encodeWriteBody(params) {
    return params instanceof FormData ? params : JSON.stringify(params);
}
/**
 * Prepare the output request options in order to make them consistency with params type, content type and request
 * method.
 *
 * @param method            HTTP request method
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
function prepareWriteOptions(method, params, options) {
    options = options !== null && options !== void 0 ? options : {};
    let headers = new Headers(options.headers);
    // Content-Type is set to application/json by default if params is set.
    if (params && !(params instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    }
    if (params instanceof FormData) {
        const contentType = headers.get("Content-Type");
        // Bad content type for FormData are removed
        if (contentType) {
            if (!contentType.match(/^multipart\/form-data/) && !contentType.match(/^application\/x-www-form-urlencoded/)) {
                headers.delete("Content-Type");
            }
        }
    }
    options.headers = {};
    for (const header of headers.entries()) {
        options.headers[header[0]] = header[1];
    }
    return Object.assign(Object.assign({}, options), { method, body: encodeWriteBody(params) });
}
function createRequestsController() {
    return new RequestsController_1.RequestsController();
}
exports.createRequestsController = createRequestsController;
function createRequestsBucket() {
    return new Bucket_1.Bucket();
}
exports.createRequestsBucket = createRequestsBucket;
