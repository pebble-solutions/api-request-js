"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const RequestNotSentError_1 = require("../errors/RequestNotSentError");
const uuid_1 = require("uuid");
class Request {
    constructor(url, options) {
        this.url = url;
        this.options = Object.assign({ method: "GET" }, options);
        this.sent = false;
        this.id = (0, uuid_1.v4)();
    }
    /**
     * Send the request and store the response in the Request object
     */
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            let options = Object.assign({}, this.options);
            if (this.authorization) {
                options = this.setHeaderToOptions("Authorization", this.authorization.getToken());
            }
            this.response = yield fetch(this.url, options);
            this.sent = true;
        });
    }
    /**
     * Add a header to the request option request. This method create and return a copy of the original request options.
     *
     * @param key               Header key
     * @param value             Header value
     * @param options           Input options. If not set, use instance options value
     *
     * @private
     */
    setHeaderToOptions(key, value, options) {
        options = options || this.options || {};
        options = Object.assign({}, options);
        const headers = new Headers(options.headers);
        if (value) {
            headers.set(key, value);
        }
        else {
            headers.delete(key);
        }
        options.headers = {};
        for (const header of headers.entries()) {
            options.headers[header[0]] = header[1];
        }
        return options;
    }
    /**
     * Add header to the request.
     *
     * @param key               Header key
     * @param value             Header value
     */
    withHeader(key, value) {
        this.options = this.setHeaderToOptions(key, value);
        return this;
    }
    /**
     * Remove header from the request.
     *
     * @param key               Header key
     */
    removeHeader(key) {
        this.options = this.setHeaderToOptions(key, null);
        return this;
    }
    /**
     * Get the response from the request object
     */
    getResponse() {
        return this.response;
    }
    /**
     * Get response content according to the response Content-Type
     *
     * @throws RequestNotSentError
     */
    content() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSent()) {
                throw new RequestNotSentError_1.RequestNotSentError();
            }
            if (!this.response) {
                return null;
            }
            const contentType = this.response.headers.get("Content-Type");
            switch (contentType) {
                case "application/json":
                    return yield this.response.json();
                default:
                    return yield this.response.text();
            }
        });
    }
    /**
     * Return true if the request has already been sent.
     */
    isSent() {
        return this.sent;
    }
    /**
     * Set the authorization information onto the request object
     * @param auth
     */
    withAuth(auth) {
        this.authorization = auth;
        return this;
    }
    /**
     * Remove authorization information from the request
     */
    removeAuth() {
        this.authorization = undefined;
        return this;
    }
}
exports.Request = Request;
