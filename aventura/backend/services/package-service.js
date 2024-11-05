import Package from "../models/package.js";

// Service function to save a new package
export const save = async (newPackage) => {
    const packageItem = new Package(newPackage);
    return await packageItem.save(); // "package.save();" -> this will return a promise object
}

// Service function to search for packages based on query parameters
export const search = async (query = {}) => {
    const result = await Package.find(query).exec();
    return result;
}   

// Service function to filter and search for packages
export const filterSearch = async (query) => {
    const { keyword, startDate, endDate } = query;
    const filterQuery = {};

    if (keyword) {
        // Add search criteria for title, description, and action item descriptions
        filterQuery.$or = [
            { title: new RegExp(keyword, 'i') },
            { description: new RegExp(keyword, 'i') },
            { 'actionItems.description': new RegExp(keyword, 'i') }
        ];
    }

    if (startDate && endDate) {
        // Adjust startDate to the start of the day and endDate to the end of the day
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Start of the day

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of the day

        // Add date range criteria for createdDate
        filterQuery.createdDate = {
            $gte: start,
            $lte: end
        };
    } else if (startDate) {
        // Adjust startDate to the start of the day
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Start of the day

        filterQuery.createdDate = { $gte: start };
    } else if (endDate) {
        // Adjust endDate to the end of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of the day

        filterQuery.createdDate = { $lte: end };
    }

    const result = await Package.find(filterQuery).exec();
    return result;
}

// Service function to retrieve a package by ID
export const getById = async (id) => {
    const packageItem = await Package.findById(id).exec();
    return packageItem;
}

// Service function to update a package by ID
export const update = async (id, updatedPackage) => {
    const packageItem = await Package.findByIdAndUpdate(id, updatedPackage, {new: true}).exec();
    return packageItem;
}

// Service function to remove a package by ID
export const remove = async (id) => {
    const packageItem = await Package.findByIdAndDelete(id).exec();
    return packageItem;
}

export const fetchPackageById = async (packageId) => {
    try {
        const pkg = await Package.findById(packageId);
        return pkg;
    } catch (error) {
        console.error('Error fetching package by ID:', error);
        throw error;
    }
};