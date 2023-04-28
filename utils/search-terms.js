import mongoose, { Schema } from 'mongoose';


//['≈', '=', '>', '<']
const operators = {
  'like:': getLike,
  'gt:': getGreaterThan,
  'lt:': getLessThan
}


function getLike(searchString) {
  // Escape special characters
  searchString = searchString.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  return { $regex: searchString, $options: 'i' };
}

function getGreaterThan(searchString) {
  return { $gt: searchString };
}

function getLessThan(searchString) {
  return { $lt: searchString };
}


function getSearchTerm(query, key) {

  // If the query is an array there are multiple search terms
  // example: ?price=gt:10&price=lt:20
  if (Array.isArray(query)) {
    let allSearchTerms = [];
    for (const q of query) {
      // Add the search terms to the object
      allSearchTerms = allSearchTerms.concat(getSearchTerm(q, key));
    }
    return allSearchTerms;
  }

  // Check operator
  for (const op in operators) {
    if (query.startsWith(op)) {
      // Get the search term
      const searchTerm = query.split(op)[1];
      // Get the operator function
      const operatorFunction = operators[op];
      // Return the operator function with the search term
      return [{ [key]: operatorFunction(searchTerm) }]
    }
  }

  // If no operator, return full match
  return [{ [key]: query }];
}


// CATEGORIES
async function getSearchTermsCategories(queries) {
  let allSearchTerms = [];

  if (queries['name']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['name'], 'name'));
  }

  if (allSearchTerms.length === 0) { return {}; }
  return { $and: allSearchTerms };
}


// PRODUCTS
async function getSearchTermsProducts(queries) {
  let allSearchTerms = [];

  if (queries['name']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['name'], 'name'));
  }

  if (queries['description']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['description'], 'description'));
  }

  if (queries['price']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['price'], 'price'));
  }

  if (queries['category.name']) {
    const result = await mongoose.model('Categories').find({ $and: getSearchTerm(queries['category.name'], 'name') }).select('_id');
    allSearchTerms.push({ 'category': { $in: result } });
  }

  if (queries['category']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['category'], 'category'));
  }


  if (allSearchTerms.length === 0) { return {}; }
  return { $and: allSearchTerms };
}


// CUSTOMERS
async function getSearchTermsCustomers(queries) {
  let allSearchTerms = [];

  if (queries['fullName']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['fullName'], 'fullName'));
  }

  if (queries['email']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['email'], 'email'));
  }

  // L
  if (queries['password']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['password'], 'password'));
  }

  if (allSearchTerms.length === 0) { return {}; }
  return { $and: allSearchTerms };
}


// CARTS
async function getSearchTermsCarts(queries) {
  let allSearchTerms = await cartOrderHelper(queries);

  if (queries['lastUpdate']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['lastUpdate'], 'lastUpdate'));
  }

  if (allSearchTerms.length === 0) { return {}; }
  return { $and: allSearchTerms };
}


// ORDERS
async function getSearchTermsOrders(queries) {
  let allSearchTerms = await cartOrderHelper(queries);

  if (queries['createdAt']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['createdAt'], 'createdAt'));
  }

  if (allSearchTerms.length === 0) { return {}; }
  return { $and: allSearchTerms };
}


// HELPER FUNCTION FOR CARTS AND ORDERS
async function cartOrderHelper(queries) {
  let allSearchTerms = [];

  if (queries['customer']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['customer'], 'customer'));
  }

  if (queries['customer.fullName']) {
    const result = await mongoose.model('Customers').find({ $and: getSearchTerm(queries['customer.fullName'], 'fullName') }).select('_id');
    allSearchTerms.push({ 'customer': { $in: result } });
  }

  if (queries['customer.email']) {
    const result = await mongoose.model('Customers').find({ $and: getSearchTerm(queries['customer.email'], 'email') }).select('_id');
    allSearchTerms.push({ 'customer': { $in: result } });
  }

  if (queries['products.product']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['products.product'], 'products.product'));
  }

  if (queries['products.product.name']) {
    const result = await mongoose.model('Products').find({ $and: getSearchTerm(queries['products.product.name'], 'name') }).select('_id');
    allSearchTerms.push({ 'products.product': { $in: result } });
  }

  if (queries['products.product.description']) {
    const result = await mongoose.model('Products').find({ $and: getSearchTerm(queries['products.product.description'], 'description') }).select('_id');
    allSearchTerms.push({ 'products.product': { $in: result } });
  }

  if (queries['products.product.price']) {
    const result = await mongoose.model('Products').find({ $and: getSearchTerm(queries['products.product.price'], 'price') }).select('_id');
    allSearchTerms.push({ 'products.product': { $in: result } });
  }

  if (queries['products.product.category']) {
    const result = await mongoose.model('Products').find({ $and: getSearchTerm(queries['products.product.category'], 'category') }).select('_id');
    allSearchTerms.push({ 'products.product': { $in: result } });
  }

  if (queries['products.quantity']) {
    allSearchTerms = allSearchTerms.concat(getSearchTerm(queries['products.quantity'], 'products.quantity'));
  }

  return allSearchTerms;
}


export { getSearchTermsCategories, getSearchTermsProducts, getSearchTermsCustomers, getSearchTermsCarts, getSearchTermsOrders }