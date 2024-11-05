export default {
    versionKey: false, // Disable the version key (__v) in the schema
    id: true, // Enable the virtual id field (based on _id)
    toJSON: {
        transform(doc, ret) {
            // Transform the document before converting to JSON
            ret.id = ret._id; // Rename _id to id
            delete ret._id; // Remove _id from the JSON output

            // Rename nested _id fields to id
            if (ret.destination && ret.destination._id) {
                ret.destination.id = ret.destination._id;
                delete ret.destination._id;
            }
            if (ret.details && ret.details._id) {
                ret.details.id = ret.details._id;
                delete ret.details._id;
            }
            if (ret.itinerary) {
                ret.itinerary = ret.itinerary.map(itineraryItem => {
                    itineraryItem.id = itineraryItem._id;
                    delete itineraryItem._id;
                    return itineraryItem;
                });
            }
            if (ret.reviewItems) {
                ret.reviewItems = ret.reviewItems.map(reviewItem => {
                    reviewItem.id = reviewItem._id;
                    delete reviewItem._id;
                    return reviewItem;
                });
            }
            if (ret.images) {
                ret.images = ret.images.map(image => {
                    image.id = image._id;
                    delete image._id;
                    return image;
                });
            }
            if (ret.offers && ret.offers._id) {
                ret.offers.id = ret.offers._id;
                delete ret.offers._id;
            }
            if (ret.author && ret.author._id) {
                ret.author.id = ret.author._id;
                delete ret.author._id;
            }
            if (ret.comments) {
                ret.comments = ret.comments.map(comment => {
                    comment.id = comment._id;
                    delete comment._id;
                    
                    // Handle nested replies
                    if (comment.replies) {
                        comment.replies = comment.replies.map(reply => {
                            reply.id = reply._id;
                            delete reply._id;
                            return reply;
                        });
                    }

                    return comment;
                });
            }   
        }
    }
};
