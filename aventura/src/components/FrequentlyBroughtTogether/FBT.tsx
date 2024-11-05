import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { Product } from '../../models/shop';
import productService from '../../services/shop-service';
import { useNavigate } from 'react-router-dom';

interface FrequentlyBoughtTogetherProps {
  category: string;
  currentProductId: string;
}

const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const frequentlyBoughtTogetherMapping: { [key: string]: string[] } = {
    "Lighting": ["Camping Gear", "Batteries"],
    "Camping Gear": ["Lighting", "Sleeping Bags", "Tents"],
    "Footwear": ["Socks", "Gaiters", "Hiking Gear"],
    // Add more categories and their related products or categories
  };

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      console.log(`Fetching related products for category: ${category}`);

      const relatedCategories = frequentlyBoughtTogetherMapping[category];
      
      if (!relatedCategories) {
        console.warn(`No related categories found for category: ${category}`);
        return;
      }

      console.log('Related categories:', relatedCategories);

      const relatedProducts: Product[] = [];

      for (const relatedCategory of relatedCategories) {
        try {
          const products = await productService.getProductsByCategory(relatedCategory);
          console.log(`Products found for category ${relatedCategory}:`, products);
          relatedProducts.push(...products.filter(product => product._id !== currentProductId));
        } catch (error) {
          console.error(`Failed to fetch products for category: ${relatedCategory}`, error);
        }
      }

      console.log('Final related products:', relatedProducts);
      setRelatedProducts(relatedProducts.slice(0, 4)); // Show only the first 4 related products
    };

    fetchRelatedProducts();
  }, [category, currentProductId]);

  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (relatedProducts.length === 0) {
    return <Typography>No related products found</Typography>;
  }

  return (
    <Box className="frequently-bought-together" mt={4}>
      <Typography variant="h6" gutterBottom>
        Frequently Bought Together
      </Typography>
      <Grid container spacing={2}>
        {relatedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.image}
                title={product.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Button size="small" onClick={() => handleViewProduct(product._id)}>
                  View Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FrequentlyBoughtTogether;
