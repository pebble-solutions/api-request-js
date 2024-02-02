"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRequest = exports.getRequest = void 0;
const Request_1 = require("../classes/Request");
function getRequest(url, params) {
    return new Request_1.Request(url, params, {
        method: "GET"
    });
}
exports.getRequest = getRequest;
function postRequest(url, params) {
    return new Request_1.Request(url, params, {
        method: "POST"
    });
}
exports.postRequest = postRequest;
