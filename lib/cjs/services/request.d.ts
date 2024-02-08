import { Request } from "../classes/Request";
import { ReadParamsType, WriteParamsType } from "../types/params";
import { RequestsController } from "../classes/RequestsController";
import { Bucket } from "../classes/Bucket";
/**
 * Create a get request.
 *
 * If params are provided, they will be concat onto the url. For GET request, params must respect URL limitations.
 *
 * @param url               URL onto which the request will be sent
 * @param params            URL parameters
 * @param options           Fetch options that will be sent with the request
 */
export declare function getRequest(url: string, params?: ReadParamsType, options?: RequestInit): Request;
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
 * Create an options request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export declare function optionsRequest(url: string, options?: RequestInit): Request;
/**
 * Create a head request
 *
 * @param url               URL onto which the request will be sent
 * @param options           Fetch options that will be sent with the request
 */
export declare function headRequest(url: string, options?: RequestInit): Request;
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
export declare function createRequestsController(): RequestsController;
export declare function createRequestsBucket(): Bucket;
