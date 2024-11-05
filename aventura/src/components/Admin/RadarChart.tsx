import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Product } from '../../models/shop';
import { Typography, Box } from '@mui/material';

interface RadarChartProps {
  products: Product[];
}

const RadarChartComponent: React.FC<RadarChartProps> = ({ products }) => {
  // Prepare data for the radar chart by aggregating relevant features
  const radarData = products.map(product => ({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    category: product.category,
    reviewCount: product.reviewItems.length, // Assuming reviewItems is an array of reviews
  }));

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar name="Price" dataKey="price" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Quantity" dataKey="quantity" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Radar name="Reviews" dataKey="reviewCount" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Product Feature Analysis
      </Typography>
    </Box>
  );
};

export default RadarChartComponent;
