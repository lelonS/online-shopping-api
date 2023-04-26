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

**Expected Result:**

**Actual Result:**

**Pass/Fail:**


### 8. Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

**Description:**

Verify that the API correctly handles different successful HTTP methods for each endpoint.
