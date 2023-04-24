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
|name|String|The name of the category|Yes|Yes| |


### Products

`POST http://localhost:3000/api/products`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|name|String|The name of the product|Yes|Yes| |
|description|String|The description of the product|No|No| |
|price|Number|The price of the product|Yes|No|min: 0|
|category|String|The id of the category|No|No| |

### Customers

`POST http://localhost:3000/api/customers`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|fullName|String|The full name of the customer|Yes|No| |
|email|String|The email of the customer|Yes|Yes|regex `/^[\w-\.]+@([\w-]+\.?)+[\w-]{2,4}$/`|
|password|String|The password of the customer|Yes|No| |

### Carts

`POST http://localhost:3000/api/carts`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|customer|String|The id of the customer|Yes|No| |
|products|Array|The products in the cart and quantity. The array should include objects with the properties `{product: '{productID}', quantity: 2}`|No|No|Each object in the array must have the properties `product` and `quantity`. (`quantity` min: 1)|

### Orders

`POST http://localhost:3000/api/orders`

|Property|Type|Description|Required|Unique|Validation|
|---|---|---|---|---|---|
|customer|String|The id of the customer|Yes|No| |
|shippingAddress|String|The shipping address of the customer|Yes|No| |
|products|Array|The products in the order and quantity. The array should include objects with the properties `{product: '{productID}', quantity: 2}`|No|No|Each object in the array must have the properties `product` and `quantity`. (`quantity` min: 1)|


## Request Headers

None

## Request Examples

### Post to orders

`POST http://localhost:3000/api/orders`

**Request Body:**

```json
{
  "customer": "64402a45b7bda38e911ab0ed",
  "shippingAddress": "Somewhere Street 2",
  "products": [
    { "product": "64401f1fc3dbf1a6bde5f410", "quantity": 100 },
    { "product": "644110c08bad225fc5643ef7", "quantity": 10 }
  ]
}
```

### Get all orders

`GET http://localhost:3000/api/orders`

### Get a specific order

`GET http://localhost:3000/api/orders/644110ee8bad225fc5643efc`

### Update a specific order

`PUT http://localhost:3000/api/orders/644110ee8bad225fc5643efc`

Only the fields you send will be updated. In this example, only the `shippingAddress` field will be updated.

**Request Body:**

```json
{
  "shippingAddress": "Somewhere Street 3"
}
```

### Delete a specific order

`DELETE http://localhost:3000/api/orders/644110ee8bad225fc5643efc`

## Response Structure

Only `GET` requests populate fields with data from other collections. For example, the `GET` request for a single product will populate the `category` field with the category document that matches the `category` field in the product document.

`POST`, `PUT`, and `DELETE` requests does not populate fields with data from other collections, they only return the id in that field.

**Success Response:**

`POST`: Returns the newly created document. `Status code: 201`

`GET` collection: Returns an array of documents. `Status code: 200`

`PUT`: Returns the updated document. `Status code: 200`

`DELETE`: Returns the deleted document. `Status code: 200`

`GET` single document: Returns the document. `Status code: 200`

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
|updatedAt|Date|The date the cart was last updated|
|__v|Number|The version of the cart|

### Orders

`GET http://localhost:3000/api/orders/{id}`

