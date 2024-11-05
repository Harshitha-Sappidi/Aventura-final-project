interface OrderItem {
    packageDetails: any;
    productDetails: any;
    productId: string | undefined; 
    quantity: number;
    type: string | undefined;
}

interface Order {
    _id: string; 
    userId: string | undefined; 
    email: string | undefined;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: Date; 
}

export type { Order, OrderItem };
