import mongoose from 'mongoose';
import mongodbURI from '../secrets.js';
import fs from 'fs';

// Get generators
import getMockCategories from './collections/generate-categories.js';
import getMockCustomers from './collections/generate-customers.js';
import getMockCarts from './collections/generate-carts.js';
import getMockOrders from './collections/generate-orders.js';
import getMockProducts from './collections/generate-products.js';

const ArgJson = 'json';
const ArgDb = 'db';
const jsonFolder = './mockdata/json';


async function run() {
  mongoose.connect(mongodbURI, { dbName: 'OnlineShopping' });
  const args = process.argv.slice(2); // Get the arguments

  const targetSave = args[0];

  if (targetSave === ArgJson) {
    console.log('Generating JSON files to ' + jsonFolder);
  } else if (targetSave === ArgDb) {
    console.log('Generating data in the database');
  } else {
    console.log(`Invalid argument. Use ${ArgJson} or ${ArgDb}`);
    process.exit(1);
  }

  await generateCategories(targetSave);
  await generateProducts(targetSave);
  await generateCustomers(targetSave);
  await generateCarts(targetSave);
  await generateOrders(targetSave);

  process.exit(0);
}


import { Categories } from '../routes/categories.js';
let categories = [];

async function generateCategories(targetSave) {
  // Generate categories
  const mockCategories = getMockCategories();

  // Save the categories
  if (targetSave === ArgJson) {
    // Save to json
    fs.writeFileSync(jsonFolder + '/categories.json', JSON.stringify(mockCategories, null, 2));
    categories = mockCategories;
  } else if (targetSave === ArgDb) {
    // Delete all categories
    await Categories.deleteMany();
    // Save to database
    categories = await Categories.insertMany(mockCategories);
  }
  console.log(categories.length + ' categories generated');
}


import { Products } from '../routes/products.js';
let products = [];

async function generateProducts(targetSave) {
  // Generate products
  const mockProducts = getMockProducts(categories);

  // Save the products
  if (targetSave === ArgJson) {
    // Save to json
    fs.writeFileSync(jsonFolder + '/products.json', JSON.stringify(mockProducts, null, 2));
    products = mockProducts;
  } else if (targetSave === ArgDb) {
    // Delete all products
    await Products.deleteMany();
    // Save to database
    products = await Products.insertMany(mockProducts);
  }
  console.log(products.length + ' products generated');
}


import { Customers } from '../routes/customers.js';
let customers = [];

async function generateCustomers(targetSave) {
  // Generate customers
  const mockCustomers = getMockCustomers();

  // Save the customers
  if (targetSave === ArgJson) {
    // Save to json
    fs.writeFileSync(jsonFolder + '/customers.json', JSON.stringify(mockCustomers, null, 2));
    customers = mockCustomers;
  } else if (targetSave === ArgDb) {
    // Delete all customers
    await Customers.deleteMany();
    // Save to database
    customers = await Customers.insertMany(mockCustomers);
  }
  console.log(customers.length + ' customers generated');
}


import { Carts } from '../routes/carts.js';

async function generateCarts(targetSave) {
  // Generate carts
  const mockCarts = getMockCarts(products, customers);

  // Save the carts
  if (targetSave === ArgJson) {
    // Save to json
    fs.writeFileSync(jsonFolder + '/carts.json', JSON.stringify(mockCarts, null, 2));
  } else if (targetSave === ArgDb) {
    // Delete all carts
    await Carts.deleteMany();
    // Save to database
    await Carts.insertMany(mockCarts);
  }
  console.log(mockCarts.length + ' carts generated');
}


import { Orders } from '../routes/orders.js';

async function generateOrders(targetSave) {


  // Generate orders
  const mockOrders = getMockOrders(products, customers);

  // Save the orders
  if (targetSave === ArgJson) {
    // Save to json
    fs.writeFileSync(jsonFolder + '/orders.json', JSON.stringify(mockOrders, null, 2));
  } else if (targetSave === ArgDb) {
    // Delete all orders
    await Orders.deleteMany();
    // Save to database
    await Orders.insertMany(mockOrders);
  }
  console.log(mockOrders.length + ' orders generated');
}





run();
