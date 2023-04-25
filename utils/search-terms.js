import { query as searchWord } from 'express';
import mongoose, { Schema } from 'mongoose';
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

async function getSearchTerms(queries, schema) {
  const searchTerms = {}

  try {
    for (const key in queries) {
      const field = key.split('.')[0]; // Example: products.product.name -> products, shippingAddress -> shippingAddress
      const searchWord = queries[key];
      let path = schema.paths[field];

      // If the field doesn't exist in the schema, skip it
      if (!path) { continue; }

      if (path.instance === 'ObjectId' && path.options.ref) {
        // Get the collection name
        const collection = path.options.ref;

        // Get the field to search
        const fieldToSearch = key.split('.')[1];
        const newKey = key.split('.')[0];

        // Use find on the collection to get the ObjectId
        const result = await mongoose.model(collection).find({ [fieldToSearch]: getSearchTerm(searchWord) }).select('_id');

        // Add it to the search terms
        searchTerms[newKey] = { $in: result };
      } else if (path.instance === 'Array') {
        // Get search terms for the array
        const newQuery = key.split('.').slice(1).join('.') // Example: products.product.name -> product.name
        const newKey = key.split('.').slice(0, -1).join('.') // Example: products.product.name -> products.product

        // Get the search term for the array
        const arraySearchTerm = await getSearchTerms({ [newQuery]: searchWord }, path.schema);

        // Add it to the search terms
        searchTerms[newKey] = Object.values(arraySearchTerm)[0];
      }
      else {
        searchTerms[key] = getSearchTerm(searchWord);
      }
    }
    console.log(searchTerms);
    return searchTerms;
  } catch (err) {
    // console.log(err);
    // If error in search term generation, return this (this makes it so that no documents are found)
    // Common error is invalid id error (such as ?_id=1234)
    return { 'null': 'null' };
  }
}


export { getSearchTerms };