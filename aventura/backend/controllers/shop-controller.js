import * as productService from '../services/shop-service.js';
import { setResponse, setError } from './response-handler.js';

// Method to get all products
export const find = async (request, response) => {
  try {
    const products = await productService.getAllProducts();
    setResponse(products, response, 200);
  } catch (err) {
    console.log(err);
    setError(err, response);
  }
};




// Method to get products by params
export const getByParams = async (request, response) => {
  try {
    const params = request.query;
    const products = await productService.getProductsByParams(params);
    setResponse(products, response, 200);
  } catch (err) {
    console.log(err);
    setError(err, response);
  }
};

// Method to create a product
export const post = async (request, response) => {
  try {
    const newProduct = request.body;
    const product = await productService.saveProduct(newProduct);
    setResponse(product, response, 201); // 201 Created
  } catch (err) {
    if (err.name === 'ValidationError') {
      response.status(400).json({ error: `${err.message}` });
    } else {
      console.log(err);
      setError(err, response);
    }
  }
};

// Method to get product by id
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const product = await productService.findProductById(id);
    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }
    setResponse(product, response, 200);
  } catch (err) {
    if (err.name === 'CastError') {
      response.status(400).json({ error: 'Invalid product ID format' });
    } else {
      console.log(err);
      setError(err, response);
    }
  }
};

// Method to update product by id
export const put = async (request, response) => {
  try {
    const id = request.params.id;
    const updatedProduct = request.body;
    const product = await productService.updateProductById(updatedProduct, id);
    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }
    setResponse(product, response, 200);
  } catch (err) {
    if (err.name === 'CastError') {
      response.status(400).json({ error: 'Invalid product ID format' });
    } else {
      console.log(err);
      setError(err, response);
    }
  }
};

// Method to delete product by id
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const result = await productService.remove(id);
    if (!result) {
      return response.status(404).json({ error: 'Product not found' });
    }
    response.status(204).end(); // No content
  } catch (err) {
    if (err.name === 'CastError') {
      response.status(400).json({ error: 'Invalid product ID format' });
    } else {
      console.log(err);
      setError(err, response);
    }
  }
};
