export interface User {
    id: string;
    name: string;
    email: string;
    location: {
        latitude: number;
        longitude: number;
        city: string;
    };
    books: string[]; // Array of book IDs
    matches: string[]; // Array of match IDs
    rating: number;
    profileImage: string;
}