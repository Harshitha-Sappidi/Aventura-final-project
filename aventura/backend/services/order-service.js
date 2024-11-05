import Order from '../models/order.js';
import * as orderService from '../services/order-service.js';


export const save = async (newOrder) => {
    const orderItem = new Order(newOrder);
    return await orderItem.save(); 
}

export async function get(req, res) {
    try {
        const { id } = req.params;
        const order = await orderService.getById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



//Service function to fetch all orders
export const fetchAll = async () => {
    const orders = await Order.find().populate('items.productId').exec();
    return orders;
};



export const fetchOrdersByUserId = async (userId) => {
    try {
      const orders = await Order.find({ userId });
  
      // Fetch product/package details for each order item
      for (const order of orders) {
        for (const item of order.items) {
          if (item.type === 'essentials') {
            const product = await Product.getById(item.productId).lean();
            item.productDetails = product;
          } else if (item.type === 'package') {
            const pkg = await Package.findProductById(item.productId).lean();
            item.packageDetails = pkg;
          }
        }
      }
  
      return orders;
    } catch (error) {
      console.error('Error fetching orders by userId:', error);
      throw error;
    }
  };
  