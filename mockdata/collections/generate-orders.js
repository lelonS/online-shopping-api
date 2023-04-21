import { faker } from "@faker-js/faker";

// Return an array of generated orders
function getMockOrders(products, customers) {

  let orders = [];
  // Generate 10 orders
  for (let i = 0; i < 10; i++) {
    let orderCustomer = customers[i]._id;

    if (!orderCustomer) {
      orderCustomer = customers[i];
    }

    const order = {
      customer: orderCustomer,
      shippingAddress: faker.address.streetAddress(),
      products: []
    };

    // Add 1 to 5 products to the order
    const numberOfProducts = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numberOfProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      if (product._id) {
        order.products.push({
          product: product._id,
          quantity: quantity
        });
      } else {
        order.products.push({
          product: product,
          quantity: quantity
        });
      }
    }

    orders.push(order);
  }

  return orders;
}

export default getMockOrders;