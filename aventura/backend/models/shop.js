import mongoose from "mongoose";

// Define the schema for ReviewItem
const reviewItemSchema = new mongoose.Schema({
  reviewItemId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userPicture: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  reviewGivenDate: {
    type: Date,
    default: Date.now
  }
});

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  name: {
    type: String,       // The name of the product
    required: true,     // This field is mandatory
  },
  description: {
    type: String,       // A description of the product
    required: true,     // This field is mandatory
  },
  additionalDescription: {
    type: String,       // Additional information about the product
  },
  specifications: {
    type: String,       // Specifications of the product
  },
  materials: {
    type: String,       // Materials used in the product
  },
  dimensions: {
    type: String,       // Dimensions of the product
  },
  colorOptions: {
    type: [String],     // An array of color options available for the product
    required: true,     // Each color option is mandatory
  },
  price: {
    type: Number,       // The price of the product
    required: true,     // This field is mandatory
  },
  quantity: {
    type: Number,       // The quantity of the product available in stock
    required: true,     // This field is mandatory
  },
  sku: {
    type: String,       // The Stock Keeping Unit, a unique identifier for the product
    unique: true,       // Ensures SKU is unique across all products
    sparse: true,       // Allows for optional unique values (not all products need an SKU)
  },
  category: {
    type: String,       // The category to which the product belongs
    required: true,     // This field is mandatory
    enum: [             // Allowed categories
    'Tents',
    'Footwear',
    'Clothing',
    'Backpacks',
    'Lighting',
    'Cooking Equipment',
    'Hydration',
    'Safety',
    'Sleeping Gear'
    ]
  },
  image: {
    type: String,       // URL or path to the product image
    required: true,     // This field is mandatory
  },
  createdDate: {
    type: Date,         // The date when the product was created
    default: Date.now,  // Sets the default value to the current date and time
  },
  reviewItems: [reviewItemSchema]
});

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

export default Product;
