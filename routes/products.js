import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../errors/error-messages.js';


const productsRouter = Router();

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Categories' }
});

const Products = mongoose.model('Products', productSchema);


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
  // Get all products
  Products.find()
    .populate('category')
    .then((result) => {
      // Get successful
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