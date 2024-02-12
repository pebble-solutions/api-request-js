import { AuthorizationInterface } from "../interfaces/AuthorizationInterface";
import { Bucket } from "./Bucket";
import { Request } from "./Request";
import { RequestsCollectionOptions } from "../types/RequestsCollectionOptions";
export declare abstract class RequestsCollection {
    /**
     * Authorization object that will be plugged on every request
     * @private
     */
    private _auth?;
    /**
     * List of used requests in the controller
     * @private
     */
    private readonly _requests;
    /**
     * List of all requests in the controller and its children. Children can be Requests Buckets. This attribute is
     * used for request collection deep search.
     * @private
     */
    private readonly _deepRequests;
    protected constructor(options?: RequestsCollectionOptions);
    /**
     * Return the authorization object that will be plugged on every request
     */
    get auth(): AuthorizationInterface | undefined;
    /**
     * Return all the requests that are managed by the controller
     */
    get requests(): (Request | Bucket)[];
    /**
     * Return a containing request or bucket from its unique ID.
     * @param id            Request unique ID
     * @param deep          Deep search. Will look for all requests in the collection and its children (like bucket)
     */
    getRequestById(id: string, deep?: boolean): Request | Bucket | undefined;
    /**
     * Return a containing request or bucket from its array index (0 is the first added request).
     * @param index
     */
    getRequestByIndex(index: number): Request | Bucket | undefined;
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
    addRequest(request: Request | Bucket): Request | Bucket;
}
