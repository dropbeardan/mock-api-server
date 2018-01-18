# Mock API Server

## About
The Mock API Server is a lightweight server that simulates a server response through a real-time network.

## Objectives
- [x] Users can anonmyously register a new mock API server instance protected by an authentication protocol.
- [x] Users can access their API instance via basic authentication to create, update and delete API endpoints.
- [x] Users can specify an object of headers, a numeric status code and static text data to be returned from the API endpoint when invoked.
- [x] Users can specify a time period for each endpoint which will simulate a processing delay before the response is sent.
- [ ] The server instance and all API endpoints will be removed if unused for over 48 hours.

## Usage (Website)
The easiest way to access the project is to visit the below URL where the project is currently being hosted with a simple GUI:

https://apiserver.dbplayground.com/

## Usage (API)
You can also access the endpoints through the API directly:

Base URL: https://apiserver.dbplayground.com/

## Workflow

1. Create an Instance
1. Authenticate into Instance
1. Manage Endpoints
    1. Get Endpoint(s)
    1. Create Endpoint
    1. Update Endpoint
    1. Delete Endpoint
1. Invoke / Trigger API Endpoint

## Instances
Instances refer to a collection of mock API endpoints.

Instances are created with a instance name and Password.
Users will be able to manage their endpoints by authenticating with the supplied instance name and Password.

The instance name will also serve as the base route for invoking the endpoint (i.e. calling the endpoint for a response).

### Creating An Instance

To create an instance, supply a valid instance name and Password into the body of the request.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/instances | POST | Creates a new Instance.

Body:

Format: JSON

Property | Type | Function
--- | --- | ---
instance | string | Instance name. Will be used as the base route for invoking the endpoints. <br /> Avoid using symbols/spaces as most of them will be sanitised.  <br /><br /> Example: <br /> An instance is created with the name Tom with the endpoints /cat and /dog <br /> Calling https://apiserver.dbplayground.com/Tom/cat will process and return the response associated with Tom's /cat endpoint.
password | string | Instance password.

#### Response:

Format: JSON