|Property|Type|Description|
|---|---|---|
|_id|String|The id of the order|
|customer|Object|The customer of the order ([See Customers](#customers-1))|
|shippingAddress|String|The shipping address of the customer|
|products|Array|The products in the order and quantity. The array includes objects with the properties `{product: Object, quantity: 2}`. ([See Products](#products-1) for `product`)|
|createdAt|Date|The date the order was created|
|__v|Number|The version of the order|

## Response Examples

### Success POST response (Status code: 201)

`POST http://localhost:3000/api/orders`

**Request body**

```json
{
  "customer": "64402a45b7bda38e911ab0ed",
  "shippingAddress": "Somewhere Street 2",
  "products": [
    { "product": "64401f1fc3dbf1a6bde5f410", "quantity": 100 },
    { "product": "644110c08bad225fc5643ef7", "quantity": 10 }
  ]
}
```

**Reponse body**

```json
{
  "customer": "64402a45b7bda38e911ab0ed",
  "shippingAddress": "Somewhere Street 2",
  "products": [
    {
      "product": "64401f1fc3dbf1a6bde5f410",
      "quantity": 100,
      "_id": "64427de97dff9035ae194366"
    },
    {
      "product": "644110c08bad225fc5643ef7",
      "quantity": 10,
      "_id": "64427de97dff9035ae194367"
    }
  ],
  "_id": "64427de97dff9035ae194365",
  "createdAt": "2023-04-21T12:13:29.855Z",
  "__v": 0
}
```

### Validation Error POST response (Status code: 400)

`POST http://localhost:3000/api/orders`

**Request body**

* Missing required field `customer`

```json
{
  "shippingAddress": "Somewhere Street 2",
  "products": [
    { "product": "64401f1fc3dbf1a6bde5f410", "quantity": 100 },
    { "product": "644110c08bad225fc5643ef7", "quantity": 10 }
  ]
}
```

**Reponse body**

```json
{
  "message": "Orders validation failed: customer: Path `customer` is required."
}
```

### Success GET response (Status code: 200)

`GET http://localhost:3000/api/orders/6442838b4d02de6678d52314`

**Response body**

```json
{
  "_id": "6442838b4d02de6678d52314",
  "customer": {
    "_id": "6442838b4d02de6678d522d8",
    "fullName": "Vince Mayert",
    "email": "Vince.Mayert@gmail.com",
    "password": "9qYV8kcT70A7tD4",
    "__v": 0
  },
  "shippingAddress": "9336 Ozella Meadows",
  "products": [
    {
      "product": {
        "_id": "6442838a4d02de6678d522ca",
        "name": "Ergonomic Metal Sausages",
        "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
        "price": 310,
        "category": "6442838a4d02de6678d5229d",
        "__v": 0
      },
      "quantity": 2,
      "_id": "6442838b4d02de6678d52315"
    }
  ],
  "createdAt": "2023-04-21T12:37:31.149Z",
  "__v": 0
}
```

### Not Found Error GET response (Status code: 404)

`GET http://localhost:3000/api/orders/aaaaaaaaaaaaaaaaaaaaaaaa`

* The order with the id `aaaaaaaaaaaaaaaaaaaaaaaa` does not exist.

**Response body**

```json
{
  "message": "Not found"
}
```

### Success PUT response (Status code: 200)

`PUT http://localhost:3000/api/orders/6442838b4d02de6678d52314`

**Request body**

```json
{
  "shippingAddress": "Somewhere Street 3"
}
```

**Response body**

```json
{
  "_id": "6442838b4d02de6678d52314",
  "customer": "6442838b4d02de6678d522d8",
  "shippingAddress": "Somewhere Street 3",
  "products": [
    {
      "product": "6442838a4d02de6678d522ca",
      "quantity": 2,
      "_id": "6442838b4d02de6678d52315"
    }
  ],
  "createdAt": "2023-04-21T12:37:31.149Z",
  "__v": 0
}
```

### Success DELETE response (Status code: 200)

`DELETE http://localhost:3000/api/orders/6442838b4d02de6678d52314`

**Response body**

```json
{
  "_id": "6442838b4d02de6678d52314",
  "customer": "6442838b4d02de6678d522d8",
  "shippingAddress": "Somewhere Street 3",
  "products": [
    {
      "product": "6442838a4d02de6678d522ca",
      "quantity": 2,
      "_id": "6442838b4d02de6678d52315"
    }
  ],
  "createdAt": "2023-04-21T12:37:31.149Z",
  "__v": 0
}
```

## Error Handling

*List all possible error codes and their meanings, along with guidance on how to handle these errors in the client application. This will help developers troubleshoot issues and create more robust applications.*

## Rate Limiting and Throttling

*If the API enforces rate limiting or throttling, explain the limitations and how developers can monitor their usage to avoid being blocked or receiving error responses.*