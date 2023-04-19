import express from 'express';
import mongoose from 'mongoose';
import mongoURI from './secrets.js';

const api = express();
api.use(express.json());


api.listen(3000, () => {
  console.log('Server listening on http://localhost:3000/');
  mongoose.connect(mongoURI, { dbName: 'OnlineShopping' });
});

// Routes
import categoriesRouter from './routes/categories.js';
api.use('/api/categories', categoriesRouter);

import productsRouter from './routes/products.js';
api.use('/api/products', productsRouter);

import customersRouter from './routes/customers.js';
api.use('/api/customers', customersRouter);

import ordersRouter from './routes/orders.js';
api.use('/api/orders', ordersRouter);

import cartsRouter from './routes/carts.js';
api.use('/api/carts', cartsRouter);
