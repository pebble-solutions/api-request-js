import { Request } from "../classes/Request";
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
 * Create a post request
 *
 * By default, params will be sent with application/json encoding through the body options.
 *
 * @param url               URL onto which the request will be sent
 * @param params            Request parameters
 * @param options           Fetch options that will be sent with the request
 */
export declare function postRequest(url: string, params?: object, options?: RequestInit): Request;
