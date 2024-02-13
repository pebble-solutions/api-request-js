/**
 * This error might occur when something where wrong during the server request or its response.
 */
export declare class HTTPError extends Error {
    constructor(message: string);
}
