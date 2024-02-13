import { Request } from "../classes";
/**
 * Return the error message from a request response. This function try to find a message or a text in the response
 * content.
 * @param request
 */
export declare function getErrorMessage(request: Request): Promise<any>;
