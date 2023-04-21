import { faker } from "@faker-js/faker";

// Return an array of generated customers
function getMockCustomers() {
  const customers = [];

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

  return customers;
}

export default getMockCustomers;