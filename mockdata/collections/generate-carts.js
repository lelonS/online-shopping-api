
// Return an array of generated carts

function getMockCarts(products, customers) {
  const carts = [];

  // Generate 10 carts
  for (let i = 0; i < 10; i++) {
    let cartCustomer = customers[i]._id;

    if (!cartCustomer) {
      cartCustomer = customers[i];
    }

    const cart = {
      customer: cartCustomer,
      products: []
    };

    // Add 1 to 5 products to the cart
    const numberOfProducts = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < numberOfProducts; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;

      if (product._id) {
        cart.products.push({
          product: product._id,
          quantity: quantity
        });
      } else {
        cart.products.push({
          product: product,
          quantity: quantity
        });
      }
    }
    carts.push(cart);
  }
  return carts;
}

export default getMockCarts;