import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String
  }

});

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
