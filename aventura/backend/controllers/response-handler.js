 
// // Set a successful response with status 200 and JSON data
export const setResponse = (data, response) => {
      response.status(200).json(data);     
}

// // Set an error response with status 500 and JSON error message
export const setError = (error, response) => {
  console.log(error); // Log the error to console for debugging
  response.status(500).json({
      code: "InternalServerError",
      message: "Error occurred while processing the request."
  });
}
  