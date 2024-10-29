export interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    condition: 'new' | 'excellent' | 'good' | 'fair' | 'poor';
    description: string;
    imageUrl: string;
    ownerId: string;
}

export interface BookMatch {
    id: string;
    book1Id: string;
    book2Id: string;
    user1Id: string;
    user2Id: string;
    timestamp: Date;
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
}