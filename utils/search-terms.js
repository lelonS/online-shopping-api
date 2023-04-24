import { query as searchWord } from 'express';
import { Schema } from 'mongoose';
import { Categories } from '../routes/categories.js';

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

  if (queries.category) {
    const category = await Categories.findOne({ name: getSearchTerm(queries.category) });
    if (category) {
      searchTerms.category = category._id;
    }
    else {
      searchTerms.category = null;
    }
  }

  return searchTerms;
}



export default getProductSearchTerms;