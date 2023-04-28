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

---

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

---

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

---

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

---

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

---

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

---

### 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

**Description:**

Verify that the API can handle multiple concurrent requests. If a field is unique, verify that the API does not create duplicate records.

**Steps:**

1. Use `run collection` and run the the `7. Create test category` request with 2 iterations.
2. Use `7. Get test categories` and verify that the API returns 1 category.
3. Delete the category that was created.

**Expected Result:**

Only 1 category is created since the name of the category is unique.

**Actual Result:**

Only 1 category is created since the name of the category is unique.

**Pass/Fail:**

Pass

---

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
13. Repeat steps 1-12 for each collection to test.

**Expected Result:**

The API returns status code `201` for `POST`. Status code `200` for `GET`, `PUT`, and `DELETE`.

**Actual Result:**

The API returns status code `201` for `POST`. Status code `200` for `GET`, `PUT`, and `DELETE`.

**Pass/Fail:**

Pass

---

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

---

### 10. Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.

**Description:**

Verify the API’s performance under heavy load.

**Steps:**

1. Use `run collection` and run the the `10. Get products` request with 100 iterations.
2. Verify that the API returns the status code `200` and a consistent response time.

**Expected Result:**

The API returns the status code `200` and a consistent response time.

**Actual Result:**

The API returns the status code `200` and a consistent response time.

**Pass/Fail:**

Pass

---

### 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

**Description:**

Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

**Steps:**

1. Send a a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200` and the correct data.
3. Stop the MongoDB server.
4. Send a `GET` request to a valid endpoint. `GET /api/products`
5. Verify that the API returns the status code `500` and the correct error message.
6. Start the MongoDB server.
7. Send a `GET` request to a valid endpoint. `GET /api/products`
8. Verify that the API returns the status code `200` and the correct data.

**Expected Result:**

The API returns the status code `500` and the correct error message.

**Actual Result:**

The API returns the status code `500` and the message `"connection <monitor> to 16.170.174.41:27017 closed"`

**Pass/Fail:**

Pass. However, it takes a long time (~30s) for the API to return the error message. It would be better if the API returned the error message quicker.

---

### 12. Test the API’s ability to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

**Description:**

Verify that the API can handle edge cases, such as requests with missing or invalid parameters, missing or invalid properties in the request body in `POST` and `PUT` requests.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, do not set the required field `name` and set the price to a letter `"price": "a"`
3. Verify that the API returns the status code `400` and the correct error message.
4. Send a `PUT` request to a valid endpoint. `PUT /api/products/{id}`
5. In the request body, set the name to null `"name": null`
6. Verify that the API returns the status code `400` and the correct error message.
7. Send a `GET` request to a valid endpoint searching in an invalid field that. `GET /api/products?notAField=no`
8. Verify that the API returns all the products and the status code `200`.
9. Send a `GET` request to a valid endpoint searching for an invalid value. `GET /api/products?price=gt:a`
10. Verify that the API returns all the products and the status code `200`.
11. Send a `GET` request to an invalid id. `GET /api/products/a`
12. Verify that the API returns the status code `400` and the correct error message.

**Expected Result:**

The API returns the status code `400` and the correct error message.

**Actual Result:**

The API returns the status code `400` and the correct error message.

**Pass/Fail:**

Pass

---

### 13. Verify that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

**Description:**

Verify that the API correctly implements rate limiting after ~15 requests.

**Steps:**

1. Use `run collection` and run the the `13. Test rate limiting` request with 50 iterations
2. Observe the status code of the requests.
3. After ~15 requests, the status code should be `429`.

**Expected Result:**

After a bit more than 15 requests, the status code should be `429`.

**Actual Result:**

After a bit more than 15 requests, the status code is `429`.

**Pass/Fail:**

Pass

---

## Automated Tests

### 1. Validate that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

**Description:**

Verify that the API returns the correct HTTP status code `200` for a successful `GET` request.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200`.

**Expected Result:**

The API returns the status code `200`.

**Actual Result:**

The API returns the status code `200`.

**Pass/Fail:**

Pass

---

