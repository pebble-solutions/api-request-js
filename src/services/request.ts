import {Request} from "../classes/Request";
import {ReadParamsType, WriteParamsType} from "../types/params";
import {RequestsController} from "../classes/RequestsController";
import {Bucket} from "../classes/Bucket";
import {ControllerOptions} from "../types/ControllerOptions";

/**
 * Create a get request.
 *
 * If params are provided, they will be concat onto the url. For GET request, params must respect URL limitations.
 *
 * @param url               URL onto which the request will be sent
 * @param params            URL parameters
 * @param options           Fetch options that will be sent with the request
 */
export function getRequest(url: string, params?: ReadParamsType, options?: RequestInit)
{

    if (params) {
        const separator = url.match(/\?/) ? "&" : "?"
        url += separator + new URLSearchParams(params).toString()
        url = url.replace(/\?&/, "?")
    }

    return new Request(url, {
        ...options,
        method: "GET"
    })
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
export function patchRequest(url: string, params?: WriteParamsType, options?: RequestInit)
{
    return new Request(url, prepareWriteOptions("PATCH", params, options))
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
export function putRequest(url: string, params?: WriteParamsType, options?: RequestInit)
{
    return new Request(url, prepareWriteOptions("PUT", params, options))
}

/**
 * Create a delete request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function deleteRequest(url: string, options?: RequestInit)
{
    return new Request(url, {
        ...options,
        method: "DELETE"
    })
}

/**
 * Create an options request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function optionsRequest(url: string, options?: RequestInit)
{
    return new Request(url, {
        ...options,
        method: "OPTIONS"
    })
}

/**
 * Create a head request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function headRequest(url: string, options?: RequestInit)
{
    return new Request(url, {
        ...options,
        method: "HEAD"
    })
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
export function postRequest(url: string, params?: WriteParamsType, options?: RequestInit)
{
    return new Request(url, prepareWriteOptions("POST", params, options))
}

/**
 * Encode request parameters onto request body depending on the content type. Parameters can be FormData encoded otherwise
 * it is considered as JSON.
 *
 * @param params            Request parameters
 */
function encodeWriteBody(params?: WriteParamsType)
{
    return params instanceof FormData ? params : JSON.stringify(params)
}

/**
 * Prepare the output request options in order to make them consistency with params type, content type and request
 * method.
 *
 * @param method            HTTP request method
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
function prepareWriteOptions(method: string, params?: WriteParamsType, options?: RequestInit)
{
    options = options ?? {}

    let headers = new Headers(options.headers)

    // Content-Type is set to application/json by default if params is set.
    if (params && !(params instanceof FormData)) {
        headers.set("Content-Type", "application/json")
    }

    if (params instanceof FormData) {
        const contentType = headers.get("Content-Type")

        // Bad content type for FormData are removed
        if (contentType) {
            if (!contentType.match(/^multipart\/form-data/) && !contentType.match(/^application\/x-www-form-urlencoded/)) {
                headers.delete("Content-Type")
            }
        }
    }

    options.headers = {}

    for (const header of headers.entries()) {
        options.headers[header[0]] = header[1]
    }

    return {
        ...options,
        method,
        body: encodeWriteBody(params)
    };
}

/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 * In a controller, all requests will share the same authentication object.
 *
 * @param options
 */
export function createRequestsController(options?: ControllerOptions) {
    return new RequestsController(options)
}

/**
 * Bucket contains multiple requests that will be sent all together. All requests are places in a global promise that
 * must be resolved before getting all the results.
 *
 * @param requests Request[]
 */
export function createRequestsBucket(requests?: Request[]) {
    return new Bucket(requests)
}