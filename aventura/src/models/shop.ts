export interface ReviewItem {
  reviewItemId: string;
  userId: string;
  userName: string;
  userPicture: string;
  userEmail: string;
  rating: number;
  review: string;
  reviewGivenDate: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  additionalDescription?: string;
  specifications?: string;
  materials?: string;
  dimensions?: string;
  colorOptions: string[];
  price: number;
  quantity: number;
  sku: string;
  category: 'Tents' | 'Footwear' | 'Clothing' | 'Backpacks' | 'Lighting' | 'Cooking Equipment' | 'Hydration' | 'Safety' | 'Sleeping Gear';
  image: string;
  createdDate: Date;
  reviewItems: ReviewItem[];
}
