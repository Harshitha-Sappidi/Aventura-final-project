// import React from 'react';
// import { useSelector } from 'react-redux';
// import MyOrders from '../../components/MyOrders/MyOrders.tsx';
// import { Box, Typography } from '@mui/material';
//
// const MyOrders = () => {
//     const orders = useSelector(state => state.orders.orders);
//
//     return (
//         <Box sx={{ padding: 3 }}>
//             <Typography variant="h4" gutterBottom>
//                 My Orders
//             </Typography>
//             <Typography variant="h6">Packages</Typography>
//             {orders.packages.map(packageItem => (
//                 <OrderItem key={packageItem.id} item={packageItem} />
//             ))}
//             <Typography variant="h6" sx={{ marginTop: 2 }}>Essentials</Typography>
//             {orders.essentials.map(essentialItem => (
//                 <OrderItem key={essentialItem.id} item={essentialItem} />
//             ))}
//         </Box>
//     );
// };
//
// export default MyOrders;
