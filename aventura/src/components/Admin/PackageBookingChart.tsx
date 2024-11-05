import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Package } from '../../models/package';
import { Box, Typography } from '@mui/material';

interface PackageBookingChartProps {
  packages: Package[];
}

interface ChartData {
  title: string;
  bookingCount: number;
}

const PackageBookingChart: React.FC<PackageBookingChartProps> = ({ packages }) => {
  // Prepare data for the chart
  const chartData: ChartData[] = packages.map((pkg) => ({
    title: pkg.title,
    bookingCount: pkg.bookingCount,
  }));

  // Define colors for the pie chart slices
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ff69b4'];

  return (
    <Box>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Tooltip />
        <Pie
          data={chartData}
          dataKey="bookingCount"
          nameKey="title"
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={150} 
          fill="#8884d8"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <Typography variant="h6" align="center" sx={{ mt: 2 }}>
    Booking Overview
  </Typography>
</Box>
  );
};

export default PackageBookingChart;
