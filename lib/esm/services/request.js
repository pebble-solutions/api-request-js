import { Request } from "../classes/Request";
export function getRequest(url, params) {
    return new Request(url, params, {
        method: "GET"
    });
}
export function postRequest(url, params) {
    return new Request(url, params, {
        method: "POST"
    });
}
