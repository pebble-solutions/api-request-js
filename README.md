# Api Request Library

A simple way to fetch resources !

Api Request Library is a tool provided by Pebble to make authenticated requests to resources 
API easier.

## Installation

> [!WARNING]  
> Package is not published yet. This part of the documentation is currently not applicable

Run the following on your project 

```shell
npm install @pebble-solutions/api-request
```

## Usage

### Single request with params

```TypeScript
import {getRequest} from "@pebble-solutions/api-request";

const request = getRequest("https://my-api.tld/resource", {
    limit: 10
})
await request.send()

const content = request.content()

console.log(content)
```

### Manage authentication with controller

Api Request Library provide a requests controller that can manage authentication mechanisms on multiple requests.
Request Controller is a bridge between authentication process and HTTP requests. In a controller, all requests will 
share the same authentication object.

```TypeScript
import {createRequestsController} from "@pebble-solutions/api-request";

// Auth object :
// The auth object must respect AuthorizationInterface rules
const auth = {
    getToken: () => {
        return Promise.resolve("valid.authorization.token")
    }
}

// Plug auth onto a new requests controller
const controller = createRequestsController().withAuth(auth)

// All the following requests will be authenticated.

// Send GET request through the controller
const request1 = controller.get("https://my-api.tld/resource", {
    limit: 10
})
await request1.send()

console.log(await request1.content())

// Send POST request through the controller
const request2 = controller.post("https://my-api.tld/resource", {
    name: "John",
    forename: "DOE"
})
await request2.send()
```

### Requests bucket

A bucket is a way to send multiple requests at the same time. Bucket contains multiple requests that will be sent all 
together. All requests are places in a global promise that must be resolved before getting all the results.

#### Create a bucket from scratch

```TypeScript

// Preparing requests
import {getRequest, createRequestsBucket} from "@pebble-solutions/api-request";

const req1 = getRequest("https://my-api.tld/resource")
const req2 = getRequest("https://my-api.tld/config")

const bucket = createRequestsBucket([req1, req2])

// All requests are sent at one time
await bucket.send()

// All content is returned back on an array with the same index order as the original one
const content = await bucket.content()

content.forEach(content => {
    console.log(content)
})

```

#### Create a bucket throughout a requests controller

```TypeScript
import {createRequestsController, getRequest} from "@pebble-solutions/api-request";

// Auth object :
// The auth object must respect AuthorizationInterface rules
const auth = {
    getToken: () => {
        return Promise.resolve("valid.authorization.token")
    }
}

// Plug auth onto a new requests controller
const controller = createRequestsController().withAuth(auth)

const req1 = getRequest("https://my-api.tld/resource")
const req2 = getRequest("https://my-api.tld/config")

// The addRequests (with an s) method will create a bucket with all provided requests
const bucket = controller.addRequests([req1, req2])

// All requests are sent at one time
await bucket.send()

// All content is returned back on an array with the same index order as the original one
const content = await bucket.content()

content.forEach(content => {
    console.log(content)
})
```

### Error management

All errors that might occur during the request will throw through an `HTTPError` instance.

```TypeScript
import {getRequest, HTTPResponseError} from "@pebble-solutions/api-request";

const request = getRequest("https://my-api.tld/resource")

try {
    await request.send()

    const content = await request.content()

    console.log(content)
} catch (e) {
    console.log("Error occure : ", e.message)

    if (e instanceof HTTPResponseError) {
        console.log("More informations : ", e.status, e.statusText)
    }
}

```