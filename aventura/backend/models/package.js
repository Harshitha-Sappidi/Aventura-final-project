import mongoose from "mongoose";
import config from "./schema-config.js";

// Define the schema for DestinationItem
const destinationItemSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    }
});

// Define the schema for DetailsItem
const detailsItemSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    detailDescription: {
        type: String,
        required: true
    },
    departureLocation: {
        type: String,
        required: true
    },
    departureTiming: {
        type: String,
        required: true
    },
    availability: {
        type: String,  // Changed to Number to reflect availability as a count
        required: true
    },
    essentials: {
        type: [String],
        required: true
    },
    included: {
        type: [String],
        required: true
    },
    notIncluded: {
        type: [String],
        required: true
    }
});

// Define the schema for ItineraryItem
const itineraryItemSchema = new mongoose.Schema({
    activityTitle: {
        type: String,
        required: true
    },
    activityDescription: {
        type: String,
        required: true
    }
});

// Define the schema for ImageItem
const imageItemSchema = new mongoose.Schema({
    imageId: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    altText: {
        type: String,
        required: true
    }
});

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
    reviewDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});
// Define the schema for Offers
const offersSchema = new mongoose.Schema({
    specialOffer: {
        type: Boolean,
        required: true
    },
    earlyBird: {
        type: Boolean,
        required: true
    },
    lastMinute: {
        type: Boolean,
        required: true
    }
});
// Define the schema for Package
const packageSchema = new mongoose.Schema({
    packageId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    level: {
        type: String,
        required: true
    },
    physicality: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cardImage: {
        type: String,
        required: true
    },
    ticketCount: {
        type: Number,
        required: true
    },
    bookingCount: {
        type: Number,
        required: true
    },
    destination: destinationItemSchema,
    details: detailsItemSchema,
    offers: offersSchema,
    itinerary: [itineraryItemSchema], 
    reviewItems: [reviewItemSchema],
    images: [imageItemSchema]
}, config);

// Create the Package model using packageSchema
const Package = mongoose.model('Package', packageSchema);

export default Package;

