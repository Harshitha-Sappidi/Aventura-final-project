import axios from 'axios';
import { Product } from '../models/shop';

const API_URL = 'http://localhost:3000/shops/';

const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Ensure this returns an array
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

 export const getProductById = async (id: string): Promise<Product> => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  };

  const addReview = async (productId: string, review: any) => {
    const response = await axios.put(`${API_URL}${productId}`, review);
    return response.data;
  };

 

const getProductsByCategory = async (categoryName: string): Promise<Product[]> => {
  try {
    const response = await fetch(`/api/products?category=${categoryName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};


  


const productService = {
  getProducts,
  getProductById,
  addReview,
  getProductsByCategory
  
 
};

export default productService;
