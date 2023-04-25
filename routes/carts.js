import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../utils/error-messages.js';
import { getSearchTerms } from '../utils/search-terms.js';


const cartsRouter = Router();

const cartSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customers', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Products' },
    quantity: { type: Number, required: true, min: 1 }
  }],
  lastUpdate: { type: Date, default: Date.now }
});

export const Carts = mongoose.model('Carts', cartSchema);


// Post a new cart
cartsRouter.post('/', async (req, res) => {
  // Create a new cart
  const cart = new Carts(req.body);

  // Save the cart
  cart.save()
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


// Get all carts
cartsRouter.get('/', async (req, res) => {
  // Pagination
  const pageSize = 10;
  let pageNr = parseInt(req.query.page, 10) || 1;
  if (pageNr < 1) { pageNr = 1; }

  // Get all carts
  Carts.find(await getSearchTerms(req.query, cartSchema))
    .limit(pageSize)
    .skip(pageSize * (pageNr - 1))
    .populate('customer')
    .populate('products.product')
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


// Get a cart by id
cartsRouter.get('/:id', async (req, res) => {
  // Get the cart by id
  Carts.findById(req.params.id)
    .populate('customer')
    .populate('products.product')
    .then((result) => {
      // Get successful
      if (result) {
        res.send(result);
      } else {
        // Cart not found
        const errorMessage = notFoundResponse('Cart');
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Get failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Update a cart by id
cartsRouter.put('/:id', async (req, res) => {
  // Update the cart by id
  const params = req.body;
  params.lastUpdate = Date.now();

  Carts.findByIdAndUpdate(req.params.id, params, { new: true, runValidators: true })
    .then((result) => {
      // Update successful
      if (result) {
        res.send(result);
      } else {
        // Cart not found
        const errorMessage = notFoundResponse('Cart');
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Update failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Delete a cart by id
cartsRouter.delete('/:id', async (req, res) => {
  // Delete the cart by id
  Carts.findByIdAndDelete(req.params.id)
    .then((result) => {
      // Delete successful
      if (result) {
        res.send(result);
      } else {
        // Cart not found
        const errorMessage = notFoundResponse('Cart');
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Delete failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});





export default cartsRouter;