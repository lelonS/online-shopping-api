import { query as searchWord } from 'express';
import { Schema } from 'mongoose';
import { Categories } from '../routes/categories.js';
import { Products } from '../routes/products.js';
import { Customers } from '../routes/customers.js';
import { Orders } from '../routes/orders.js';
import { Carts } from '../routes/carts.js';

//['≈', '=', '>', '<']
const operators = {
  'like': getLike,
  'gt': getGreaterThan,
  'lt': getLessThan
}


function getLike(searchString) {
  return { $regex: searchString, $options: 'i' };
}

function getGreaterThan(searchString) {
  return { $gt: searchString };
}

function getLessThan(searchString) {
  return { $lt: searchString };
}



function getSearchTerm(query) {

  // If the query is an array there are multiple search terms
  // example: ?price=gt:10&price=lt:20
  if (Array.isArray(query)) {
    let allSearchTerms = {};
    for (const q of query) {
      // Add the search terms to the object
      Object.assign(allSearchTerms, getSearchTerm(q));
    }
    console.log(allSearchTerms);
    return allSearchTerms;
  }

  const terms = query.split(':');

  // If there is only one term, it must be an exact match
  if (terms.length === 1) {
    return terms[0];
  } else if (terms.length === 2) {
    // If there are two terms, it must be a comparison
    if (operators[terms[0]]) {
      return operators[terms[0]](terms[1]);
    } else {
      return terms[1];
    }
  }

}

// Product search terms
async function getProductSearchTerms(queries) {
  const searchTerms = {}
  if (queries.name) {
    searchTerms.name = getSearchTerm(queries.name);
  }
  if (queries.description) {
    searchTerms.description = getSearchTerm(queries.description);
  }
  if (queries.price) {
    searchTerms.price = getSearchTerm(queries.price);
  }
  // Populated fields
  if (queries.category) {
    const category = await Categories.findOne({ name: getSearchTerm(queries.category) });
    if (category) {
      searchTerms.category = category._id;
    }
    else {
      searchTerms.category = null;
    }
  }
  console.log(searchTerms);
  return searchTerms;
}

// Category search terms
async function getCategorySearchTerms(queries) {
  const searchTerms = {}

  if (queries.name) {
    searchTerms.name = getSearchTerm(queries.name);
  }

  return searchTerms;
}

// Customer search terms
async function getCustomerSearchTerms(queries) {
  const searchTerms = {}

  if (queries.name) {
    searchTerms.name = getSearchTerm(queries.name);
  }

  if (queries.email) {
    searchTerms.email = getSearchTerm(queries.email);
  }

  return searchTerms;
}

// Order search terms
async function getOrderSearchTerms(queries) {
  const searchTerms = {}

  if (queries.customer) {
    const customer = await Customers.findOne({ fullName: getSearchTerm(queries.customer) });
    if (customer) {
      searchTerms.customer = customer._id;
    }
    else {
      searchTerms.customer = null;
    }
  }

  if (queries.product) {
    const product = await Products.findOne({ name: getSearchTerm(queries.product) });
    if (product) {
      searchTerms.product = product._id;
    }
    else {
      searchTerms.product = null;
    }
  }

  return searchTerms;
}

// Cart search terms
async function getCartSearchTerms(queries) {
  const searchTerms = {}

  if (queries.customer) {
    const customer = await Customers.findOne({ fullName: getSearchTerm(queries.customer) });
    if (customer) {
      searchTerms.customer = customer._id;
    }
    else {
      searchTerms.customer = null;
    }
  }

  if (queries.product) {
    const product = await Products.findOne({ name: getSearchTerm(queries.product) });
    if (product) {
      searchTerms.product = product._id;
    }
    else {
      searchTerms.product = null;
    }
  }

  return searchTerms;
}


export { getProductSearchTerms, getCategorySearchTerms, getCustomerSearchTerms, getOrderSearchTerms, getCartSearchTerms };