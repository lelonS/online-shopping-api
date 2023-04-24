
function validateEmail(email) {
  // Simple email validation regex
  const emailRegex = /^[\w-\.]+@([\w-]+\.?)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

export const emailValidator = { func: validateEmail, message: 'Invalid email address' }

function notEmptyArray(array) {
  return array.length > 0;
}

export const notEmptyArrayValidator = { func: notEmptyArray, message: 'Array must have atleast one element' }