import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../utils/error-messages.js';
import { emailValidator } from '../utils/custom-validators.js';
import { getCustomerSearchTerms } from '../utils/search-terms.js';


const customersRouter = Router();

const customerSchema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String, required: true, unique: true, validate: {
      validator: emailValidator.func,
      message: emailValidator.message
    }
  },
  password: { type: String, required: true }
});

export const Customers = mongoose.model('Customers', customerSchema);


// Post a new customer
customersRouter.post('/', async (req, res) => {
  // Create a new customer
  const customer = new Customers(req.body);

  // Save the customer
  customer.save()
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


// Get all customers
customersRouter.get('/', async (req, res) => {
  // Pagination
  const pageSize = 10;
  let pageNr = parseInt(req.query.page, 10) || 1;
  if (pageNr < 1) { pageNr = 1; }

  // Get all customers
  Customers.find(await getCustomerSearchTerms(req.query))
    .limit(pageSize)
    .skip(pageSize * (pageNr - 1))
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


// Get a customer by id
customersRouter.get('/:id', async (req, res) => {
  // Get the customer by id
  Customers.findById(req.params.id)
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


// Update a customer by id
customersRouter.put('/:id', async (req, res) => {
  // Update the customer by id
  Customers.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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


// Delete a customer by id
customersRouter.delete('/:id', async (req, res) => {
  // Delete the customer by id
  Customers.findByIdAndDelete(req.params.id)
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



export default customersRouter;