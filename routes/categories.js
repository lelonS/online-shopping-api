import Router from 'express';
import mongoose, { Schema } from 'mongoose';
import { errorResponse, notFoundResponse } from '../utils/error-messages.js';
import { getSearchTerms } from '../utils/search-terms.js';


const categoriesRouter = Router();

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true }
});

export const Categories = mongoose.model('Categories', categorySchema);


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

  // Get all categories
  Categories.find(await getSearchTerms(req.query, categorySchema))
    .limit(pageSize)
    .skip(pageSize * (pageNr - 1))
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