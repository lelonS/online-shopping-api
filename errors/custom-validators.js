
function validateEmail(email) {
  // Simple email validation regex [numbers and letters][one @][numbers and letters][one .][numbers and letters]
  // valid email: example@example.com
  // invalid email: example@example
  // invalid email: example.ex@example.com
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  return emailRegex.test(email);
}

export const emailValidator = { func: validateEmail, message: 'Invalid email address' }
