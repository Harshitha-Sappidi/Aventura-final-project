
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, Container, Typography } from '@mui/material';
import productService from '../../services/shop-service';
import { Product } from '../../models/shop';
import ProductDetail from '../../components/ProductDetails/ProductDetails';
import Cart from '../../components/CartComponent/CartComponent';
import ProductTabs, { calculateAverageRating } from '../../components/ProductTab/ProductTab';
import TopRatedProducts from '../../components/TopRatedProducts/TopRatedProducts';
import ProductCategories from '../../components/ProductCategory/ProductCategory';
import ProductDetailHeader from '../../components/ProductDetailHeader/ProductDetailHeader';
import './productDetailView.scss';

import HeroSection from '../../components/HeroSection/HeroSection';
import Navigation from '../../components/Navbar/Navigation';
import backgroundImage from '../../assets/canada.jpg';
import Footer from '../../components/Footer/Footer';




function ProductDetailView() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const navigate = useNavigate();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    navigate(`/products?category=${category}`);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (productId) {
          const product = await productService.getProductById(productId);
          setProduct(product);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleReviewSubmit = (updatedProduct: Product) => {
    setProduct(updatedProduct);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  const averageRating = calculateAverageRating(product.reviewItems);

  return (
    <>
    <Navigation/>
    <HeroSection 
          searchTerm={''} 
          setSearchTerm={(String)} 
          showSearch={false} 
          imageUrl={backgroundImage} 
          title={"shop"}
      />

      <ProductDetailHeader category={product.category} productName={product.name} />
      <Container className="product-detail-container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Box className="main-content">
              <ProductDetail product={product} averageRating={averageRating} />
              <ProductTabs product={product} onReviewSubmit={handleReviewSubmit} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Box className="sidebar">
              <Box mb={3}>
                <Cart />
              </Box>
              <Box mb={3}>
                <TopRatedProducts page="detailView" />
              </Box>
              <Box mb={3}>
                <ProductCategories selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} />
              </Box>
  
             
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer/>

    </>
  );
}

export default ProductDetailView;
