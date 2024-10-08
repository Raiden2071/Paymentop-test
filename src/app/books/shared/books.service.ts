import { Injectable } from "@angular/core";
import { Book } from "./book.interface";

@Injectable({providedIn: 'root'})

export class BooksService {

    books: Book[] = [
        { name: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997, description: 'A young wizard begins his adventures at Hogwarts.' },
        { name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, description: 'A classic novel that explores themes of wealth and society in the Roaring Twenties.' },
        { name: '1984', author: 'George Orwell', year: 1949, description: 'A dystopian novel depicting a totalitarian regime and the suppression of truth.' },
        { name: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, description: 'A novel centered on racial injustice and moral growth in the American South.' },
        { name: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, description: 'A story about teenage rebellion and the challenges of adolescence.' }
    ];
    

    addBook(book: Book): void {
        this.books.push(book);
    }

    deleteBook(i): void {
        this.books.splice(i, 1);
    }

    editBook(i, book): void {
        this.books[i] = book;
    }

}