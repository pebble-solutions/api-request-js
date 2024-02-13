"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsCollection = void 0;
class RequestsCollection {
    constructor(options) {
        this._requests = [];
        this._deepRequests = [];
        if (options === null || options === void 0 ? void 0 : options.auth) {
            this._auth = options.auth;
        }
    }
    /**
     * Return the authorization object that will be plugged on every request
     */
    get auth() {
        return this._auth;
    }
    /**
     * Return all the requests that are managed by the controller
     */
    get requests() {
        return this._requests;
    }
    /**
     * Return a containing request or bucket from its unique ID.
     * @param id            Request unique ID
     * @param deep          Deep search. Will look for all requests in the collection and its children (like bucket)
     */
    getRequestById(id, deep) {
        const requests = deep ? this._deepRequests : this._requests;
        return requests.find(e => e.id === id);
    }
    /**
     * Return a containing request or bucket from its array index (0 is the first added request).
     * @param index
     */
    getRequestByIndex(index) {
        return this.requests[index];
    }
    /**
     * Add an authorization object that will be plugged on every request
     * @param auth
     */
    withAuth(auth) {
        this._auth = auth;
        return this;
    }
    /**
     * Remove the authorization object from the controller
     */
    removeAuth() {
        this._auth = undefined;
        return this;
    }
    /**
     * Add a request into the controller
     * @param request
     */
    addRequest(request) {
        if (this._auth) {
            request.withAuth(this._auth);
        }
        this._requests.push(request);
        return request;
    }
}
exports.RequestsCollection = RequestsCollection;
