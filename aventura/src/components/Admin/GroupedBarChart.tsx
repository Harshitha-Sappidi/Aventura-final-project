import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Package } from '../../models/package';
import { Typography, Box } from '@mui/material';

interface GroupedBarChartProps {
  packages: Package[];
}

interface ChartData {
  feature: string;
  [key: string]: number | string; // Keys for package titles
}

const GroupedBarChart: React.FC<GroupedBarChartProps> = ({ packages }) => {
  // Prepare data for the chart
  const features = ['duration', 'physicality', 'ratings'];
  
  // Function to process and clean physicality data
  const processValue = (value: any) => {
    if (typeof value === 'string') {
      // Handle physicality specific format
      if (value.includes('/')) {
        const cleanedValue = value.split('/')[0]; // Extract number before '/'
        return parseFloat(cleanedValue); // Convert to number
      }
      return parseFloat(value); // Convert to number if possible
    } else if (typeof value === 'number') {
      return value; // Return number as is
    }
    return 0; // Default value for other types
  };

  const chartData: ChartData[] = features.map((feature) => {
    const data: ChartData = { feature };
    packages.forEach(pkg => {
      const value = pkg[feature as keyof Package];
      
      // Process value with additional type checking
      data[pkg.title] = processValue(value);
    });
    return data;
  });

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="feature" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          {packages.map(pkg => (
            <Bar
              key={pkg.title}
              dataKey={pkg.title}
              fill={getRandomColor()} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Package Feature Analysis
      </Typography>
    </Box>
  );
};

// Helper function to generate random colors for bars
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default GroupedBarChart;
