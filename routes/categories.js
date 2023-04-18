import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { getErrorMessage, getNotFoundMessage } from '../errors/error-messages.js';


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
      const errorMessage = getErrorMessage(err);
      res.status(errorMessage.status).send({ message: errorMessage.message });
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
      const errorMessage = getErrorMessage(err);
      res.status(errorMessage.status).send({ message: errorMessage.message });
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
        const errorMessage = getNotFoundMessage();
        res.status(errorMessage.status).send({ message: errorMessage.message });
      }
    })
    .catch((err) => {
      // Get failed. Get the status code and send the error message
      const errorMessage = getErrorMessage(err);
      res.status(errorMessage.status).send({ message: errorMessage.message });
    });
});

// Update a category by id
categoriesRouter.put('/:id', async (req, res) => {
  // Update the category by id
  Categories.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      // Update successful
      if (result) {
        res.send(result);
      } else {
        // Not found
        const errorMessage = getNotFoundMessage();
        res.status(errorMessage.status).send({ message: errorMessage.message });
      }
    })
    .catch((err) => {
      // Update failed. Get the status code and send the error message
      const errorMessage = getErrorMessage(err);
      res.status(errorMessage.status).send({ message: errorMessage.message });
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
        const errorMessage = getNotFoundMessage();
        res.status(errorMessage.status).send({ message: errorMessage.message });
      }
    })
    .catch((err) => {
      // Delete failed. Get the status code and send the error message
      const errorMessage = getErrorMessage(err);
      res.status(errorMessage.status).send({ message: errorMessage.message });
    });
});






export default categoriesRouter;