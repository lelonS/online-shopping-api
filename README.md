# ONLINE SHOPPING API

### [Go to the API Documentation](/docs/index.md)

### [Go to the Test Report](/tests/test-docs.md)

## Overview

This is a RESTful API for an online shopping application. It is built with Node.js, Express, Mongoose and MongoDB.

The purpose of this API is to provide a backend for an online shopping application. The API provides endpoints to create, read, update, and delete products, categories, customers, carts, and orders.

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/lelonS/online-shopping-api.git
```

2. Navigate to the project directory

```bash
cd online-shopping-api
```

3. Install dependencies

```bash
npm install
```

4. Add connection string
    1. Remove the `.template` part from [secrets.js.template](secrets.js.template)
    2. Add your connection string to the `secrets.js` file

5. Run the API

```bash	
node api.js
```

6. Make a request to the API

```bash
curl http://localhost:3000/api/products
```

## Generate mock data

1. Navigate to the project directory

2. Run the script



**Generate mock data in the database**

⚠️This will replace all data in the database⚠️

```bash
npm run mock-db
```

**Generate mock data as JSON**

⚠️This will replace all data in the json files⚠️

```bash
npm run mock-json
```
