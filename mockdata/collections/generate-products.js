import { faker } from "@faker-js/faker";


// Return an array of generated products
function getMockProducts(categories) {
  const products = [];

  // Generate 50 products
  for (let i = 0; i < 50; i++) {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(0, 1000, 0),
      category: categories[Math.floor(Math.random() * categories.length)]
    };

    // Check if the product already exists (infinite loop risk)
    const existingProduct = products.find(p => p.name === product.name);
    if (!existingProduct) {
      products.push(product);
    } else {
      i--;
    }
  }

  return products;
}

export default getMockProducts;
