interface Author {
    name: string;
    profilePicture: string;
    bio: string;
}
interface ReplyItem {
    commentId: string;
    commenterName: string;
    commenterPhoto: string;
    email: string;
    date: string; // Use string type for date to match schema
    content: string;
}

interface CommentItem {
    commentId: string;
    commenterName: string;
    commenterPhoto: string;
    email: string;
    date: string; // Use string type for date to match schema
    content: string;
    replies?: ReplyItem[];
}

interface Blog {
    blogId: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    tags: string[];
    category: string;
    author: Author;
    comments: CommentItem[];
    id: string; // Assuming this is the MongoDB _id field
}

export type { Blog, CommentItem, ReplyItem };
