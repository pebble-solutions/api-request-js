import {Request} from "../classes/Request";

type OutParamsType = Record<string, any> | Record<string, any>[] | FormData

/**
 * Create a get request.
 *
 * If params are provided, they will be concat onto the url. For GET request, params must respect URL limitations.
 *
 * @param url               URL onto which the request will be sent
 * @param params            URL parameters
 * @param options           Fetch options that will be sent with the request
 */
export function getRequest(url: string, params?: Record<string, any>, options?: RequestInit) {

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
export function patchRequest(url: string, params?: OutParamsType, options?: RequestInit) {

    options = {
        ...options,
        method: "PATCH",
        body: encodeOutBody(params)
    }

    return new Request(url, options)
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
export function putRequest(url: string, params?: OutParamsType, options?: RequestInit) {

    options = {
        ...options,
        method: "PUT",
        body: encodeOutBody(params)
    }

    return new Request(url, options)
}

/**
 * Create a delete request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export function deleteRequest(url: string, options: RequestInit) {
    return new Request(url, {
        ...options,
        method: "DELETE"
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
export function postRequest(url: string, params?: OutParamsType, options?: RequestInit) {

    options = {
        ...options,
        method: "POST",
        body: encodeOutBody(params)
    }

    return new Request(url, options)
}

/**
 * Encode request parameters onto request body depending on the content type. Parameters can be FormData encoded otherwise
 * it is considered as JSON.
 *
 * @param params            Request parameters
 */
function encodeOutBody(params?: OutParamsType) {
    return params instanceof FormData ? params : JSON.stringify(params)
}