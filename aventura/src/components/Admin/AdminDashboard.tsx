import React, { useState, useEffect } from 'react';
import { Package } from '../../models/package'; 
import { Product } from '../../models/shop';
import { fetchPackages } from '../../services/package-service'; 
import productService from '../../services/shop-service';
import PackageBookingChart from './PackageBookingChart';
import PopularityChart from './PopularityChart';
import { Box, Grid } from '@mui/material';
import GroupedBarChart from './GroupedBarChart';
import RadarChartComponent from './RadarChart';

const AdminDashboard: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPackagesAndProducts = async () => {
      try {
        const fetchedPackages = await fetchPackages();
        setPackages(fetchedPackages);

        const fetchedProducts = await productService.getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    loadPackagesAndProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box 
            boxShadow={3} 
            padding={2} 
            borderRadius={2} 
            maxWidth="95%" 
            margin="auto"
            sx={{ mb: 4 }} 
          >
            <PackageBookingChart packages={packages} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box 
            boxShadow={3} 
            padding={2} 
            borderRadius={2} 
            maxWidth="95%" 
            margin="auto"
            sx={{ mb: 4 }} 
          >
            <PopularityChart packages={packages} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box 
            boxShadow={3} 
            padding={2} 
            borderRadius={2} 
            maxWidth="95%" 
            margin="auto"
            sx={{ mb: 4 }} 
          >
            <GroupedBarChart packages={packages} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box 
            boxShadow={3} 
            padding={2} 
            borderRadius={2} 
            maxWidth="95%" 
            margin="auto"
          >
            <RadarChartComponent products={products} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
