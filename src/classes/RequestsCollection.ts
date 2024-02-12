import {AuthorizationInterface} from "../interfaces";
import {Bucket} from "./Bucket";
import {Request} from "./Request";
import {RequestsCollectionOptions} from "../types";

export abstract class RequestsCollection {

    /**
     * Authorization object that will be plugged on every request
     * @private
     */
    private _auth?: AuthorizationInterface

    /**
     * List of used requests in the controller
     * @private
     */
    private readonly _requests: (Request | Bucket)[]

    /**
     * List of all requests in the controller and its children. Children can be Requests Buckets. This attribute is
     * used for request collection deep search.
     * @private
     */
    private readonly _deepRequests: Request[]

    protected constructor(options?: RequestsCollectionOptions) {
        this._requests = []
        this._deepRequests = []
        if (options?.auth) {
            this._auth = options.auth
        }
    }

    /**
     * Return the authorization object that will be plugged on every request
     */
    get auth(): AuthorizationInterface | undefined {
        return this._auth
    }

    /**
     * Return all the requests that are managed by the controller
     */
    get requests(): (Request | Bucket)[] {
        return this._requests
    }

    /**
     * Return a containing request or bucket from its unique ID.
     * @param id            Request unique ID
     * @param deep          Deep search. Will look for all requests in the collection and its children (like bucket)
     */
    getRequestById(id: string, deep?: boolean): Request | Bucket | undefined {
        const requests = deep ? this._deepRequests : this._requests
        return requests.find(e => e.id === id)
    }

    /**
     * Return a containing request or bucket from its array index (0 is the first added request).
     * @param index
     */
    getRequestByIndex(index: number): Request | Bucket | undefined {
        return this.requests[index]
    }

    /**
     * Add an authorization object that will be plugged on every request
     * @param auth
     */
    withAuth(auth: AuthorizationInterface): this {
        this._auth = auth
        return this
    }

    /**
     * Remove the authorization object from the controller
     */
    removeAuth(): this {
        this._auth = undefined
        return this
    }

    /**
     * Add a request into the controller
     * @param request
     */
    addRequest(request: Request | Bucket): Request | Bucket {
        if (this._auth) {
            request.withAuth(this._auth)
        }

        this._requests.push(request)
        return request
    }
}