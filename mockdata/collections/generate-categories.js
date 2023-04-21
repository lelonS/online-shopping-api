import { faker } from '@faker-js/faker';


// Return an array of generated categories
function getMockCategories() {
  const categories = [];
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
  return categories;
}

export default getMockCategories;