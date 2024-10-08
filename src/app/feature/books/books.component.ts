import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from './services/books.service';
import { Book } from './models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksComponent implements OnInit{

  books: Book[] = [];
  isEdit: boolean = false;
  isPoppedUp: boolean = false;
  poppedUpBook: Book = null;
  editableIndex: number = 0;
  filteredBooks: Book[] = [];
  searchModel: string;

  bookForm: FormGroup = new FormGroup({
    name: new FormControl({value: '', disabled: false}, Validators.required),
    author: new FormControl({value: '', disabled: false}, Validators.required),
    year: new FormControl({value: '', disabled: false}, Validators.required),
    description: new FormControl({value: '', disabled: false}, Validators.required)
  })

  editForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private booksService: BooksService
  ){}

  ngOnInit(): void {
    this.books = this.booksService.books;
    this.filteredBooks = this.booksService.books;
  }

  onAddBook(): void {
    if(this.bookForm.value && this.bookForm.valid) {
      this.booksService.addBook(this.bookForm.value);
      this.books = this.booksService.books;
      this.bookForm.reset();
    } else {
      return;
    }
  }

  onEditBook(i: number): void {
    this.isEdit = true;
    this.editableIndex = i;
    this.editForm.setValue(this.books[i]);
    this.bookForm.disable();
  }

  onSubmitEditBook(): void {
    if(this.editForm.value && this.editForm.valid) {
      this.booksService.editBook(this.editableIndex, this.editForm.value);
      this.books = this.booksService.books;
      this.isEdit = false;
      this.bookForm.enable();
      this.isPoppedUp = false;
    } else {
      return;
    }
  }

  cancelEditing(): void {
    this.isEdit = false;
    this.isPoppedUp = false;
    this.poppedUpBook = null;
    this.editForm.reset();
    this.bookForm.enable();
  }

  onDeleteBook(i): void {
    this.booksService.deleteBook(i);
    this.books = this.booksService.books;
    this.isPoppedUp = false;
    this.poppedUpBook = null;
    this.bookForm.enable();
  }

  activatePopUp(i): void{
    this.isPoppedUp = true;
    this.poppedUpBook = this.books[i];
    this.editableIndex = i;
    this.bookForm.disable();
  }

  closePopUp(): void {
    this.isPoppedUp = false;
    this.poppedUpBook = null;
    this.bookForm.enable();
  }

  onSearch() {
    if(this.searchModel) {
      this.filteredBooks = this.books.filter( v => 
        v.name.toLowerCase().includes(this.searchModel.toLowerCase())
      )
    } else {
      this.filteredBooks = this.books;
    }
  }

}
