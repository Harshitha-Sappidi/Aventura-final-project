import express from 'express';
import * as productController from '../controllers/shop-controller.js';

const productRouter = express.Router();

// General path to get all products and create a new product
productRouter.route('/')
    .get(productController.find)
    .post(productController.post);

// Specific path to get products using query params
productRouter.route('/params')
    .get(productController.getByParams);




// Specific path to get, update, and delete product by ID
productRouter.route('/:id')
    .get(productController.get)
    .put(productController.put)
    .delete(productController.remove);

export default productRouter;
