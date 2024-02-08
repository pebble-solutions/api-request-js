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

Api Request Library provide a request controller that can manage authentication mechanisms 
on multiple requests.

```TypeScript
import {createRequestsController} from "@pebble-solutions/api-request";

const authController = // The auth object according to AuthorizationInterface rules

const controller = createRequestsController().withAuth(authController)

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

A bucket is a way to send multiple requests at the same time. All the process is sent
and return in one time.

```TypeScript

// Preparing requests
import {getRequest, createRequestsBucket} from "@pebble-solutions/api-request";

const req1 = getRequest("https://my-api.tld/resource")
const req2 = getRequest("https://my-api.tld/config")

const bucket = createRequestsBucket([req1, req2])

// All requests are sent at one time
await bucket.send()

// All content are returned in one time. Each iteration is one request content
await bucket.content().forEach(content => {
    console.log(content)
})

```