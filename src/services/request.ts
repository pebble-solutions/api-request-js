import {Request} from "../classes/Request";

export function getRequest(url: string, params?: object) {
    return new Request(url, params, {
        method: "GET"
    })
}

export function postRequest(url: string, params?: object) {
    return new Request(url, params, {
        method: "POST"
    })
}