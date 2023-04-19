import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../errors/error-messages.js';


const categoriesRouter = Router();

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Categories = mongoose.model('Categories', categorySchema);


// Post a new category
categoriesRouter.post('/', async (req, res) => {
  // Create a new category
  const category = new Categories(req.body);

  // Save the category
  category.save()
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

// Get all categories
categoriesRouter.get('/', async (req, res) => {
  // Get all categories
  Categories.find()
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

// Get a category by id
categoriesRouter.get('/:id', async (req, res) => {
  // Get the category by id
  Categories.findById(req.params.id)
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

// Update a category by id
categoriesRouter.put('/:id', async (req, res) => {
  // Update the category by id
  Categories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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

// Delete a category by id
categoriesRouter.delete('/:id', async (req, res) => {
  // Delete the category by id
  Categories.findByIdAndDelete(req.params.id)
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






export default categoriesRouter;