import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../utils/error-messages.js';
import { getSearchTerms } from '../utils/search-terms.js';


const productsRouter = Router();

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Categories' }
});

export const Products = mongoose.model('Products', productSchema);


// Post a new product
productsRouter.post('/', async (req, res) => {
  // Create a new product
  const product = new Products(req.body);

  // Save the product
  product.save()
    .then((result) => {
      // Save successful
      res.status(201).send(result);
    })
    .catch((err) => {
      // Save failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Get all products
productsRouter.get('/', async (req, res) => {

  // Pagination
  const pageSize = 10;
  let pageNr = parseInt(req.query.page, 10) || 1;
  if (pageNr < 1) { pageNr = 1; }

  // Sorting
  let sortString = '_id';
  if (Array.isArray(req.query.sort)) {
    sortString = req.query.sort.join(' ');
  } else if (req.query.sort) {
    sortString = req.query.sort;
  }

  // Get all products
  Products.find(await getSearchTerms(req.query, productSchema))
    .limit(pageSize)
    .skip(pageSize * (pageNr - 1))
    .populate('category')
    .sort(sortString)
    .then((result) => {
      // Get successful
      res.set('page', pageNr);
      res.set('page-size', pageSize);
      res.send(result);
    })
    .catch((err) => {
      // Get failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Get a product by id
productsRouter.get('/:id', async (req, res) => {
  // Get the product by id
  Products.findById(req.params.id)
    .populate('category')
    .then((result) => {
      // Get successful
      if (result) {
        res.send(result);
      } else {
        // Not found
        const errorMessage = notFoundResponse();
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Get failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Update a product by id
productsRouter.put('/:id', async (req, res) => {
  // Update the product by id
  Products.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((result) => {
      // Update successful
      if (result) {
        res.send(result);
      } else {
        // Not found
        const errorMessage = notFoundResponse();
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Update failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Delete a product by id
productsRouter.delete('/:id', async (req, res) => {
  // Delete the product by id
  Products.findByIdAndDelete(req.params.id)
    .then((result) => {
      // Delete successful
      if (result) {
        res.send(result);
      } else {
        // Not found
        const errorMessage = notFoundResponse();
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Delete failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});





export default productsRouter;