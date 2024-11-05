import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Package } from '../../models/package';
import { Typography, Box } from '@mui/material';

interface PopularityChartProps {
  packages: Package[];
}

interface ChartData {
  title: string;
  popularity: number;
  reviewCount: number; 
}

const PopularityChart: React.FC<PopularityChartProps> = ({ packages }) => {
  // Define a function to calculate popularity score
  const calculatePopularity = (rating: number, reviewCount: number): number => {
    return rating * reviewCount; // Simple multiplication of rating and review count
  };

  // Prepare data for the chart
  const chartData: ChartData[] = packages.map((pkg) => ({
    title: pkg.title,
    popularity: calculatePopularity(pkg.ratings, pkg.reviewItems.length),
    reviewCount: pkg.reviewItems.length
  }));

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          layout="vertical" 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          barCategoryGap="5%" 
        >
          <XAxis type="number" />
          <YAxis dataKey="title" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="popularity" stackId="a" fill="#123abc" barSize={30} />
          <Bar dataKey="reviewCount" stackId="a" fill="#82ca9d" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Most Popular Packages
      </Typography>
    </Box>
  );
};

export default PopularityChart;
