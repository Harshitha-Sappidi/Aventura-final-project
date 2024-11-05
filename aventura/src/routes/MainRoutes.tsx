import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home/Home';
// import MyOrdersPage from "../pages/MyOrdersPage/MyOrdersPage.tsx";
import PackageListingPage from '../pages/PackageListingPage/PackageListingPage';
import PackageDetailsPage from '../pages/PackageDetailsPage/PackageDetailsPage';
import ShopView from '../pages/ShopView/shopView';
import ProductDetailView from '../pages/ProductDetailView/productDetailView';
import CartPage from '../pages/CartPage/CartPage';
import BlogPage from '../pages/BlogPage/BlogPage';
import BlogListPage from '../pages/BlogListPage/BlogListPage';
import { BlogFilterProvider } from '../context/BlogFiterContext';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeCart, setUserEmail } from '../store/slices/cart-slice';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import {MyBookingsPage} from '../pages/MyBookings/MyBookingsPage';

const MainRoutes = () => {


    const dispatch = useDispatch();
 
    useEffect(() => {
        const userDataString = localStorage.getItem('user');
        if (userDataString) {
        const parsedData = JSON.parse(userDataString);
        const user = parsedData.user; // Ensure correct structure
        if (user && user.email) {
            console.log('User email:', user.email);
            dispatch(setUserEmail(user.email));
            dispatch(initializeCart());
        } else {
            console.error('User data is invalid or missing email:', user);
        }
        } else {
        console.error('No user data found in localStorage');
        }
    }, [dispatch]);


    return (
        <BlogFilterProvider>
        <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/my-orders" element={<MyOrdersPage />} />*/}
            <Route path="/packages" element={<PackageListingPage />} />
            <Route path="/packages/:id" element={<PackageDetailsPage />} />
            <Route path="/products" element={<ShopView />} />
            <Route path="/products/:productId" element={<ProductDetailView />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Routes>
        </BlogFilterProvider> 
    );
};

export default MainRoutes;
