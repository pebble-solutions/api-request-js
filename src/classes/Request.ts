import {RequestOptionsInterface} from "../interfaces/RequestOptionsInterface";

export class Request {

    constructor(url: string, params?: object, options?: RequestOptionsInterface) {
        console.log(url, params, options)
    }

}