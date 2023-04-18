export function notFoundResponse() {
  return { message: 'Not found', status: 404 };
}


export function errorResponse(error) {

  console.log('errorResponse() called\n', error, '\n');
  console.log('Error JSON\n', JSON.stringify(error, null, 2), '\n');

  if (error.name === 'ValidationError') {
    return { message: error.message, status: 400 }
  }

  // Duplicate key error
  if (error.code === 11000) {
    return { message: error.message, status: 409 }
  }
  return { message: error.message, status: 500 }
}