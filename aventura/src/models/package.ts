interface DestinationItem {
    city: string;
    country: string;
    coordinates: string;
}

interface DetailsItem {
    age: number;
    detailDescription: string;
    departureLocation: string;
    departureTiming: string;
    availability: string;
    essentials: string[];
    included: string[];
    notIncluded: string[];
}
interface Offer {
    specialOffer: boolean;
    earlyBird: boolean;
    lastMinute: boolean;
}

interface ItineraryItem {
    activityTitle: string;
    activityDescription: string;
}

interface ReviewItem {
    reviewItemId: string;
    userId: string;
    userName: string;
    userPicture: string;
    userEmail: string;
    rating: number;
    review: string;
    reviewDate: Date;
}

interface ImageItem {
    imageId: string;
    path: string;
    altText: string;
}

interface Package {
    id: string,
    packageId: string;
    title: string;
    description: string;
    oldPrice: number;
    newPrice: number;
    duration: number;
    level: string;
    physicality:number;
    ratings: number;
    tags: string[];
    category: string;
    cardImage: string;
    ticketCount: number;
    bookingCount:number;
    destination: DestinationItem;
    details: DetailsItem;
    offers: Offer; 
    itinerary: ItineraryItem[];
    reviewItems: ReviewItem[];
    images: ImageItem[];
}

export type { Package, ReviewItem };

