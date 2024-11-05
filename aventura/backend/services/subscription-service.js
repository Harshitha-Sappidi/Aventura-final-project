import Subscription from '../models/subscription.js';

// Create a new subscription (for POST requests)
export const subscribe = async (subscriptionData) => {
    // Check if the email already exists
    const existingSubscription = await findSubscriptionByEmail(subscriptionData.email);
    if (existingSubscription) {
        // Return a specific error object to indicate the email is already subscribed
        return {
            status: 409, // HTTP status code for conflict
            message: 'Email is already subscribed'
        };
    }

    // Create and save the new subscription
    const subscription = new Subscription(subscriptionData);
    const savedSubscription = await subscription.save();
    return {
        status: 201, // HTTP status code for created
        data: savedSubscription
    };
}

// Get all subscriptions
export const getAllSubscriptions = async () => {
    return Subscription.find().exec();
}

// Find a subscription by email
export const findSubscriptionByEmail = async (email) => {
    return Subscription.findOne({ email }).exec();
}

// Remove a subscription by email
export const removeSubscription = async (email) => {
    return Subscription.findOneAndDelete({ email }).exec();
}
