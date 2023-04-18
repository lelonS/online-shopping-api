export function getNotFoundMessage() {
  return { message: 'Not found', status: 404 };
}


export function getErrorMessage(error) {
  if (error.name === 'ValidationError') {
    return { message: error.message, status: 400 }
  }

  // Duplicate key error
  if (error.code === 11000) {
    return { message: error.message, status: 409 }
  }
  return { message: error.message, status: 500 }
}