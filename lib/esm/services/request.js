import { Request } from "../classes/Request";
import { RequestsController } from "../classes/RequestsController";
/**
 * Create a get request.
 *
 * If params are provided, they will be concat onto the url. For GET request, params must respect URL limitations.
 *
 * @param url               URL onto which the request will be sent
 * @param params            URL parameters
 * @param options           Fetch options that will be sent with the request
 */
export function getRequest(url, params, options) {
    if (params) {
        const separator = url.match(/\?/) ? "&" : "?";
        url += separator + new URLSearchParams(params).toString();
        url = url.replace(/\?&/, "?");
    }
    return new Request(url, Object.assign(Object.assign({}, options), { method: "GET" }));
}
/**
 * Create a patch request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export function patchRequest(url, params, options) {
    return new Request(url, prepareWriteOptions("PATCH", params, options));
}
/**
 * Create a put request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export function putRequest(url, params, options) {
    return new Request(url, prepareWriteOptions("PUT", params, options));
}
/**
 * Create a delete request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function deleteRequest(url, options) {
    return new Request(url, Object.assign(Object.assign({}, options), { method: "DELETE" }));
}
/**
 * Create an options request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function optionsRequest(url, options) {
    return new Request(url, Object.assign(Object.assign({}, options), { method: "OPTIONS" }));
}
/**
 * Create a head request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function headRequest(url, options) {
    return new Request(url, Object.assign(Object.assign({}, options), { method: "HEAD" }));
}
/**
 * Create a post request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export function postRequest(url, params, options) {
    return new Request(url, prepareWriteOptions("POST", params, options));
}
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
export function createRequestsController() {
    return new RequestsController();
}