### 2. Verify that the API returns the expected data format (e.g., JSON, XML) in the response.

**Description:**

Verify that the API returns the expected data format `JSON` in the response.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the reponse header `Content-Type` includes `application/json;`.
3. Verify that the reponse body is a valid JSON.

**Expected Result:**

The reponse header `Content-Type` includes `application/json;` and the reponse body is a valid JSON.

**Actual Result:**

The reponse header `Content-Type` includes `application/json;` and the reponse body is a valid JSON.

**Pass/Fail:**

Pass

---

### 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid requests.

**Description:**

Verify that the API returns status code `400` when sending a `GET` request to a non-existing id.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. Do not send a request body.
3. Verify that the API returns the status code `400`.

**Expected Result:**

The API returns the status code `400`.

**Actual Result:**

The API returns the status code `400`.

**Pass/Fail:**

Pass

---

### 4. Create an automated test that sends a request with specific filters or search criteria and checks if the API returns the correct data.

**Description:**

Verify that the API returns the correct data when searching for a specific product.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products?name=like:ball&name=like:plastic`
2. Verify that the name of every product contains both the words `ball` and `plastic`.

**Expected Result:**

Every product name contains both the words "ball" and "plastic"

**Actual Result:**

Every product name contains both the words "ball" and "plastic"

**Pass/Fail:**

Pass

---

### 5. Verify that the API returns paginated results when a large number of records are requested.

**Description:**

Verify that the API results for collections are paginated.

**Steps:**

1. Send a `GET` request to a valid collection. `GET /api/products?`
2. Verify that the API returns 10 products or less.
3. Send a `GET` request to a valid collection, with `page=2`. `GET /api/products?page=2`
4. Verify that the API returns 10 products or less and that the products are different from the previous request.

**Expected Result:**

The API returns 10 products and page 2 is different from page 1.

**Actual Result:**

The API returns 10 products and page 2 is different from page 1.

**Pass/Fail:**

Pass

---

### 6. Test if the API handles special characters and non-English text correctly in input data and returned responses using an automated testing tool.

**Description:**

Verify that the API handles special characters and non-English text correctly when creating a product.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, set the name to `Test +- å\"'@😎я水` and the price to `1.99`
3. Verify that the API returns the status code `201` and the correct data.
4. Search for the product. `GET /api/products?name=Test %2B- å\"'@😎я水`
5. Verify that the API returns the status code `200` and the correct data.
6. Delete the product. `DELETE /api/products/{id}`

*Note: `+` is encoded as `%2B`*

**Expected Result:**

The API returns the status code `201` and the correct data when creating the product. The API returns the status code `200` and the correct data when searching for the product.

**Actual Result:**

The API returns the status code `201` and the correct data when creating the product. The API returns the status code `200` and the correct data when searching for the product.

**Pass/Fail:**

Pass

---

### 7. Develop an automated test that sends concurrent requests to the API to ensure that it can handle multiple users and maintain data consistency.

**Description:**

Verify that only one product is created when sending concurrent requests to create the same product.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, set a name and a price.
3. Send 2 concurrent requests to create the same product.
4. Verify that only one of the requests returns the status code `201`.
5. Delete the product. `DELETE /api/products/{id}`

**Expected Result:**

Only one of the requests returns the status code `201`.

**Actual Result:**

Only one of the requests returns the status code `201`.

**Pass/Fail:**

Pass

---

### 8. Create an automated test and test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

**Description:**

