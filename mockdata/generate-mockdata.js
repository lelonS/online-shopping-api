import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import mongodbURI from '../secrets.js';

async function run() {
  mongoose.connect(mongodbURI, { dbName: 'OnlineShopping' });

  await generateCategories();
  await generateProducts();
  await generateCustomers();
  await generateCarts();
  await generateOrders();

  process.exit(0);
}

run();

import { Categories } from '../routes/categories.js';
let categories = [];

async function generateCategories() {
  // Delete all categories
  await Categories.deleteMany();

  // Generate 10 categories
  for (let i = 0; i < 10; i++) {
    const category = {
      name: faker.commerce.department()
    };

    // Check if the category already exists
    const existingCategory = categories.find(c => c.name === category.name);
    if (!existingCategory) {
      categories.push(category);
    } else {
      i--;
    }
  }

  // Save the categories
  categories = await Categories.insertMany(categories);
  console.log(categories.length + ' categories generated');
}


import { Products } from '../routes/products.js';
let products = [];

async function generateProducts() {
  // Delete all products
  await Products.deleteMany();

  // Generate 100 products
  for (let i = 0; i < 100; i++) {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(0, 1000, 0),
      category: categories[Math.floor(Math.random() * categories.length)]._id
    };

    // Check if the product already exists
    const existingProduct = products.find(p => p.name === product.name);
    if (!existingProduct) {
      products.push(product);
    } else {
      i--;
    }
  }

  // Save the products
  products = await Products.insertMany(products);
  console.log(products.length + ' products generated');
}


import { Customers } from '../routes/customers.js';
let customers = [];

async function generateCustomers() {
  // Delete all customers
  await Customers.deleteMany();

  // Generate 10 customers
  for (let i = 0; i < 10; i++) {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const customer = {
      fullName: firstName + ' ' + lastName,
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password()
    };

    // Check if the customer already exists
    const existingCustomer = customers.find(c => c.email === customer.email);
    if (!existingCustomer) {
      customers.push(customer);
    } else {
      i--;
    }
  }

  // Save the customers
  customers = await Customers.insertMany(customers);
  console.log(customers.length + ' customers generated');
}


import { Carts } from '../routes/carts.js';

async function generateCarts() {
  // Delete all carts
  await Carts.deleteMany();


  let carts = [];
  // Generate 10 carts
  for (let i = 0; i < 10; i++) {
    const customerID = customers[i]._id;

    const cart = {
      customer: customerID,
      products: []
    };

    // Add 1 to 5 products to the cart
    const numberOfProducts = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numberOfProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      cart.products.push({
        product: product._id,
        quantity: quantity
      });
    }

    carts.push(cart);
  }

  // Save the carts
  await Carts.insertMany(carts);
  console.log(carts.length + ' carts generated');
}


import { Orders } from '../routes/orders.js';

async function generateOrders() {
  // Delete all orders
  await Orders.deleteMany();

  let orders = [];
  // Generate 10 orders
  for (let i = 0; i < 10; i++) {
    const customerID = customers[i]._id;

    const order = {
      customer: customerID,
      shippingAddress: faker.address.streetAddress(),
      products: []
    };

    // Add 1 to 5 products to the order
    const numberOfProducts = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numberOfProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      order.products.push({
        product: product._id,
        quantity: quantity
      });
    }

    orders.push(order);
  }

  // Save the orders
  await Orders.insertMany(orders);
  console.log(orders.length + ' orders generated');
}






