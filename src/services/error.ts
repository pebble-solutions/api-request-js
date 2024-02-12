import {Request} from "../classes/Request";

/**
 * Return the error message from a request response. This function try to find a message or a text in the response
 * content.
 * @param request
 */
export async function getErrorMessage(request: Request) {
    let message = null;

    try {
        const content = await request.content()

        if (typeof content === "object") {
            message = "message" in content ? content.message : "error" in content ? content.error : "Unknown error : "+JSON.stringify(content)
        }
        else if (typeof content === "string") {
            message = content
        }
        else {
            message = "Unknown error, requested server return nothing."
        }
    } catch (e) {
        message = "Unable to get error message."
        if (e instanceof Error) {
            message += " Reason : "+e.message
        }
    }

    return message
}