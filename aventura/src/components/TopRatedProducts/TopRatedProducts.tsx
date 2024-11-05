import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import productService from '../../services/shop-service';
import { Product } from '../../models/shop';
import './TopRatedProducts.scss';

interface TopRatedProductsProps {
  page: string;
}

const TopRatedProducts = ({ page }: TopRatedProductsProps) => {
  const { t } = useTranslation();
  const [topRatedProducts, setTopRatedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const products = await productService.getProducts();
        const topRated = products.filter(product => calculateAverageRating(product.reviewItems) === 5);
        setTopRatedProducts(topRated);
      } catch (error) {
        console.error('Failed to fetch top-rated products:', error);
      }
    };

    fetchTopRatedProducts();
  }, []);

  const calculateAverageRating = (reviews: { rating: number }[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const getPageSpecificClass = () => {
    if (page === 'detailView') {
      return 'detail-view';
    }
    return '';
  };

  return (
    <Card className={`top-rated-products ${getPageSpecificClass()}`}>
      <CardContent>
        <Typography variant="h6" className="title">
          {t('top_rated_products')}
        </Typography>
        <div className="transparentLine"></div>
        <div className="product-list">
          {topRatedProducts.map(product => (
            <div key={product._id} className="product-item" onClick={() => handleProductClick(product._id)}>
              <img src={`/${product.image}`} alt={product.name} className="product-image" />
              <div className="product-info">
                <Typography variant="body1" className="product-name">{product.name}</Typography>
                <Typography variant="body2" className="product-price">${product.price}</Typography>
                <div className="product-rating">{"★".repeat(5)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopRatedProducts;
