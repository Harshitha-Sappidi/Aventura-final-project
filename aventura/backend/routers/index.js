import PackageRouter from './package-router.js';
import ShopRouter from './shop-router.js';
import UserRouter from "./user-router.js";
import BlogRouter from "./blog-router.js";
import SubscriptionRouter from "./subscription-router.js";
import orderRouter from "./order-router.js";

const initRoutes = (app) => {
    app.use('/users', UserRouter);
    app.use('/packages', PackageRouter);
    app.use('/shops', ShopRouter);
    app.use('/blogs', BlogRouter);
    app.use('/subscriptions', SubscriptionRouter);
    app.use('/orders', orderRouter);
}

export default initRoutes;