# Documentation

Quick reference

* [Authentication and Authorization](#authentication-and-authorization)
* [Endpoint Structure](#endpoint-structure)
* [Request Parameters](#request-parameters)
* [Request Headers](#request-headers)
* [Request Examples](#request-examples)
* [Response Structure](#response-structure)
* [Response Examples](#response-examples)
* [Error Handling](#error-handling)
* [Rate Limiting and Throttling](#rate-limiting-and-throttling)

---



## Authentication and Authorization

To access the API, you must have a mongoDB connection string. To use your connection string you put it in the `secrets.js` file. The easiest way to do this is to remove the `.template` part from [secrets.js.template](../secrets.js.template).

## Endpoint Structure

**Base URL:** `https://localhost:3000/api`

**Endpoints:**

* `GET /{collection}` - Get all documents in a collection
* `GET /{collection}/{id}` - Get a single document by ID
* `POST /{collection}` - Create a new document
* `PUT /{collection}/{id}` - Update a document
* `DELETE /{collection}/{id}` - Delete a document

**Collections:**

* categories
* products
* customers
* carts
* orders


## Request Parameters

If you send a field that is not in the schema, it will be ignored.

When using `PUT` requests, you only need to send the fields you want to update. For example, if you want to update the name of a product, you only need to send the `name` field.

`PUT` requests are also validated.

### Categories

`POST http://localhost:3000/api/categories`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|name|String|The name of the category|Yes|Yes|None|


### Products

`POST http://localhost:3000/api/products`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|name|String|The name of the product|Yes|Yes|None|
|description|String|The description of the product|No|No|None|
|price|Number|The price of the product|Yes|No|min: 1|
|category|String|The id of the category|No|No|None|

### Customers

`POST http://localhost:3000/api/customers`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|fullName|String|The full name of the customer|Yes|No|None|
|email|String|The email of the customer|Yes|Yes|In the format of [word]@[word].[word]|
|password|String|The password of the customer|Yes|No|None|

### Carts

`POST http://localhost:3000/api/carts`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|customer|String|The id of the customer|Yes|No|None|
|products|Array|The products in the cart and quantity. The array should include objects with the properties `{product: '{productID}', quantity: 2}`|Yes|No|Each object in the array must have the properties `product` and `quantity`. (`quantity` min: 1)|

### Orders

`POST http://localhost:3000/api/orders`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|customer|String|The id of the customer|Yes|No|None|
|shippingAddress|String|The shipping address of the customer|Yes|No|None|
|products|Array|The products in the order and quantity. The array should include objects with the properties `{product: '{productID}', quantity: 2}`|Yes|No|Each object in the array must have the properties `product` and `quantity`. (`quantity` min: 1)|


## Request Headers

None

## Request Examples

*Include example requests for each endpoint, demonstrating how to use the various parameters and headers. Use consistent formatting and code snippets to make it easy for readers to understand and implement.*

## Response Structure

Only `GET` requests populate fields with data from other collections. For example, the `GET` request for a single product will populate the `category` field with the category document that matches the `category` field in the product document.

`POST`, `PUT`, and `DELETE` requests does not populate fields with data from other collections, they only return the id in that field.

`POST`: Returns the newly created document

`GET` collection: Returns an array of documents

`PUT`: Returns the updated document

`DELETE`: Returns the deleted document

`GET` single document: Returns the document

### Categories

`GET http://localhost:3000/api/categories/{id}`

|Property|Type|Description|
|---|---|---|
|_id|String|The id of the category|
|name|String|The name of the category|
|__v|Number|The version of the category|

### Products

`GET http://localhost:3000/api/products/{id}`

|Property|Type|Description|
|---|---|---|
|_id|String|The id of the product|
|name|String|The name of the product|
|description|String|The description of the product|
|price|Number|The price of the product|
|category|Object|The category of the product ([See Categories](#categories-1))|
|__v|Number|The version of the product|

### Customers

`GET http://localhost:3000/api/customers/{id}`

|Property|Type|Description|
|---|---|---|
|_id|String|The id of the customer|
|fullName|String|The full name of the customer|
|email|String|The email of the customer|
|password|String|The password of the customer|
|__v|Number|The version of the customer|

### Carts

`GET http://localhost:3000/api/carts/{id}`

|Property|Type|Description|
|---|---|---|
|_id|String|The id of the cart|
|customer|Object|The customer of the cart ([See Customers](#customers-1))|
|products|Array|The products in the cart and quantity. The array includes objects with the properties `{product: Object, quantity: 2}`. ([See Products](#products-1) for `product`)|
|__v|Number|The version of the cart|

### Orders

`GET http://localhost:3000/api/orders/{id}`

|Property|Type|Description|
|---|---|---|
|_id|String|The id of the order|
|customer|Object|The customer of the order ([See Customers](#customers-1))|
|shippingAddress|String|The shipping address of the customer|
|products|Array|The products in the order and quantity. The array includes objects with the properties `{product: Object, quantity: 2}`. ([See Products](#products-1) for `product`)|
|__v|Number|The version of the order|

## Response Examples

*Provide example responses for each endpoint, showcasing both successful and error scenarios. These examples should help developers understand what to expect when interacting with the API.*

## Error Handling

*List all possible error codes and their meanings, along with guidance on how to handle these errors in the client application. This will help developers troubleshoot issues and create more robust applications.*

## Rate Limiting and Throttling

*If the API enforces rate limiting or throttling, explain the limitations and how developers can monitor their usage to avoid being blocked or receiving error responses.*