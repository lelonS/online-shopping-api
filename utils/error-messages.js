import fs from 'fs';

export function notFoundResponse() {
  return { response: { message: 'Not found' }, status: 404 };
}


export function errorResponse(error) {

  // Log the error to the console
  console.log('errorResponse() called\n', error, '\n');
  console.log('Error JSON\n', JSON.stringify(error, null, 2), '\n');

  // Append the error to the error log
  fs.appendFileSync('./utils/error.log', JSON.stringify(error, null, 2) + '\n');


  // Validation error
  if (error.name === 'ValidationError') {
    return { response: { message: error.message }, status: 400 }
  }

  // Duplicate key error
  if (error.code === 11000) {
    return { response: { message: error.message }, status: 409 }
  }
  return { response: { message: error.message }, status: 500 }
}