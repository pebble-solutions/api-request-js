import { Request } from "../classes/Request";
type WriteParamsType = Record<string, any> | Record<string, any>[] | FormData;
/**
 * Create a get request.
 *
 * If params are provided, they will be concat onto the url. For GET request, params must respect URL limitations.
 *
 * @param url               URL onto which the request will be sent
 * @param params            URL parameters
 * @param options           Fetch options that will be sent with the request
 */
export declare function getRequest(url: string, params?: Record<string, any>, options?: RequestInit): Request;
/**
 * Create a patch request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export declare function patchRequest(url: string, params?: WriteParamsType, options?: RequestInit): Request;
/**
 * Create a put request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export declare function putRequest(url: string, params?: WriteParamsType, options?: RequestInit): Request;
/**
 * Create a delete request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export declare function deleteRequest(url: string, options?: RequestInit): Request;
/**
 * Create a post request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export declare function postRequest(url: string, params?: WriteParamsType, options?: RequestInit): Request;
export {};
