# Testing

## Manual Testing

### 1. Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

**Description:** 

Verify that the API returns the status code `200` for a successful GET request.

**Steps:**

1. Send a GET request to a valid endpoint. `GET /api/products` 
2. Verify that the API returns the status code `200`.

**Expected Result:**

The API returns the status code `200`.

**Actual Result:**

The API returns the status code `200`.

**Pass/Fail:**

Pass


### 2. Check if the API returns the expected data format (e.g., JSON, XML) in the response.

**Description:**

Verify that the API returns in json format in the response.

**Steps:**

1. Send a GET request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the data format `json`.

**Expected Result:**

The API returns the data format `json`.

**Actual Result:**

The API returns the data format `json`.

**Pass/Fail:**

Pass


### 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.

**Description:**

Verify that the API returns the status code `400` a `POST` request with a missing required field.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, do not include the required field `name`.
3. Verify that the API returns the status code `400`.

**Expected Result:**

The API returns the status code `400`.

**Actual Result:**

The API returns the status code `400`.

**Pass/Fail:**

Pass


### 4. Test if the API returns the correct data when querying with specific filters or search criteria.

**Description:**

Verify that the API returns the correct data when searching for a specific for a specific product.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products?name=like:ball`
2. Verify that all products returned by the API contain the word `ball` in the name.

**Expected Result:**

All products returned by the API contain the word `ball` in the name.

**Actual Result:**

All products returned by the API contain the word `ball` in the name.

**Pass/Fail:**

Pass


### 5. Verify that the API returns paginated results when a large number of records are requested.

**Description:**

Verify that the API returns paginated results when a large number of records are requested. For example, if there is 100 products in the database, the API should return the first 10 products by default.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products` (There should be more than 10 products in the database)
2. Verify that the API returns 10 products.

**Expected Result:**

The API returns 10 products.

**Actual Result:**

The API returns 10 products.

**Pass/Fail:**

Pass


### 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.

**Description:**

Verify that the API handles special characters and non-English text correctly, such as `å\"'@😎я水`.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, include the special characters and non-English text `Test +- å\"'@😎я水` in the `name` field. Set the `price` field to `10`.
3. Verify that the API returns the status code `201` and the correct `name`.
4. Delete the product that was created in the previous step.

**Expected Result:**

The API returns the status code `201` and `"name": "Test +- å\"'@😎я水"`.

**Actual Result:**

The API returns the status code `201` and `"name": "Test +- å\"'@😎я水"`.

**Pass/Fail:**

Pass


### 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

**Description:**

Verify that the API can handle multiple concurrent requests.

**Steps:**

TBD

**Expected Result:**

TBD

**Actual Result:**

TBD

**Pass/Fail:**

TBD


### 8. Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

**Description:**

Verify that the API correctly handles different successful HTTP methods for each endpoint.

**Steps:**

*All collections: Categories, Products, Customers, Carts, Orders*

1. Send a `POST` request to a collection endpoint. `POST /api/{collection}`
2. In the request body, include the required fields.
3. Verify that the API returns the status code `201` and the correct data. Mark down the id
4. Send a `GET` request to a collection endpoint. `GET /api/{collection}`
5. Verify that the API returns the status code `200` and the correct data.
6. Send a `GET` request to the document that was created `step 1`. `GET /api/{collection}/{id}`
7. Verify that the API returns the status code `200` and the correct data.
8. Send a `PUT` request to the document that was created `step 1`. `PUT /api/{collection}/{id}`
9. In the request body, change the value of one of the fields.
10. Verify that the API returns the status code `200` and the correct data.
11. Send a `DELETE` request to the document that was created `step 1`. `DELETE /api/{collection}/{id}`
12. Verify that the API returns the status code `200`.
13. Repeat steps 1-12 for each collection.

**Expected Result:**

The API returns status code `201` for `POST`. Status code `200` for `GET`, `PUT`, and `DELETE`.

**Actual Result:**

The API returns status code `201` for `POST`. Status code `200` for `GET`, `PUT`, and `DELETE`.

**Pass/Fail:**

Pass


### 9. Check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

**Description:**

Verify that updates to existing records are saved and reflected in subsequent requests.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, set `"name": "Test"` and `"price": 10`.
3. Verify that the API returns the status code `201` and the correct data.
4. Save the id of the product that was created in the previous step.
5. Send a `GET` request to the product that was created in step 3. `GET /api/products/{id}`
6. Verify that the API returns the status code `200` and the correct data.
7. Send a `PUT` request to the product that was created in step 3. `PUT /api/products/{id}`
8. In the request body, change the value of the field `name` to `Test 2`.
9. Verify that the API returns the status code `200` and the correct data.
10. Send a `GET` request to the product that was created in step 3. `GET /api/products/{id}`
11. Verify that the API returns the status code `200` and the correct data.
12. Delete the product that was created in step 3.

**Expected Result:**

The API returns the status code `200` and the correct data.

**Actual Result:**

The API returns the status code `200` and the correct data.

**Pass/Fail:**

Pass


### 10. Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.

**Description:**

Verify the API’s performance under heavy load.

**Steps:**

1. Send multiple `GET` requests to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200` and the response time.

**Expected Result:**

TBD

**Actual Result:**

TBD

**Pass/Fail:**

TBD


### 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

### 12. Test the API’s ability to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

### 13. Verify that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.
