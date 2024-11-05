import {Package} from '../models/package';

const API_URL = 'http://localhost:3000/packages';

// Fetch all packages from the server
export const fetchPackages = async (): Promise<Package[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Return the JSON response parsed as an array of Package objects
};

export const fetchPackageById = async (id: string ): Promise<Package | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return (await response.json()) as Package;
    } catch (error) {
        console.error('Error fetching package:', error);
        return null;
    }
};

// Fetch packages with 5-star rating
export const fetchFiveStarPackages = async (): Promise<Package[]> => {
    try {
        const packages = await fetchPackages();
        return packages.filter(pkg => Math.round(pkg.ratings) === 5);
    } catch (error) {
        console.error('Error fetching five-star packages:', error);
        return [];
    }
};
// Create a new package on the server
export const createPackage = async (packageData: Omit<Package, 'id'>): Promise<Package> => {
    const response = await fetch(API_URL, {
        method: 'POST', // Use POST method to create a new package
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData) // Convert the package object to a JSON string
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Return the newly created package as a Package object
};

// Update an existing package on the server
export const updatePackage = async (packageData: Package): Promise<Package> => {
    const response = await fetch(`${API_URL}/${packageData.id}`, {
        method: 'PUT', // Use PUT method to update an existing package
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(packageData) // Convert the updated package object to a JSON string
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Return the updated package as a Package object
};

// Delete a package from the server
export const deletePackage = async (packageId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${packageId}`, {
        method: 'DELETE' // Use DELETE method to remove the package
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};