Element | Type | Function
--- | --- | ---
token | string | A JSON Web Token (https://jwt.io/) that will need to be passed into the Authorization header for managing endpoints.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | {<br />"token": "eyJhbG..."<br />} | New instance successfully created.
Insufficient Details Provided | 400 | {<br />"message": "Insufficient Details Provided."<br />} | Unable to read the instance and/or password from the request body.
instance name Not Available | 400 | {<br />"message": "instance name is not available."<br />} | An instance currently exists for the supplied instance.


## Authentication
In order to manage the endpoints for an instance, the User must authenticate with the server.

A successful authentication will supply the user with an access token which will be required in the Authorization header of all requests to access a protected route (e.g. /endpoints).

An access token serves to identify the instance to manage in addition to verifying that the User has privileges to manage the instance.

If an instance has just been succesfully created, an access token will have been returned which eliminates the need to immediately authenticate post-creation.

Each access token is only valid for a short period of time. After this period of time, the User will need to regenerate an access token to continue accessing the protected routes.

### Creating a Session (Authenticating)

To create an instance, supply a valid instance name and Password into the body of the request.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/sessions | POST | Authenticates User.

Body:

Format: JSON

Property | Type | Function
--- | --- | ---
instance | string | Instance name.
password | string | Instance password.

#### Response:

Format: JSON

Element | Type | Function
--- | --- | ---
token | string | A JSON Web Token (https://jwt.io/) that will need to be passed into the Authorization header for managing endpoints.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | {<br />"token": "eyJhbG..."<br />} | Access token granted.
Insufficient Details Provided | 400 | {<br />"message": "Insufficient Details Provided."<br />} | Unable to read the instance and/or password from the request body.
Invalid Credentials | 403 | {<br />"message": "Invalid credentials provided."<br />} | The instance and/or password associated with an active instance is invalid.


## Endpoints
Endpoints are where Users can create routes and specify the behaviour and response when that route is invoked (activated).

As endpoints represent the management section of an instance, Users will need to be authenticated prior to accessing any of the endpoint routes. This is done by supplying a valid access token in the Authorization Header of each request.

### Viewing Endpoints

Performing a GET request to the endpoints/ route will details all of the active endpoint(s) associated with an instance.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/endpoints | GET | Retrieves a list of active endpoints and their details.
https://apiserver.dbplayground.com/endpoints/:endpointId | GET | Retrieves the details of a specific active endpoint for the instance.

Params:

Format: JSON

Property | Type | Function
--- | --- | ---
endpointId (optional) | string | The ID of a valid endpoint for the instance.

Headers:

Format: JSON

Property | Type | Function
--- | --- | ---
Authorization | string | Valid access token.


#### Response:

Format: JSON

Element | Type | Function
--- | --- | ---
id | string | The ID of the endpoint.
route | string | The route path of the endpoint. This form part of the URL when invoking the endpoint.
method | string | The HTTP verb associated with the endpoint. <br /> Only RESTful verbs are acceptable (GET, POST, PATCH, PUT, DELETE).
status | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
headers | object | An object of headers to be returned when the endpoint is invoked.
response | any | The response to be returned when the endpoint is invoked.
delay | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | {<br />"route": "dog"<br />"method": "GET"<br />"headers": null<br />"statusCode": "dog"<br />"response": { "status": "ok" }<br />} | Endpoint details returned.
Success | 200 |  | No endpoint details are available for the request.
Unauthorized | 401 | {<br />"message": "Unauthorized."<br />} | A valid instance associated with the access token cannot be found or no/an invalid access token has been supplied in the Authorization header.

### Creating Endpoints

To create an endpoint, send a POST request to the endpoints/ route with the route name, HTTP method and at least one response property.

An endpoint signifies a combination of route name and HTTP method.

Different HTTP methods for the same route name will require individual endpoints.

Example:

Instance with instance name Tom has the following endpoints:

1. 
    * route: dog
    * method: GET
    * response: 'hello'
2. 
    * route: dog
    * method: POST
    * statusCode: 401
    * response: { "mission": "failed" }

Calling HTTP GET to https://apiserver.dbplayground.com/Tom/dog will return:
* statusCode: 200
* data: 'hello'

Calling HTTP POST to https://apiserver.dbplayground.com/Tom/dog will return:
* statusCode: 401
* data: { "mission": "failed" }

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/endpoints | POST | Creates a new endpoint for the specified route name and HTTP method.

Headers:

Format: JSON

Property | Type | Function
--- | --- | ---
Authorization | string | Valid access token.

Body:

Format: JSON

Property | Type | Function
--- | --- | ---
route | string | The route path of the endpoint. This form part of the URL when invoking the endpoint.
method | string | The HTTP verb associated with the endpoint. <br /> Only RESTful verbs are acceptable (GET, POST, PATCH, PUT, DELETE).
headers (optional) | object | An object of headers to be returned when the endpoint is invoked.
statusCode (optional) | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
response (optional) | any | The response to be returned when the endpoint is invoked.
delay (optional) | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.

#### Response:

Format: JSON

Element | Type | Function
--- | --- | ---
id | string | The ID of the endpoint.
route | string | The route path of the endpoint. This form part of the URL when invoking the endpoint.
method | string | The HTTP verb associated with the endpoint. <br /> Only RESTful verbs are acceptable (GET, POST, PATCH, PUT, DELETE).
headers | object | An object of headers to be returned when the endpoint is invoked.
statusCode | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
response | any | The response to be returned when the endpoint is invoked.
delay | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | {<br />"route": "dog"<br />"method": "GET"<br />"headers": null<br />"statusCode": "dog"<br />"response": { "status": "ok" }<br />} | Endpoint successfully created.
Success | 200 |  | Endpoint successfully created, however no endpoint details are available to be returned.
Insufficient Details | 400 | {<br />"message": "Insufficient details provided."<br />} | Unable to read the route and/or method from the request body.
Invalid Field Supplied | 400 | {<br />"message": "Invalid method supplied."<br />} | Supplied value(s) do not meet the data type or value requirement(s).
Unauthorized | 401 | {<br />"message": "Unauthorized."<br />} | A valid instance associated with the access token cannot be found or no/an invalid access token has been supplied in the Authorization header.

### Updating Endpoints

To update an endpoint, send a PATCH request to the endpoints/ route with a valid endpoint ID specified as a parameter.

The endpoint route name and method cannot be altered after it has been created. Should you wish to change these properties, delete the endpoint and recreate it with the new details.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/endpoints/:endpointId | PATCH | Updates an existing endpoint matching the specified endpoint ID.

Params:

Format: JSON

Property | Type | Function
--- | --- | ---
endpointId | string | The ID of a valid endpoint for the instance.

Headers:

Format: JSON

Property | Type | Function
--- | --- | ---
Authorization | string | Valid access token.

Body:

Format: JSON

Property | Type | Function
--- | --- | ---
headers (optional) | object | An object of headers to be returned when the endpoint is invoked.
statusCode (optional) | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
response (optional) | any | The response to be returned when the endpoint is invoked.
delay (optional) | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.

#### Response:

Format: JSON

Element | Type | Function
--- | --- | ---
id | string | The ID of the endpoint.
route | string | The route path of the endpoint. This form part of the URL when invoking the endpoint.
method | string | The HTTP verb associated with the endpoint. <br /> Only RESTful verbs are acceptable (GET, POST, PATCH, PUT, DELETE).
headers | object | An object of headers to be returned when the endpoint is invoked.
statusCode | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
response | any | The response to be returned when the endpoint is invoked.
delay | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | {<br />"route": "dog"<br />"method": "GET"<br />"headers": null<br />"statusCode": "dog"<br />"response": { "status": "ok" }<br />} | Endpoint successfully created.
Success | 200 |  | Endpoint successfully created, however no endpoint details are available to be returned.
Insufficient Details | 400 | {<br />"message": "Insufficient details provided."<br />} | Unable to read the route and/or method from the request body.
Invalid Field Supplied | 400 | {<br />"message": "Invalid method supplied."<br />} | Supplied value(s) do not meet the data type or value requirement(s).
Unauthorized | 401 | {<br />"message": "Unauthorized."<br />} | A valid instance associated with the access token cannot be found or no/an invalid access token has been supplied in the Authorization header.

### Deleting Endpoints

To delete an endpoint, send a DELETE request to the endpoints/ route with a valid endpoint ID specified as a parameter.

Deleting an endpoint is irreversible.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/endpoints/:endpointId | DELETE | Deletes an existing endpoint matching the specified endpoint ID.

Params:

Format: JSON

Property | Type | Function
--- | --- | ---
endpointId | string | The ID of a valid endpoint for the instance.

Headers:

Format: JSON

Property | Type | Function
--- | --- | ---
Authorization | string | Valid access token.

#### Response:

A list of the remaining endpoints associated with the instance and its details will be returned.

Format: JSON

Element | Type | Function
--- | --- | ---
id | string | The ID of the endpoint.
route | string | The route path of the endpoint. This form part of the URL when invoking the endpoint.
method | string | The HTTP verb associated with the endpoint. <br /> Only RESTful verbs are acceptable (GET, POST, PATCH, PUT, DELETE).
headers | object | An object of headers to be returned when the endpoint is invoked.
statusCode | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
response | any | The response to be returned when the endpoint is invoked.
delay | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | [<br />{<br />"route": "dog"<br />"method": "GET"<br />"headers": null<br />"statusCode": "dog"<br />"response": { "status": "ok" }<br />},<br />{...},<br />...<br />] | Endpoint successfully removed.
Invalid Field Supplied | 400 | {<br />"message": "Invalid method supplied."<br />} | Supplied value(s) do not meet the data type or value requirement(s).
Unauthorized | 401 | {<br />"message": "Unauthorized."<br />} | A valid instance associated with the access token cannot be found or no/an invalid access token has been supplied in the Authorization header.


## Invocations
Invoking or calling an endpoint is the process of sending a request to a URL associated with an endpoint.

The structure of the invocation URL for an endpoint is as follows:

> URL: https://apiserver.dbplayground.com/:instance/:route
> HTTP Method: routeMethod

Example:

Consider the following instance and endpoint:
1. Instance:
    * instance name: Tom
1. Endpoint:
    * route: 'cat'
    * method: 'GET'
    * response: { 'dog': 'woof' }

Sending a GET request to https://apiserver.dbplayground.com/Tom/cat will return the following response:

* statusCode: 200
* response: { 'dog': 'woof' }

### Checking/Viewing Invocation Endpoints

Performing a GET request to the https://apiserver.dbplayground.com/instance/ will return a list of the invocable endpoints for the specified instance.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/:instance | GET | Retrieves a list of invocable endpoints and their details.

Params:

Format: JSON

Property | Type | Function
--- | --- | ---
instance | string | The instance name of a valid API instance.

#### Response:

Format: JSON

Element | Type | Function
--- | --- | ---
id | string | The ID of the endpoint.
route | string | The route path of the endpoint. This form part of the URL when invoking the endpoint.
method | string | The HTTP verb associated with the endpoint. <br /> Only RESTful verbs are acceptable (GET, POST, PATCH, PUT, DELETE).
headers | object | An object of headers to be returned when the endpoint is invoked.
statusCode | number | A numeric status code associated with the HTTP response (100 - 599). Response uses 200 if not specified.
response | any | The response to be returned when the endpoint is invoked.
delay | number | A timeout (milliseconds) that will be passed between processing the request and returning the response. Simulates processing delay on a real server.


Result | Status Code | Example | Reason
--- | --- | --- | ---
Success | 200 | [<br />{<br />"route": "dog"<br />"method": "GET"<br />"headers": null<br />"statusCode": "dog"<br />"response": { "status": "ok" }<br />},<br />{...},<br />...<br />] | List of endpoint details returned.
Not Found | 404 | {<br />"message": "Not Found."<br />} | The instance name specified is invalid.

### Invoking Endpoints

Performing a request to the https://apiserver.dbplayground.com/:instance/:route with its corresponding HTTP method will process and return the response stored for its corresponding endpoint.

#### Request:

URL | Method | Function
--- | --- | ---
https://apiserver.dbplayground.com/:instance/:route | VARIABLE | Activates and returns the endpoints.

Method:

Format: A RESTful HTTP method (GET, POST, PUT, PATCH, DELETE).

Params:

Property | Type | Function
--- | --- | ---
instance | string | The instance name of a valid API instance.
route | string | The route associated with the endpoint belonging to the specified API instance.

#### Response:

Format: JSON

Result | Status Code | Example | Reason
--- | --- | --- | ---
Not Found | 404 | {<br />"message": "Not Found."<br />} | The combination of instance name, route name and route method is not associated with a valid endpoint.