import { Request } from "./Request";
import { ReadParamsType, WriteParamsType } from "../types";
import { ControllerOptions } from "../types";
import { Bucket } from "./Bucket";
import { RequestsCollection } from "./RequestsCollection";
/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 * In a controller, all requests will share the same authentication object.
 *
 * @param options ControllerOptions
 */
export declare class RequestsController extends RequestsCollection {
    constructor(options?: ControllerOptions);
    /**
     * Add multiple requests into the controller.
     *
     * This method will create a requests bucket with a global send promise.
     *
     * @param requests
     */
    addRequests(requests: Request[]): Bucket;
    /**
     * Add a get request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent through URL encoding
     * @param options           Request options
     */
    get(url: string, params?: ReadParamsType, options?: RequestInit): Request | Bucket;
    /**
     * Add a post request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    post(url: string, params?: WriteParamsType, options?: RequestInit): Request | Bucket;
    /**
     * Add a put request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    put(url: string, params?: WriteParamsType, options?: RequestInit): Request | Bucket;
    /**
     * Add a patch request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    patch(url: string, params?: WriteParamsType, options?: RequestInit): Request | Bucket;
    /**
     * Add a delete request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    delete(url: string, options?: RequestInit): Request | Bucket;
    /**
     * Add an options request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    options(url: string, options?: RequestInit): Request | Bucket;
    /**
     * Add a head request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    head(url: string, options?: RequestInit): Request | Bucket;
}
