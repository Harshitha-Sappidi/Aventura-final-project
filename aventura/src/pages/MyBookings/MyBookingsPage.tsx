
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { fetchOrdersByUserId } from '../../services/order-service';
import { Order, OrderItem } from '../../models/order';
import { getProductById } from '../../services/shop-service';  // Assuming you have a service to fetch product details
import { fetchPackageById } from '../../services/package-service';  // Assuming you have a service to fetch package details

export const MyBookingsPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userDataString = localStorage.getItem('user');
  const user = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    if (!user || !user.user._id) {
      setError('User not found');
      setLoading(false);
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const userOrders = await fetchOrdersByUserId(user.user._id);

        // Fetch product/package details for each item in the orders
        const detailedOrders = await Promise.all(
          userOrders.map(async (order) => {
            const itemsWithDetails = await Promise.all(
              order.items.map(async (item) => {
                const productId = item.productId ?? '';  // Use empty string as fallback
                if (item.type === 'essentials') {
                  const product = await getProductById(productId);
                  return { ...item, productDetails: product };
                } else if (item.type === 'package') {
                  const pkg = await fetchPackageById(productId);
                  return { ...item, packageDetails: pkg };
                }
                return item;
              })
            );
            return { ...order, items: itemsWithDetails };
          })
        );

        setOrders(detailedOrders);
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [user.user._id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  const renderOrderItems = (items: OrderItem[], category: string) => (
    <>
      <Typography variant="h5" gutterBottom>{category}</Typography>
      {items.map((item) => {
        const product = item.type !== 'package' ? item.productDetails : undefined;
        const pkg = item.type === 'package' ? item.packageDetails : undefined;

        return (
          <Grid container spacing={2} key={item.productId} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={3}>
              <img
                src={item.type !== 'package' ? product?.image : pkg?.cardImage}
                alt={item.type !== 'package' ? product?.name : pkg?.title}
                style={{ width: '100%', borderRadius: 4 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                {item.type !== 'package' ? product?.name : pkg?.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.type !== 'package' ? product?.description : pkg?.description}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1" color="secondary" align="right">
                ${item.type !== 'package' ? product?.price.toFixed(2) : pkg?.newPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary" align="right">
                Quantity: {item.quantity}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </>
  );

  return (
    <Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
      {orders.map((order) => {
        const packageItems = order.items.filter(item => item.type === 'package');
        const essentialItems = order.items.filter(item => item.type === 'essentials');

        return (
          <Box key={order._id} sx={{ marginBottom: 4 }}>
            <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold', marginTop: 2 }}>
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Divider sx={{ marginY: 1 }} />

            {packageItems.length > 0 && (
              <>
                {renderOrderItems(packageItems, 'Packages')}
              </>
            )}

            {essentialItems.length > 0 && (
              <>
                <Divider sx={{ marginY: 2 }} />
                {renderOrderItems(essentialItems, 'Essentials')}
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
