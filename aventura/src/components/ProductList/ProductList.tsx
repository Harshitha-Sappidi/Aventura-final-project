import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../ProductCard/ProductCard';
import productService from '../../services/shop-service';
import { Product } from '../../models/shop';
import { calculateAverageRating } from '../ProductTab/ProductTab';
import './ProductList.scss'; 

interface ProductListProps {
  sortingOption: string;
  priceRange: number[];
  selectedCategory: string;
}

const ProductList = ({ sortingOption, priceRange, selectedCategory }: ProductListProps) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await productService.getProducts();
      setProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const sortProducts = (products: Product[], option: string) => {
    switch (option) {
      case 'averageRating':
        return [...products].sort((a, b) => calculateAverageRating(b.reviewItems) - calculateAverageRating(a.reviewItems));
      case 'latest':
        return [...products].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
      case 'priceLowToHigh':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceHighToLow':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filterProductsByPrice = (products: Product[], range: number[]) => {
    return products.filter(product => product.price >= range[0] && product.price <= range[1]);
  };

  const filterProductsByCategory = (products: Product[], category: string) => {
    if (category === 'All') {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory1 = queryParams.get('category') || 'All';

  // Apply filters independently
  let filteredProducts = products;

  if (selectedCategory1 !== 'All') {
    filteredProducts = filterProductsByCategory(filteredProducts, selectedCategory1);
  }

  if (priceRange.length === 2) {
    filteredProducts = filterProductsByPrice(filteredProducts, priceRange);
  }

  // Sort the final filtered products
  const sortedProducts = sortProducts(filteredProducts, sortingOption);

  if (loading) {
    return <Typography>{t('loading')}</Typography>;
  }

  if (sortedProducts.length === 0) {
    return <Typography>{t('no_products_available')}</Typography>;
  }

  return (
    <>
      <Typography variant="h6" gutterBottom style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        {t('showing_all')} {sortedProducts.length} {t('results')}
      </Typography>
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <div key={product._id} className="product-card-container">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
