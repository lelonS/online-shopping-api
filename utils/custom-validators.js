
function validateEmail(email) {
  // Simple email validation regex
  const emailRegex = /^[\w-\.]+@([\w-]+\.?)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

export const emailValidator = { func: validateEmail, message: 'Invalid email address' }
