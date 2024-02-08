import { AuthorizationInterface } from "../interfaces/AuthorizationInterface";
import { Request } from "./Request";
import { ReadParamsType, WriteParamsType } from "../types/params";
import { ControllerOptions } from "../types/ControllerOptions";
/**
 * Request Controller is a bridge between authentication process and HTTP requests.
 */
export declare class RequestsController {
    /**
     * Authorization object that will be plugged on every request
     * @private
     */
    private _auth?;
    /**
     * List of used requests in the controller
     * @private
     */
    private requests;
    constructor(options?: ControllerOptions);
    /**
     * Return the authorization object that will be plugged on every request
     */
    get auth(): AuthorizationInterface | undefined;
    /**
     * Add an authorization object that will be plugged on every request
     * @param auth
     */
    withAuth(auth: AuthorizationInterface): this;
    /**
     * Remove the authorization object from the controller
     */
    removeAuth(): this;
    /**
     * Add a request into the controller
     * @param request
     */
    addRequest(request: Request): Request;
    /**
     * Add a get request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent through URL encoding
     * @param options           Request options
     */
    get(url: string, params?: ReadParamsType, options?: RequestInit): Request;
    /**
     * Add a post request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    post(url: string, params?: WriteParamsType, options?: RequestInit): Request;
    /**
     * Add a put request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    put(url: string, params?: WriteParamsType, options?: RequestInit): Request;
    /**
     * Add a patch request into the controller
     *
     * @param url               Request URL
     * @param params            Request parameters that will be sent in json
     * @param options           Request options
     */
    patch(url: string, params?: WriteParamsType, options?: RequestInit): Request;
    /**
     * Add a delete request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    delete(url: string, options?: RequestInit): Request;
    /**
     * Add an options request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    options(url: string, options?: RequestInit): Request;
    /**
     * Add a head request into the controller
     *
     * @param url               Request URL
     * @param options           Request options
     */
    head(url: string, options?: RequestInit): Request;
}
