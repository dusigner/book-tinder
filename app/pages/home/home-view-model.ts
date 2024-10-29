import { Observable } from '@nativescript/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

export class HomeViewModel extends Observable {
    private bookService: BookService;
    public currentBook: Book | null = null;
    private books: Book[] = [];
    private currentIndex: number = 0;

    constructor() {
        super();
        this.bookService = BookService.getInstance();
        this.loadBooks();
    }

    private loadBooks() {
        this.books = this.bookService.getBooks();
        this.showNextBook();
    }

    private showNextBook() {
        if (this.currentIndex < this.books.length) {
            this.set('currentBook', this.books[this.currentIndex]);
            this.currentIndex++;
        } else {
            this.set('currentBook', null);
        }
    }

    onLike() {
        // Implement match logic
        this.showNextBook();
    }

    onReject() {
        this.showNextBook();
    }

    onInfo() {
        // Show book details modal
    }
}