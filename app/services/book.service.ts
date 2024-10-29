import { Observable } from '@nativescript/core';
import { Book, BookMatch } from '../models/book.model';

export class BookService extends Observable {
    private static instance: BookService;
    private books: Book[] = [];
    private matches: BookMatch[] = [];

    static getInstance(): BookService {
        if (!BookService.instance) {
            BookService.instance = new BookService();
        }
        return BookService.instance;
    }

    getBooks(): Book[] {
        return this.books;
    }

    addBook(book: Book): void {
        this.books.push(book);
        this.notifyPropertyChange('books', this.books);
    }

    createMatch(book1Id: string, book2Id: string, user1Id: string, user2Id: string): BookMatch {
        const match: BookMatch = {
            id: Date.now().toString(),
            book1Id,
            book2Id,
            user1Id,
            user2Id,
            timestamp: new Date(),
            status: 'pending'
        };
        this.matches.push(match);
        return match;
    }
}