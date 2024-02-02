export interface RequestOptionsInterface {

    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "OPTIONS" | "HEAD",

    headers?: Headers,

    mode?: RequestMode,

    credentials?: RequestCredentials,

    cache?: RequestCache,

    redirect?: RequestRedirect,

    referrer?: string,

    referrerPolicy?: ReferrerPolicy,

    integrity?: string,

    signal?: AbortSignal,

    keepalive?: boolean

}