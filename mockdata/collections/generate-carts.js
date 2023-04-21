import { faker } from "@faker-js/faker";
// Return an array of generated carts

function getMockCarts(products, customers) {
  const carts = [];

  // Generate a cart for each customer
  for (let i = 0; i < customers.length; i++) {

    const cart = {
      customer: customers[i],
      products: []
    };

    const numberOfProducts = Math.floor(Math.random() * 5) + 1;
    const allProducts = faker.helpers.uniqueArray(products, numberOfProducts);

    for (const prod of allProducts) {
      const entry = {
        product: prod,
        quantity: Math.floor(Math.random() * 5) + 1
      };
      cart.products.push(entry);
    }

    carts.push(cart);
  }
  return carts;
}

export default getMockCarts;