Verify that the API correctly handles different HTTP methods.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200` and the correct data.
3. Send a `POST` request to a valid endpoint. `POST /api/products`
4. Verify that the API returns the status code `201` and the correct data.
5. Send a `GET` request to the id. `GET /api/products/{id}`
6. Verify that the API returns the status code `200` and the correct data.
7. Send a `PUT` request to the id. `PUT /api/products/{id}`
8. Verify that the API returns the status code `200` and the correct data.
9. Send a `DELETE` request to the id. `DELETE /api/products/{id}`
10. Verify that the API returns the status code `200`.

**Expected Result:**

The API returns the correct status codes and data for each method.

**Actual Result:**

The API returns the correct status codes and data for each method.

**Pass/Fail:**

Pass

---

### 9. Write an automated test to check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

**Description:**

Verify that the API correctly handles updates to existing records.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, set the name to `Test auto 9` and the price to `10`
3. Verify that the API returns the status code `201` and the correct data.
4. Send a `GET` request to the id. `GET /api/products/{id}`
5. Verify that the API returns the status code `200` and the correct data.
6. Search for the product. `GET /api/products?name=Test auto 9`
7. Verify that the API returns the status code `200` and the correct data.
8. Send a `PUT` request to the id. `PUT /api/products/{id}`
9. In the request body, set the name to `Test auto 9 updated` and the price to `20`
10. Do steps 4-7 again.
11. Delete the product. `DELETE /api/products/{id}`

**Expected Result:**

Updates to existing records are saved and reflected in subsequent requests.

**Actual Result:**

Updates to existing records are saved and reflected in subsequent requests.

**Pass/Fail:**

Pass

---

### 10. Design an automated performance test that simulates a large number of users making requests simultaneously to check the API’s performance under heavy load.

**Description:**

Verify that the response time is consistent when sending a large number of requests. 

*Note*: The API gets rate limited after ~15 requests.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200`
3. Check the response time.
4. Send 50 concurrent requests to the same endpoint.
5. Verify that the API returns the status code `200`
6. Check the response time.

**Expected Result:**

The response time is less than 200 ms.

**Actual Result:**

The response time is less than 200 ms.

**Pass/Fail:**

Pass. 

*Note*: Without rate limiting, the response time increases after 15 concurrent requests.

---

### 11. Create an automated test that verifies the API can recover gracefully from failures, such as database connection issues or third-party service outages, without compromising data integrity.

**Description:**

Verify that the API can recover gracefully from database connection loss.

*Note: This test requires manual intervention.*

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200` and the correct data.
3. Stop the database.
4. Send a `GET` request to a valid endpoint. `GET /api/products`
5. Verify that the API returns the status code `500` and the correct error message.
6. Start the database.
7. Send a `GET` request to a valid endpoint. `GET /api/products`
8. Verify that the API returns the status code `200` and the correct data.

**Expected Result:**

The API recovers gracefully from database connection loss.

**Actual Result:**

The API recovers gracefully from database connection loss.

**Pass/Fail:**

Pass

---

### 12. Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

**Description:**

Verify that the API returns the correct error messages when sending requests with missing or invalid parameters.

**Steps:**

1. Send a `POST` request to a valid endpoint. `POST /api/products`
2. In the request body, do not set the required field `name` and set the price to a letter `"price": "a"`
3. Verify that the API returns the status code `400` and the correct error message.
4. Send a `PUT` request to a valid endpoint. `PUT /api/products/{id}`
5. In the request body, set the name to null `"name": null`
6. Verify that the API returns the status code `400` and the correct error message.
7. Send a `GET` request to a valid endpoint searching in an invalid field that. `GET /api/products?notAField=no`
8. Verify that the API returns all the products and the status code `200`.
9. Send a `GET` request to a valid endpoint searching for an invalid value. `GET /api/products?price=gt:a`
10. Verify that the API returns all the products and the status code `200`.
11. Send a `GET` request to an invalid id. `GET /api/products/a`
12. Verify that the API returns the status code `400` and the correct error message.

**Expected Result:**

The API returns the correct error messages when sending requests with missing or invalid parameters.

**Actual Result:**

The API returns the correct error messages when sending requests with missing or invalid parameters.

**Pass/Fail:**

Pass

---

### 13. Write an automated test to verify that the API correctly implements any rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

**Description:**

Verify that the API correctly implements rate limiting.

**Steps:**

1. Send a `GET` request to a valid endpoint. `GET /api/products`
2. Verify that the API returns the status code `200`
3. Send 50 concurrent requests to the same endpoint.
4. Verify that some of the requests return the status code `429`.

**Expected Result:**

Some of the requests return the status code `429`.

**Actual Result:**

Some of the requests return the status code `429`.

**Pass/Fail:**

Pass