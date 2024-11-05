const API_URL = 'http://localhost:3000/subscriptions';

// Interface representing a subscription
export interface Subscription {
    id?: string;
    email: string;
    subscribedAt?: Date;
}

// Fetch all subscriptions from the server
export const fetchSubscriptions = async (): Promise<Subscription[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Return the JSON response parsed as an array of Subscription objects
};

// Fetch a specific subscription by ID
export const fetchSubscriptionById = async (id: string | undefined): Promise<Subscription | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return (await response.json()) as Subscription;
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return null;
    }
};

// Create a new subscription on the server
export const createSubscription = async (
    subscriptionData: Omit<Subscription, 'id'>
  ): Promise<Response> => {
    const response = await fetch(API_URL, {
      method: 'POST', // Use POST method to create a new subscription
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData), // Convert the subscription object to a JSON string
    });

    console.log('response frontend :', response);
  
    // Return the raw response to handle specific status codes in the frontend
    return response;
  };

// Delete a subscription from the server
export const deleteSubscription = async (subscriptionId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${subscriptionId}`, {
        method: 'DELETE' // Use DELETE method to remove the subscription
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};
