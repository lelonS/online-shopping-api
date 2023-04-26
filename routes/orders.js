import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../utils/error-messages.js';
import { notEmptyArrayValidator } from '../utils/custom-validators.js';
import { getSearchTerms } from '../utils/search-terms.js';


const ordersRouter = Router();

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customers', required: true },
  shippingAddress: { type: String, required: true },
  products: {
    type: [{
      product: { type: Schema.Types.ObjectId, ref: 'Products', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }],
    validate: {
      validator: notEmptyArrayValidator.func,
      message: 'A minimum of one product is required'
    }
  },
  createdAt: { type: Date, default: Date.now }
});

export const Orders = mongoose.model('Orders', orderSchema);


// Post a new order
ordersRouter.post('/', async (req, res) => {
  // Create a new order
  const order = new Orders(req.body);

  // Save the order
  order.save()
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


// Get all orders
ordersRouter.get('/', async (req, res) => {
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

  // Get all orders
  Orders.find(await getSearchTerms(req.query, orderSchema))
    .limit(pageSize)
    .skip(pageSize * (pageNr - 1))
    .populate('customer')
    .populate('products.product')
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


// Get an order by id
ordersRouter.get('/:id', async (req, res) => {
  // Get the order by id
  Orders.findById(req.params.id)
    .populate('customer')
    .populate('products.product')
    .then((result) => {
      // Get successful
      if (result) {
        res.send(result);
      } else {
        // Order not found
        const errorMessage = notFoundResponse('Order');
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Get failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Update an order by id
ordersRouter.put('/:id', async (req, res) => {
  // Update the order by id
  Orders.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((result) => {
      // Update successful
      if (result) {
        res.send(result);
      } else {
        // Order not found
        const errorMessage = notFoundResponse('Order');
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Update failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});


// Delete an order by id
ordersRouter.delete('/:id', async (req, res) => {
  // Delete the order by id
  Orders.findByIdAndDelete(req.params.id)
    .then((result) => {
      // Delete successful
      if (result) {
        res.send(result);
      } else {
        // Order not found
        const errorMessage = notFoundResponse('Order');
        res.status(errorMessage.status).send(errorMessage.response);
      }
    })
    .catch((err) => {
      // Delete failed. Get the status code and send the error message
      const errorMessage = errorResponse(err);
      res.status(errorMessage.status).send(errorMessage.response);
    });
});





export default ordersRouter;