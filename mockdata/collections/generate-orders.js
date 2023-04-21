import { faker } from "@faker-js/faker";

// Return an array of generated orders
function getMockOrders(products, customers) {

  let orders = [];
  // Generate 10 orders
  for (let i = 0; i < 10; i++) {


    const order = {
      customer: customers[i],
      shippingAddress: faker.address.streetAddress(),
      products: []
    };

    // Add 1 to 5 products to the order
    const numberOfProducts = Math.floor(Math.random() * 5) + 1;
    const allProducts = faker.helpers.uniqueArray(products, numberOfProducts);

    for (const prod of allProducts) {
      const entry = {
        product: prod,
        quantity: Math.floor(Math.random() * 5) + 1
      };
      order.products.push(entry);
    }

    orders.push(order);
  }

  return orders;
}

export default getMockOrders;