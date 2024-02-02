"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequest = exports.getRequest = void 0;
const Request_1 = require("../classes/Request");
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
    return new Request_1.Request(url, params, Object.assign(Object.assign({}, options), { method: "GET" }));
}
exports.getRequest = getRequest;
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
    options = Object.assign(Object.assign({}, options), { method: "POST", body: JSON.stringify(params), headers: {
            "Content-Type": "application/json"
        } });
    return new Request_1.Request(url, params, options);
}
exports.postRequest = postRequest;
