import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReviewForm from '../ReviewFormComponent/ReviewForm';
import { Product } from '../../models/shop';
import productService from '../../services/shop-service';
import './ProductTab.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ProductTabsProps {
  product: Product;
  onReviewSubmit: (updatedProduct: Product) => void;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

export const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <>
      {"★".repeat(fullStars)}
      {halfStar === 1 && "☆"}
      {"☆".repeat(emptyStars)}
    </>
  );
};

const ProductTabs = ({ product, onReviewSubmit }: ProductTabsProps) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleReviewSubmit = async (newReview: any) => {
    try {
      // Add the new review to the product's reviewItems array
      const updatedProductPayload = {
        ...updatedProduct,
        reviewItems: [...updatedProduct.reviewItems, newReview],
      };

      // Send the updated product payload to the backend
      const updatedProductData = await productService.addReview(product._id, updatedProductPayload);
      setUpdatedProduct(updatedProductData);
      onReviewSubmit(updatedProductData); // Notify the parent component
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  const averageRating = calculateAverageRating(updatedProduct.reviewItems);

  return (
    <div className="shop-product-tabs-container">
      <Tabs value={value} onChange={handleChange} aria-label="product tabs" centered>
        <Tab label={t('description')} {...a11yProps(0)} />
        <Tab label={t('additional_information')} {...a11yProps(1)} />
        <Tab label={`${t('reviews')} (${updatedProduct.reviewItems.length})`} {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="body1">{updatedProduct.additionalDescription}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box mb={2}>
          <Typography variant="body1" className="shop-metaTitle">{t('specifications')}</Typography>
          <Typography variant="body1" className="shop-divider" style={{ borderBottom: '1px solid transparent' }}>{updatedProduct.specifications}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" className="shop-metaTitle">{t('materials')}</Typography>
          <Typography variant="body1" className="shop-divider" style={{ borderBottom: '1px solid transparent' }}>{updatedProduct.materials}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="body1" className="shop-metaTitle">{t('dimensions')}</Typography>
          <Typography variant="body1" className="shop-divider" style={{ borderBottom: '1px solid transparent' }}>{updatedProduct.dimensions}</Typography>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <span className="stars">{renderStars(averageRating)}</span>
          {averageRating.toFixed(2)} {t('based_on')} {updatedProduct.reviewItems.length} {t('reviews')}
        </Typography>
        <div className="reviewContainer">
          {updatedProduct.reviewItems.length > 0 ? (
            updatedProduct.reviewItems.map((review, index) => (
              <div key={index} className="reviewItem">
                <Avatar src={'/'+ review.userPicture} alt={review.userName} className="avatar" />
                <div className="reviewText">
                  <Typography variant="subtitle2">{review.userName}</Typography>
                  <Typography variant="body2" style={{ color: 'gold' }}>{renderStars(review.rating)}</Typography>
                  <Typography variant="body2">{review.review}</Typography>
                  <Typography variant="body2" style={{ color: 'gray' }}>{new Date(review.reviewGivenDate).toLocaleDateString()}</Typography>
                </div>
              </div>
            ))
          ) : (
            <Typography>{t('no_reviews_yet')}</Typography>
          )}
        </div>
        <ReviewForm productId={product._id} onReviewSubmit={handleReviewSubmit} />
      </TabPanel>
    </div>
  );
};

export default ProductTabs;
