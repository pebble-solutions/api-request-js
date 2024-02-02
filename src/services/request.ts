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

export function patchRequest(url: string, params?: object) {
    return new Request(url, params, {
        method: "PATCH"
    })
}

export function putRequest(url: string, params?: object) {
    return new Request(url, params, {
        method: "PUT"
    })
}

export function deleteRequest(url: string, params?: object) {
    return new Request(url, params, {
        method: "DELETE"
    })
}


