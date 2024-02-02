var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Request {
    constructor(url, params, options) {
        this.url = url;
        this.params = params;
        this.options = Object.assign({ method: "GET" }, options);
        console.log(url, params, options);
    }
    /**
     * Send the request and store the response in the Request object
     */
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            this.response = yield fetch(this.url, this.options);
            return this;
        });
    }
    /**
     * Get the response from the request object
     */
    getResponse() {
        return this.response;
    }
}
