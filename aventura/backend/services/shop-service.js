import Product from '../models/shop.js';

// Get products by providing params
export const searchProducts = async (params = {}) => {
    const products = await Product.find(params).exec();
    return products;
}

// Get all products
export const getAllProducts = async () => {
    return Product.find().exec();
}

// Get products by providing params
export const getProductsByParams = async (params = {}) => {
    const products = await Product.find(params).exec();
    return products;
}

// Save product to database
export const saveProduct = async (newProduct) => {
    const product = new Product(newProduct);
    return product.save();
}

// Get product by id
export const findProductById = async (id) => {
    const product = await Product.findById(id).exec();
    return product;
}

// Update product by id
export const updateProductById = async (updatedProduct, id) => {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true }).exec();
    return product;
}


// Delete product by id
export const remove = async (id) => {
    return await Product.findByIdAndDelete(id).exec()
}



export const fetchProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};



  
  